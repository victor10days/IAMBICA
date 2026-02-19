#!/usr/bin/env node

/**
 * OSC Bridge Server - Multi-User Edition
 *
 * Bridges WebSocket messages from the web app to OSC (UDP)
 * Supports multiple collaboration modes for multi-user interaction.
 *
 * Modes:
 *   - separate: Each user gets their own OSC channel (/user/1/mouse/x, etc.)
 *   - single: Only one active user at a time
 *   - blended: Average all user inputs into one smooth value
 *   - zones: Canvas split into regions, each user controls their zone
 *
 * Usage:
 *   node osc-bridge.js [--ws-port 8000] [--osc-port 9000] [--osc-host 127.0.0.1] [--mode separate]
 */

import { WebSocketServer } from 'ws';
import osc from 'osc';

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
  const index = args.indexOf(name);
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue;
};

const WS_PORT = parseInt(getArg('--ws-port', '8000'));
const OSC_PORT = parseInt(getArg('--osc-port', '9000'));
const OSC_HOST = getArg('--osc-host', '127.0.0.1');
const INITIAL_MODE = getArg('--mode', 'separate');
const ZONE_COUNT = parseInt(getArg('--zones', '4')); // 4 = 2x2 grid, 9 = 3x3, etc.

// Server state
let currentMode = INITIAL_MODE;
const clients = new Map(); // ws -> { userId, lastPosition, zone }
let nextUserId = 1;
let activeUserId = null; // For 'single' mode
const userPositions = new Map(); // userId -> { x, y }

// Create OSC UDP Port
const oscPort = new osc.UDPPort({
  localAddress: '0.0.0.0',
  localPort: 57121,
  remoteAddress: OSC_HOST,
  remotePort: OSC_PORT,
  metadata: true
});

oscPort.on('ready', () => {
  console.log(`OSC sending to ${OSC_HOST}:${OSC_PORT}`);
});

oscPort.on('error', (error) => {
  console.error('OSC Error:', error);
});

oscPort.open();

// Helper: Send OSC message
function sendOSCMessage(address, args) {
  oscPort.send({
    address: address,
    args: args.map(arg => ({
      type: typeof arg === 'number' ? 'f' : 's',
      value: arg
    }))
  });
}

// Helper: Broadcast to all clients
function broadcast(message) {
  const json = JSON.stringify(message);
  for (const ws of clients.keys()) {
    if (ws.readyState === 1) { // WebSocket.OPEN
      ws.send(json);
    }
  }
}

// Helper: Send state to specific client
function sendClientState(ws) {
  const client = clients.get(ws);
  if (!client) return;

  const state = {
    type: 'state',
    userId: client.userId,
    mode: currentMode,
    totalUsers: clients.size,
    zone: client.zone,
    isActive: currentMode === 'single' ? client.userId === activeUserId : true
  };

  ws.send(JSON.stringify(state));
}

// Helper: Calculate zone from position
function getZoneFromPosition(x, y) {
  const gridSize = Math.sqrt(ZONE_COUNT);
  const zoneX = Math.min(Math.floor(x * gridSize), gridSize - 1);
  const zoneY = Math.min(Math.floor(y * gridSize), gridSize - 1);
  return zoneY * gridSize + zoneX + 1; // 1-indexed zones
}

// Helper: Assign zone to new user
function assignZone(userId) {
  const usedZones = new Set();
  for (const client of clients.values()) {
    if (client.zone) usedZones.add(client.zone);
  }

  // Find first available zone
  for (let i = 1; i <= ZONE_COUNT; i++) {
    if (!usedZones.has(i)) return i;
  }

  // All zones taken, allow sharing
  return ((userId - 1) % ZONE_COUNT) + 1;
}

// Mode handlers
const modeHandlers = {
  // Each user gets their own OSC channel
  separate: (userId, address, args) => {
    sendOSCMessage(`/user/${userId}${address}`, args);

    // Also send user count
    sendOSCMessage('/users/count', [clients.size]);
  },

  // Only active user's data is sent
  single: (userId, address, args) => {
    if (userId === activeUserId) {
      sendOSCMessage(address, args);
      sendOSCMessage('/active/user', [userId]);
    }
  },

  // Average all user positions
  blended: (userId, address, args) => {
    // Update this user's position
    if (address === '/mouse/xy' && args.length >= 2) {
      userPositions.set(userId, { x: args[0], y: args[1] });
    } else if (address === '/mouse/x') {
      const pos = userPositions.get(userId) || { x: 0.5, y: 0.5 };
      pos.x = args[0];
      userPositions.set(userId, pos);
    } else if (address === '/mouse/y') {
      const pos = userPositions.get(userId) || { x: 0.5, y: 0.5 };
      pos.y = args[0];
      userPositions.set(userId, pos);
    } else if (address === '/press') {
      // Send press from any user
      sendOSCMessage('/press', args);
      return;
    }

    // Calculate average position
    if (userPositions.size > 0) {
      let avgX = 0, avgY = 0;
      for (const pos of userPositions.values()) {
        avgX += pos.x;
        avgY += pos.y;
      }
      avgX /= userPositions.size;
      avgY /= userPositions.size;

      sendOSCMessage('/mouse/x', [avgX]);
      sendOSCMessage('/mouse/y', [avgY]);
      sendOSCMessage('/mouse/xy', [avgX, avgY]);
      sendOSCMessage('/users/count', [userPositions.size]);
    }
  },

  // Users control their assigned zone
  zones: (userId, address, args, ws) => {
    const client = clients.get(ws);
    if (!client || !client.zone) return;

    // Check if position is within user's zone
    if (address === '/mouse/xy' && args.length >= 2) {
      const posZone = getZoneFromPosition(args[0], args[1]);

      // Always send to their zone channel
      sendOSCMessage(`/zone/${client.zone}${address}`, args);
      sendOSCMessage(`/zone/${client.zone}/active`, [posZone === client.zone ? 1 : 0]);
    } else if (address === '/press') {
      sendOSCMessage(`/zone/${client.zone}/press`, args);
    } else {
      sendOSCMessage(`/zone/${client.zone}${address}`, args);
    }
  }
};

// Create WebSocket Server
const wss = new WebSocketServer({ port: WS_PORT });

console.log(`
╔════════════════════════════════════════════════════════════╗
║              OSC Bridge Server - Multi-User                ║
╚════════════════════════════════════════════════════════════╝

WebSocket Server: ws://localhost:${WS_PORT}
OSC Output:       ${OSC_HOST}:${OSC_PORT}
Initial Mode:     ${currentMode}

Modes available:
  • separate - Each user gets /user/N/... addresses
  • single   - One active user at a time
  • blended  - All inputs averaged together
  • zones    - Canvas split into ${ZONE_COUNT} zones

Waiting for connections...
`);

wss.on('connection', (ws) => {
  const userId = nextUserId++;
  const zone = currentMode === 'zones' ? assignZone(userId) : null;

  clients.set(ws, { userId, zone, lastPosition: { x: 0.5, y: 0.5 } });
  userPositions.set(userId, { x: 0.5, y: 0.5 });

  // Set first user as active in single mode
  if (currentMode === 'single' && activeUserId === null) {
    activeUserId = userId;
  }

  console.log(`✓ User ${userId} connected (${clients.size} total)${zone ? ` [Zone ${zone}]` : ''}`);

  // Send initial state to new client
  sendClientState(ws);

  // Notify all clients of user count change
  broadcast({ type: 'userCount', count: clients.size });

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // Handle control messages
      if (data.type === 'setMode' && data.mode) {
        currentMode = data.mode;
        console.log(`\nMode changed to: ${currentMode}`);

        // Reassign zones if switching to zone mode
        if (currentMode === 'zones') {
          let zoneId = 1;
          for (const [clientWs, client] of clients) {
            client.zone = assignZone(client.userId);
          }
        }

        // Broadcast new mode to all clients
        for (const clientWs of clients.keys()) {
          sendClientState(clientWs);
        }
        return;
      }

      // Handle request to become active (single mode)
      if (data.type === 'requestActive') {
        if (currentMode === 'single') {
          const client = clients.get(ws);
          activeUserId = client.userId;
          console.log(`\nActive user changed to: ${activeUserId}`);
          for (const clientWs of clients.keys()) {
            sendClientState(clientWs);
          }
        }
        return;
      }

      // Handle OSC data
      if (data.address && Array.isArray(data.args)) {
        const client = clients.get(ws);
        if (!client) return;

        // Update last position
        if (data.address === '/mouse/xy' && data.args.length >= 2) {
          client.lastPosition = { x: data.args[0], y: data.args[1] };
        }

        // Route to appropriate mode handler
        const handler = modeHandlers[currentMode];
        if (handler) {
          handler(client.userId, data.address, data.args, ws);
        }

        // Log output
        const values = data.args.map(v =>
          typeof v === 'number' ? v.toFixed(3) : v
        ).join(', ');
        process.stdout.write(`\r[${currentMode}] User ${client.userId}: ${data.address} [${values}]    `);
      }
    } catch (error) {
      console.error('\nError parsing message:', error);
    }
  });

  ws.on('close', () => {
    const client = clients.get(ws);
    if (client) {
      console.log(`\n✗ User ${client.userId} disconnected`);
      userPositions.delete(client.userId);

      // If active user left in single mode, assign new active
      if (currentMode === 'single' && activeUserId === client.userId) {
        const remaining = Array.from(clients.values()).filter(c => c.userId !== client.userId);
        activeUserId = remaining.length > 0 ? remaining[0].userId : null;
        if (activeUserId) {
          console.log(`Active user changed to: ${activeUserId}`);
        }
      }
    }
    clients.delete(ws);

    // Notify remaining clients
    broadcast({ type: 'userCount', count: clients.size });
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

wss.on('error', (error) => {
  console.error('WebSocket Server error:', error);
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n\nShutting down OSC Bridge...');
  oscPort.close();
  wss.close();
  process.exit(0);
});
