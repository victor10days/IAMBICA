# OSC Interface Setup Guide

This guide explains how to use the Interact page to send OSC data to TouchDesigner, Max MSP, or other OSC-compatible software.

## Overview

The system consists of three parts:
1. **Web Interface** - Interactive canvas in the browser (Interact page)
2. **OSC Bridge** - Node.js server that converts WebSocket → OSC
3. **Receiver** - TouchDesigner, Max MSP, or other OSC software

## Quick Start

### 1. Start the OSC Bridge Server

```bash
node osc-bridge.js
```

By default, this will:
- Listen for WebSocket connections on port `8000`
- Send OSC messages to `127.0.0.1:9000`

Custom configuration:
```bash
node osc-bridge.js --ws-port 8000 --osc-port 9000 --osc-host 127.0.0.1
```

### 2. Configure Your OSC Receiver

#### TouchDesigner
1. Add an **OSC In CHOP** to your network
2. Set **Network Port** to `9000` (or your custom port)
3. Set **Protocol** to `UDP`
4. The incoming OSC addresses will be:
   - `/mouse/x` - X position (0-1)
   - `/mouse/y` - Y position (0-1)
   - `/mouse/xy` - Both X and Y values
   - `/press` - Mouse press state (0 or 1)

#### Max MSP
1. Create a **udpreceive** object: `udpreceive 9000`
2. Connect it to an **O.route** object to parse OSC messages
3. Route the addresses:
   ```
   [udpreceive 9000]
   |
   [O.route /mouse/x /mouse/y /mouse/xy /press]
   |        |         |          |
   ```

#### Other Software
Configure to receive OSC on UDP port 9000 (or your custom port)

### 3. Open the Web Interface

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the **Interact** page

3. Enter connection details:
   - **Host**: `127.0.0.1` (localhost)
   - **Port**: `8000` (WebSocket port, NOT OSC port)

4. Click **Connect OSC**

5. Move your mouse on the canvas to send data!

## OSC Messages

| Address | Type | Range | Description |
|---------|------|-------|-------------|
| `/mouse/x` | float | 0.0 - 1.0 | Normalized X position |
| `/mouse/y` | float | 0.0 - 1.0 | Normalized Y position |
| `/mouse/xy` | float, float | 0.0 - 1.0 each | Both X and Y |
| `/press` | int | 0 or 1 | Mouse/touch press state |

## Troubleshooting

### "Cannot connect" error
- Make sure the OSC bridge server is running
- Check that the WebSocket port (default 8000) is not in use
- Verify the host and port in the web interface match the bridge server

### "Not receiving data in TouchDesigner/Max"
- Verify the OSC port matches (default 9000)
- Check your firewall settings
- Make sure the bridge server shows "Web client connected"
- Look for incoming messages in the bridge server console

### Performance Issues
- The interface sends data on every mouse move
- To reduce bandwidth, modify the `handleInteraction` function to throttle updates
- Add a timestamp check to limit update rate

## Advanced Usage

### Multiple Receivers

You can send OSC to multiple destinations by modifying `osc-bridge.js`:

```javascript
const destinations = [
  { host: '127.0.0.1', port: 9000 },
  { host: '192.168.1.100', port: 9001 }
];
```

### Custom OSC Messages

Edit the `sendOSC` calls in [Interact.jsx](src/pages/Interact.jsx) to add new messages:

```javascript
// Example: Add velocity
sendOSC('/velocity', [velocityX, velocityY]);

// Example: Add zones
if (x < 0.5 && y < 0.5) {
  sendOSC('/zone', ['topleft']);
}
```

### Network Setup (Remote Devices)

To send OSC to a remote machine:

1. Update the bridge server:
   ```bash
   node osc-bridge.js --osc-host 192.168.1.100 --osc-port 9000
   ```

2. Make sure the remote machine's firewall allows UDP on port 9000

3. Configure the receiver on the remote machine to listen on 0.0.0.0 (all interfaces)

### Mobile Device Setup

Using your smartphone/tablet to control OSC:

1. **Find your computer's local IP address:**
   - **macOS**: System Preferences → Network (e.g., 192.168.1.100)
   - **Windows**: Open Command Prompt → `ipconfig` (look for IPv4)
   - **Linux**: Terminal → `hostname -I`

2. **Start the dev server to accept network connections:**
   ```bash
   npm run dev -- --host
   ```
   This will show something like:
   ```
   Local:   http://localhost:5173
   Network: http://192.168.1.100:5173
   ```

3. **Start the OSC bridge server:**
   ```bash
   node osc-bridge.js
   ```

4. **On your mobile device:**
   - Connect to the same WiFi network as your computer
   - Open browser and navigate to the Network URL (e.g., `http://192.168.1.100:5173`)
   - Go to the Interact page
   - The host will auto-fill with your computer's IP
   - Tap "OSC Settings" to expand controls
   - Tap "Connect OSC"
   - Start touching the screen to send data!

**Mobile-Specific Features:**
- Compact UI with collapsible settings panel
- Larger touch targets for easier interaction
- Auto-detection of network IP address
- Full touch support with pressure sensing
- Responsive cursor that scales with screen size

## Example TouchDesigner Network

```
[OSC In CHOP]
   port: 9000
   |
   ├─ /mouse/x → [Math CHOP] → Map to parameter
   ├─ /mouse/y → [Math CHOP] → Map to parameter
   └─ /press → [Logic CHOP] → Trigger events
```

## Example Max MSP Patch

```
[udpreceive 9000]
|
[O.route /mouse/x /mouse/y /press]
|            |           |
[scale 0. 1. -1. 1.]    [sel 1]
|                        |
[s x_pos]               [bang]
```

## Support

For issues or questions, check the console logs in:
- Browser DevTools (F12)
- OSC Bridge Terminal
- TouchDesigner/Max console
