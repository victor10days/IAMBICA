# IAMBICA - Festival Website

A modern, interactive single-page website for Festival Iámbica featuring 3D animations, interactive elements, and OSC integration for creative control.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start OSC bridge server
npm run osc-bridge
```

## Project Structure

```
IAMBICA/
├── docs/               # Documentation
├── src/
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   │   └── useAudio.js # Audio system hook
│   ├── pages/          # Page components
│   │   ├── Interact.jsx      # OSC interaction page
│   │   └── SinglePageHome.jsx # Main homepage
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── osc-bridge.js       # OSC WebSocket bridge
└── vite.config.js      # Vite configuration
```

## Features

- **Single-Page Scroll Architecture** - Smooth scrolling sections with snap-to behavior
- **3D Interactive Cube** - p5.js WEBGL cube with draggable rotation
- **Triangle Animations** - Physics-based rope animations following mouse
- **Audio System** - Web Audio API integration with collision sounds
- **OSC Integration** - Real-time OSC control via WebSockets for TouchDesigner/Max MSP
- **Mobile Optimized** - Fully responsive with touch support

## Documentation

- [OSC Setup Guide](docs/OSC_SETUP.md) - Configure OSC integration
- [Audio Guide](docs/AUDIO_GUIDE.md) - Audio system details
- [Mobile Quick Start](docs/MOBILE_QUICK_START.md) - Mobile device setup
- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed architecture

## Performance Optimizations

- React.memo for expensive components
- Throttled animation updates (every 3 frames)
- Memoized constants and arrays
- Efficient requestAnimationFrame usage
- Optimized p5.js canvas sizing

## Tech Stack

- React 19
- p5.js 2.2
- React Router 7
- Vite (Rolldown)
- Web Audio API
- WebSockets + OSC

## Development

The project uses Vite with Rolldown for fast builds. All interactive elements are optimized for 60fps performance.

---

© 2026 Festival Iámbica. Puerto Rico.
