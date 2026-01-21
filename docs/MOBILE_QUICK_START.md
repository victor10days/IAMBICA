# Mobile Quick Start Guide

Use your smartphone or tablet as an OSC controller for TouchDesigner, Max MSP, and more.

## Setup (5 minutes)

### On Your Computer

1. **Get your computer's IP address:**
   - Look in Network Settings (e.g., `192.168.1.100`)

2. **Start the web server:**
   ```bash
   npm run dev -- --host
   ```
   Note the Network URL shown (e.g., `http://192.168.1.100:5173`)

3. **Start the OSC bridge:**
   ```bash
   npm run osc-bridge
   ```

4. **Set up your receiver (TouchDesigner/Max MSP):**
   - Listen for OSC on port `9000`

### On Your Mobile Device

1. **Connect to WiFi:**
   - Same network as your computer

2. **Open browser:**
   - Navigate to the Network URL from step 2 above
   - Example: `http://192.168.1.100:5173`

3. **Go to Interact page:**
   - Click/tap through the 3D cube or use navigation

4. **Connect to OSC:**
   - Tap "OSC Settings" button at bottom
   - Host should auto-fill with your computer's IP
   - Port should be `8000`
   - Tap "Connect OSC"

5. **Start controlling:**
   - Touch anywhere on the screen
   - Movement sends X/Y coordinates (0-1)
   - Touch/release sends press state

## OSC Messages Sent

- `/mouse/x` - X position (0.0 to 1.0)
- `/mouse/y` - Y position (0.0 to 1.0)
- `/mouse/xy` - Both X and Y values
- `/press` - Touch state (0 = released, 1 = pressed)

## Mobile Features

✓ Full-screen touch interface
✓ No navigation bars when in use
✓ Automatic IP detection
✓ Collapsible settings panel
✓ Real-time coordinate display
✓ Visual feedback on touch
✓ Works in portrait or landscape

## Tips

- **Better precision:** Use landscape mode on phones
- **Hide settings:** Tap the settings button again to minimize and get more screen space
- **Connection status:** Button turns red when connected
- **Multi-touch:** Currently sends only first touch point
- **Add to Home Screen:** For app-like experience (iOS/Android)

## Troubleshooting

**Can't connect:**
- Make sure both devices are on same WiFi
- Check computer's firewall isn't blocking ports 8000 or 9000
- Verify the IP address is correct
- Make sure OSC bridge server is running

**Laggy/delayed:**
- Move closer to WiFi router
- Close other apps on mobile device
- Check computer isn't under heavy load

**TouchDesigner/Max not receiving:**
- Verify OSC bridge shows "Web client connected"
- Check receiver is listening on port 9000
- Try sending a test message from OSC bridge console

## Advanced

### Custom OSC Port
If port 8000 is in use, start bridge with custom port:
```bash
node osc-bridge.js --ws-port 8001
```
Then use `8001` in the mobile interface.

### Multiple Mobile Devices
Each device needs its own WebSocket connection. The OSC bridge supports multiple simultaneous connections, all sending to the same OSC destination.

### Save Settings
The interface remembers your last-used host and port in browser storage.

---

Need more details? See [OSC_SETUP.md](OSC_SETUP.md)
