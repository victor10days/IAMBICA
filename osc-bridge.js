#!/usr/bin/env node

/**
 * OSC Bridge Server
 *
 * Bridges WebSocket messages from the web app to OSC (UDP)
 * for use with TouchDesigner, Max MSP, or other OSC-compatible software.
 *
 * Usage:
 *   node osc-bridge.js [--ws-port 8000] [--osc-port 9000] [--osc-host 127.0.0.1]
 */

const WebSocket = require('ws');
const osc = require('osc');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
  const index = args.indexOf(name);
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue;
};

const WS_PORT = parseInt(getArg('--ws-port', '8000'));
const OSC_PORT = parseInt(getArg('--osc-port', '9000'));
const OSC_HOST = getArg('--osc-host', '127.0.0.1');

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

// Create WebSocket Server
const wss = new WebSocket.Server({ port: WS_PORT });

console.log(`
╔════════════════════════════════════════════════════════════╗
║                    OSC Bridge Server                        ║
╚════════════════════════════════════════════════════════════╝

WebSocket Server: ws://localhost:${WS_PORT}
OSC Output:       ${OSC_HOST}:${OSC_PORT}

Waiting for connections...
`);

wss.on('connection', (ws) => {
  console.log('✓ Web client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.address && Array.isArray(data.args)) {
        // Send OSC message
        oscPort.send({
          address: data.address,
          args: data.args.map(arg => ({
            type: typeof arg === 'number' ? 'f' : 's',
            value: arg
          }))
        });

        // Log in compact format
        const values = data.args.map(v =>
          typeof v === 'number' ? v.toFixed(3) : v
        ).join(', ');
        process.stdout.write(`\r${data.address} [${values}]    `);
      }
    } catch (error) {
      console.error('\nError parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('\n✗ Web client disconnected');
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
