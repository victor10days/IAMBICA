# IAMBICA — Technical Documentation (Stage 3)

**Project:** IAMBICA — Interactive Festival Platform
**Team:** Maria Isabel Rodriguez, Felix Adorno, Araceli Pino, Donald Escudero, Víctor E. Díaz
**Date:** January 2026
**Version:** 1.0

---

## Table of Contents

1. [User Stories and Mockups](#1-user-stories-and-mockups)
2. [System Architecture](#2-system-architecture)
3. [Components, Classes, and Database Design](#3-components-classes-and-database-design)
4. [Sequence Diagrams](#4-sequence-diagrams)
5. [API Specifications](#5-api-specifications)
6. [SCM and QA Plans](#6-scm-and-qa-plans)
7. [Technical Justifications](#7-technical-justifications)

---

## 1. User Stories and Mockups

### 1.1 Prioritized User Stories (MoSCoW)

#### Must Have

| ID | User Story | Acceptance Criteria |
|:---|:-----------|:-------------------|
| US-01 | As a **festival attendee**, I want to open the platform on my smartphone browser without installing an app, so that I can participate instantly during a live performance. | The platform loads in Safari, Chrome, and Firefox on iOS and Android. No install prompt is required. |
| US-02 | As a **festival attendee**, I want to touch and drag on my phone screen and have my input sent in real time to the audiovisual system, so that I feel connected to the artwork. | Touch coordinates are captured and transmitted via WebSocket with less than 100 ms perceived latency. |
| US-03 | As a **performing artist**, I want to receive OSC messages from audience devices in TouchDesigner or Max MSP, so that I can map audience input to visuals and sound. | The OSC bridge converts WebSocket JSON to UDP/OSC packets and delivers them to the configured host and port. |
| US-04 | As a **festival attendee**, I want to see the festival landing page with information about IAMBICA, so that I understand what the festival is about before interacting. | The single-page home displays Welcome, About Us, Mission, Philosophy, and Interact sections with smooth scrolling. |
| US-05 | As a **festival attendee**, I want to connect to the OSC bridge by entering a host and port, so that my device can communicate with the on-site system. | The Interact page provides host/port inputs, a connect button, and a visible connection status indicator. |

#### Should Have

| ID | User Story | Acceptance Criteria |
|:---|:-----------|:-------------------|
| US-06 | As a **festival attendee**, I want to experience interactive 3D animations on the homepage, so that the website feels immersive and engaging. | The p5.js 3D cube renders at 60 fps, supports mouse/touch drag rotation, and displays textured faces. |
| US-07 | As a **festival attendee**, I want to hear ambient audio and collision sounds as I interact with the About Us section, so that the experience is multisensory. | Web Audio API generates collision sounds on triangle bounces and ambient drones that respond to mouse position. Audio can be toggled on/off. |
| US-08 | As a **performing artist**, I want the OSC bridge to support multiple simultaneous client connections, so that many audience members can participate at once. | The bridge server accepts N concurrent WebSocket connections and forwards all messages to the same OSC output. |

#### Could Have

| ID | User Story | Acceptance Criteria |
|:---|:-----------|:-------------------|
| US-09 | As a **festival attendee**, I want press/release state to be transmitted alongside position data, so that artists can map pressure gestures. | `/press` OSC address sends `1` on touch start and `0` on touch end. |
| US-10 | As a **site visitor**, I want a physics-based triangle animation with rope dynamics on the About Us page, so that the site stands out visually. | SVG triangles follow the cursor using Fibonacci-scaled squares with gravity, damping, and wall collision. |

#### Won't Have (for MVP)

| ID | User Story |
|:---|:-----------|
| US-11 | As a user, I want to log in and save my interaction history. |
| US-12 | As a user, I want to stream my camera or microphone input to the audiovisual system. |
| US-13 | As a user, I want AR/VR overlays during the performance. |

### 1.2 Mockups

Since the MVP is primarily a browser-based interaction tool and informational website, mockups describe the two main screens:

#### Screen 1: Single-Page Home (`/`)

```
┌─────────────────────────────────────────────────┐
│  IAMBICA          About Us | Mission | Interact │  ← Fixed Header
├─────────────────────────────────────────────────┤
│                                                 │
│            ┌───────────────┐                    │
│            │   3D CUBE     │                    │  ← Section 1: Welcome
│            │  (draggable)  │                    │     p5.js WEBGL Canvas
│            └───────────────┘                    │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│   △  △  △  △  △  (Animated Triangles)          │  ← Section 2: About Us
│   ─────rope physics─────                        │     SVG + Physics + Audio
│   Festival information text                     │
│                                                 │
├─────────────────────────────────────────────────┤
│        Mission Statement (Coming Soon)          │  ← Section 3: Mission
├─────────────────────────────────────────────────┤
│        Philosophy (Coming Soon)                 │  ← Section 4: Philosophy
├─────────────────────────────────────────────────┤
│   "Control OSC data in real-time"               │  ← Section 5: Interact CTA
│        [ Go to Interact → ]                     │
├─────────────────────────────────────────────────┤
│  🔊 Audio Toggle (bottom-left)                  │
│  © 2026 Festival Iámbica (Footer)               │
└─────────────────────────────────────────────────┘
```

#### Screen 2: Interact Page (`/interact`)

```
┌─────────────────────────────────────────────────┐
│  IAMBICA    About Us | Mission | Interact       │  ← Header (hidden on mobile)
├─────────────────────────────────────────────────┤
│                                                 │
│    ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐    │
│    │         Grid Background               │    │
│    │                                       │    │
│    │              ◉ ← Cursor               │    │  ← Full-screen Canvas
│    │         ───┼─── Crosshair             │    │     Touch/Mouse tracking
│    │              (when connected)          │    │
│    │                                       │    │
│    └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘    │
│                                                 │
│  ┌─────────────────────────────┐  ┌──────────┐ │
│  │ Host: [192.168.1.x] Port: [8000]│ [Connect]│ │  ← OSC Controls
│  │ ● Connected  X: 0.512  Y: 0.334 │          │ │
│  └─────────────────────────────┘  └──────────┘ │
│                                                 │
│                         ┌───────────────────┐   │
│                         │ OSC Messages      │   │  ← Info Panel (desktop)
│                         │ /mouse/x  (0-1)   │   │
│                         │ /mouse/y  (0-1)   │   │
│                         │ /mouse/xy (x,y)   │   │
│                         │ /press    (0/1)   │   │
│                         └───────────────────┘   │
└─────────────────────────────────────────────────┘
```

**Mobile Variant:** On screens ≤ 768 px, the header is replaced with a small logo button, settings collapse into a toggleable panel at the bottom, and the canvas occupies the full viewport for maximum touch area.

---

## 2. System Architecture

### 2.1 High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────┐           │
│  │   Single-Page Home   │    │    Interact Page      │           │
│  │   (React + p5.js)    │    │    (React + Canvas)   │           │
│  │                      │    │                       │           │
│  │  • 3D Cube           │    │  • Touch/Mouse Input  │           │
│  │  • Triangle Physics  │    │  • WebSocket Client   │           │
│  │  • Web Audio API     │    │  • OSC Message Sender │           │
│  │  • Scroll Sections   │    │  • Connection Mgmt    │           │
│  └──────────────────────┘    └───────────┬───────────┘           │
│                                          │                       │
│           Smartphone Browser (Safari / Chrome / Firefox)         │
└──────────────────────────────────────────┼───────────────────────┘
                                           │
                                     WebSocket (JSON)
                                     ws://host:8000
                                           │
┌──────────────────────────────────────────┼───────────────────────┐
│                     BRIDGE LAYER         │                       │
│                                          ▼                       │
│                    ┌─────────────────────────┐                   │
│                    │    osc-bridge.js         │                   │
│                    │    (Node.js Server)      │                   │
│                    │                          │                   │
│                    │  • WebSocket Server      │                   │
│                    │  • JSON → OSC Conversion │                   │
│                    │  • Multi-Client Support  │                   │
│                    │  • Configurable Ports    │                   │
│                    └────────────┬────────────┘                   │
│                                 │                                │
└─────────────────────────────────┼────────────────────────────────┘
                                  │
                            UDP / OSC Protocol
                            host:9000
                                  │
┌─────────────────────────────────┼────────────────────────────────┐
│              AUDIOVISUAL LAYER  │                                │
│                                 ▼                                │
│       ┌─────────────────┐  ┌─────────────────┐                  │
│       │  TouchDesigner   │  │    Max MSP       │                 │
│       │  (Visual Engine) │  │  (Audio Engine)  │                 │
│       └─────────────────┘  └─────────────────┘                  │
│                                                                  │
│        Receives /mouse/x, /mouse/y, /mouse/xy, /press           │
│        Maps data to real-time visuals and sound                  │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 Deployment Architecture

```
┌────────────────────────────────────────────────┐
│            Local Network (Festival Venue)       │
│                                                 │
│  ┌──────────┐   Wi-Fi    ┌─────────────────┐  │
│  │ Audience  │ ─────────→ │  Vite Dev Server │  │
│  │ Phones    │ ←───────── │  (serves React)  │  │
│  │ (N users) │            │  Port 5173       │  │
│  └──────────┘             └─────────────────┘  │
│       │                                         │
│       │  WebSocket        ┌─────────────────┐  │
│       └──────────────────→│  OSC Bridge      │  │
│                           │  Port 8000 (WS)  │  │
│                           │  Port 9000 (OSC) │  │
│                           └────────┬────────┘  │
│                                    │ UDP/OSC    │
│                           ┌────────▼────────┐  │
│                           │  Performance PC  │  │
│                           │  TouchDesigner / │  │
│                           │  Max MSP         │  │
│                           └─────────────────┘  │
└────────────────────────────────────────────────┘
```

### 2.3 Technology Stack Summary

| Layer | Technology | Version | Purpose |
|:------|:-----------|:--------|:--------|
| Frontend Framework | React | 19.2 | Component-based UI |
| Routing | React Router DOM | 7.12 | Client-side navigation |
| 3D Graphics | p5.js | 2.2 | WebGL 3D cube rendering |
| Audio | Web Audio API | Native | Sound synthesis and effects |
| Canvas | Canvas 2D API | Native | Interact page rendering |
| Build Tool | Vite (Rolldown) | 7.2.5 | Development server and bundling |
| Bridge Server | Node.js | ≥18 | WebSocket-to-OSC conversion |
| Real-Time Comm. | WebSocket | Native | Client-server messaging |
| OSC Library | osc (npm) | 2.4.5 | OSC UDP packet encoding |
| Linting | ESLint | 9.39 | Code quality enforcement |

---

## 3. Components, Classes, and Database Design

### 3.1 Component Hierarchy

```
App.jsx
├── <BrowserRouter>
│   └── <Routes>
│       ├── Route "/" → SinglePageHome.jsx
│       │   ├── <Header />              (fixed navigation bar)
│       │   ├── Section: Welcome
│       │   │   └── p5.js Canvas        (3D interactive cube)
│       │   ├── Section: About Us
│       │   │   ├── <Triangle />         (React.memo, physics-based SVG)
│       │   │   └── useAudio() hook      (Web Audio API)
│       │   ├── Section: Mission         (placeholder)
│       │   ├── Section: Philosophy      (placeholder)
│       │   ├── Section: Interact CTA    (link to /interact)
│       │   ├── Audio Toggle Button
│       │   └── <Footer />
│       │
│       └── Route "/interact" → Interact.jsx
│           ├── <Header /> or Logo       (responsive: desktop/mobile)
│           ├── <canvas>                 (full-screen 2D canvas)
│           ├── OSC Controls Panel       (host, port, connect/disconnect)
│           └── Info Panel               (OSC message reference)
```

### 3.2 Key Component Specifications

#### `SinglePageHome.jsx`

| Responsibility | Details |
|:---------------|:--------|
| State | `audioEnabled`, scroll position, cube rotation angles |
| Dependencies | p5.js, useAudio hook, React Router Link |
| Rendering | Five full-screen `<section>` elements with `scroll-snap-align: start` |
| Performance | React.memo on Triangle, throttled animation (every 3 frames), memoized arrays |

#### `Interact.jsx`

| Responsibility | Details |
|:---------------|:--------|
| State | `isConnected`, `wsConnection`, `oscHost`, `oscPort`, `mousePos`, `isPressing`, `isMobile`, `showSettings` |
| Methods | `connectOSC()`, `disconnectOSC()`, `sendOSC(address, args)`, `handleInteraction(e)`, `handlePressStart(e)`, `handlePressEnd()` |
| Effects | Canvas animation loop, canvas resize handler, mobile detection |
| OSC Output | `/mouse/x [float]`, `/mouse/y [float]`, `/mouse/xy [float, float]`, `/press [int]` |

#### `useAudio.js` (Custom Hook)

| Feature | Implementation |
|:--------|:---------------|
| Audio Context | Lazy-initialized `AudioContext` with 0.3 master gain |
| Collision Sounds | Sine oscillator + white noise burst; frequency mapped to triangle size; velocity controls volume |
| Ambient Drones | One drone per triangle using pentatonic scales (C, D, B minor); LFO modulation; position-based filter control |
| Mouse Sound | Theremin-like: X → frequency (200–1000 Hz), Y → filter cutoff (500–2500 Hz); triangle wave oscillator |
| Toggle | Enable/disable with full cleanup of oscillators and gain nodes |

#### `osc-bridge.js` (Node.js Server)

| Feature | Implementation |
|:--------|:---------------|
| WebSocket Server | `ws` library, default port 8000 |
| OSC UDP Port | `osc` library, sends to configurable host:port (default 127.0.0.1:9000) |
| Message Format | Receives `{ address: string, args: number[] }` JSON, converts to OSC with `f` (float) or `s` (string) types |
| CLI Args | `--ws-port`, `--osc-port`, `--osc-host` |
| Lifecycle | Graceful shutdown on `SIGINT` |

### 3.3 Database / Data Storage Design

The IAMBICA MVP **does not use a database**. All data is transient:

- **Client state** is held in React component state (`useState`) and is ephemeral per session.
- **OSC messages** are fire-and-forget UDP packets with no persistence layer.
- **Configuration** (host, port) is held in component state; no server-side storage.

**Justification:** The project scope explicitly excludes user accounts, authentication, and analytics dashboards. The MVP's purpose is real-time interaction during live performances, where data persistence provides no value. Future iterations may introduce a lightweight storage layer (e.g., SQLite or a JSON log) for post-event analysis if needed.

### 3.4 Data Flow Diagram

```
User Input (touch/mouse)
       │
       ▼
┌──────────────┐     JSON (WebSocket)     ┌──────────────┐     OSC (UDP)     ┌──────────────┐
│  React State │ ──────────────────────── │  osc-bridge  │ ─────────────── │ TouchDesigner │
│  (Interact)  │   { address, args[] }    │  (Node.js)   │  /mouse/x [f]   │ / Max MSP     │
└──────────────┘                          └──────────────┘                  └──────────────┘
       │
       ▼
  Canvas Render
  (visual feedback)
```

---

## 4. Sequence Diagrams

### 4.1 OSC Interaction Flow (Primary Use Case)

```
┌──────────┐          ┌───────────┐          ┌───────────┐          ┌──────────────┐
│  User    │          │  Interact │          │ OSC Bridge│          │ TouchDesigner│
│ (Phone)  │          │  (React)  │          │ (Node.js) │          │ / Max MSP    │
└────┬─────┘          └─────┬─────┘          └─────┬─────┘          └──────┬───────┘
     │                      │                      │                       │
     │  1. Open /interact   │                      │                       │
     │─────────────────────>│                      │                       │
     │                      │                      │                       │
     │  2. Enter host:port  │                      │                       │
     │─────────────────────>│                      │                       │
     │                      │                      │                       │
     │  3. Tap "Connect"    │                      │                       │
     │─────────────────────>│  4. WebSocket open   │                       │
     │                      │─────────────────────>│                       │
     │                      │  5. onopen callback  │                       │
     │                      │<─────────────────────│                       │
     │  6. "● Connected"    │                      │                       │
     │<─────────────────────│                      │                       │
     │                      │                      │                       │
     │  7. Touch/drag       │                      │                       │
     │─────────────────────>│                      │                       │
     │                      │  8. JSON message     │                       │
     │                      │  {address:"/mouse/x",│                       │
     │                      │   args:[0.72]}       │                       │
     │                      │─────────────────────>│  9. OSC UDP packet    │
     │                      │                      │  /mouse/x 0.72       │
     │                      │                      │──────────────────────>│
     │                      │                      │                       │
     │                      │                      │                       │  10. Map to
     │                      │                      │                       │  visuals/audio
     │                      │                      │                       │
     │  11. Release touch   │                      │                       │
     │─────────────────────>│  12. /press [0]      │                       │
     │                      │─────────────────────>│  13. /press 0         │
     │                      │                      │──────────────────────>│
     │                      │                      │                       │
```

### 4.2 Homepage Audio Interaction Flow

```
┌──────────┐          ┌────────────────┐          ┌──────────────┐
│  User    │          │ SinglePageHome │          │  useAudio    │
│          │          │                │          │  (Hook)      │
└────┬─────┘          └───────┬────────┘          └──────┬───────┘
     │                        │                          │
     │  1. Click audio toggle │                          │
     │───────────────────────>│  2. initAudio()          │
     │                        │─────────────────────────>│
     │                        │                          │  3. Create AudioContext
     │                        │                          │  4. Create master gain (0.3)
     │                        │  5. audioReady           │
     │                        │<─────────────────────────│
     │                        │                          │
     │  6. Scroll to About Us │                          │
     │───────────────────────>│                          │
     │                        │  7. startAmbient()       │
     │                        │─────────────────────────>│
     │                        │                          │  8. Create drone oscillators
     │                        │                          │     (pentatonic scales)
     │                        │                          │  9. Apply LFO modulation
     │                        │                          │
     │  10. Move mouse/touch  │                          │
     │───────────────────────>│  11. updatePosition(x,y) │
     │                        │─────────────────────────>│
     │                        │                          │  12. X → filter brightness
     │                        │                          │  13. Y → drone volume
     │                        │                          │
     │                        │  14. Triangle collision  │
     │                        │─────────────────────────>│
     │                        │                          │  15. Trigger collision sound
     │                        │                          │      (sine + noise burst)
     │                        │                          │
```

### 4.3 Application Startup Flow

```
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌───────────┐
│ Browser  │       │ Vite Dev │       │ React    │       │ p5.js     │
│          │       │ Server   │       │ App      │       │ Canvas    │
└────┬─────┘       └────┬─────┘       └────┬─────┘       └─────┬─────┘
     │                   │                  │                    │
     │  1. GET /         │                  │                    │
     │──────────────────>│                  │                    │
     │  2. index.html    │                  │                    │
     │<──────────────────│                  │                    │
     │  3. Load JS bundle│                  │                    │
     │──────────────────>│                  │                    │
     │  4. Bundle (ESM)  │                  │                    │
     │<──────────────────│                  │                    │
     │                   │                  │                    │
     │  5. ReactDOM.createRoot()            │                    │
     │─────────────────────────────────────>│                    │
     │                   │                  │  6. Router match / │
     │                   │                  │─────────────────── │
     │                   │                  │  7. Render Home    │
     │                   │                  │──────────────────>│
     │                   │                  │                    │  8. Init WEBGL
     │                   │                  │                    │  9. Draw 3D cube
     │  10. Interactive page rendered        │                    │
     │<─────────────────────────────────────│                    │
     │                   │                  │                    │
```

---

## 5. API Specifications

### 5.1 External APIs and Services

IAMBICA does not consume external REST APIs or third-party web services. All communication is local-network-only via WebSocket and OSC protocols.

| Protocol | Role | Direction |
|:---------|:-----|:----------|
| WebSocket | Client → Bridge | Outbound from browser to Node.js server |
| OSC / UDP | Bridge → AV Software | Outbound from Node.js to TouchDesigner / Max MSP |

### 5.2 Internal API: WebSocket Message Protocol

The Interact page communicates with the OSC bridge via a WebSocket JSON protocol.

#### Connection

| Parameter | Value |
|:----------|:------|
| Protocol | `ws://` |
| Default Host | `127.0.0.1` (or auto-detected LAN IP on mobile) |
| Default Port | `8000` |
| Message Format | JSON |

#### Message Schema

```json
{
  "address": "/mouse/x",
  "args": [0.523]
}
```

| Field | Type | Description |
|:------|:-----|:------------|
| `address` | `string` | OSC address pattern (e.g., `/mouse/x`) |
| `args` | `array` | Array of values (numbers or strings) |

#### Defined OSC Addresses

| Address | Args | Type | Range | Description |
|:--------|:-----|:-----|:------|:------------|
| `/mouse/x` | `[x]` | float | 0.0 – 1.0 | Normalized horizontal position |
| `/mouse/y` | `[y]` | float | 0.0 – 1.0 | Normalized vertical position |
| `/mouse/xy` | `[x, y]` | float, float | 0.0 – 1.0 each | Both coordinates |
| `/press` | `[state]` | integer | 0 or 1 | 1 = pressing, 0 = released |

#### Example Messages

```json
// Mouse movement
{ "address": "/mouse/x", "args": [0.723] }
{ "address": "/mouse/y", "args": [0.412] }
{ "address": "/mouse/xy", "args": [0.723, 0.412] }

// Touch press start
{ "address": "/press", "args": [1] }

// Touch release
{ "address": "/press", "args": [0] }
```

### 5.3 Internal API: OSC Bridge Server CLI

```bash
node osc-bridge.js [--ws-port <port>] [--osc-port <port>] [--osc-host <host>]
```

| Argument | Default | Description |
|:---------|:--------|:------------|
| `--ws-port` | `8000` | WebSocket server listen port |
| `--osc-port` | `9000` | OSC UDP destination port |
| `--osc-host` | `127.0.0.1` | OSC UDP destination host |

### 5.4 Client-Side Routes

| Route | Component | Description |
|:------|:----------|:------------|
| `/` | `SinglePageHome` | Festival landing page with all content sections |
| `/interact` | `Interact` | Full-screen OSC controller interface |

---

## 6. SCM and QA Plans

### 6.1 Source Control Management (SCM)

#### Repository Setup

| Item | Value |
|:-----|:------|
| Platform | GitHub |
| Repository | Private, team access |
| Main Branch | `main` |
| Branch Strategy | Feature branching |

#### Branching Strategy

```
main ─────────────────────────────────────────────────
  │                          ▲              ▲
  ├── feature/osc-bridge ───┘              │
  │                                         │
  ├── feature/interact-page ───────────────┘
  │
  ├── feature/audio-system ──── ...
  │
  └── fix/mobile-touch ──── ...
```

**Rules:**
- `main` branch is the stable, deployable branch.
- All work is done on feature branches named `feature/<description>` or `fix/<description>`.
- Pull requests (PRs) are required to merge into `main`.
- Each PR requires at least one team member review before merging.
- Commits follow conventional format: `type: short description` (e.g., `feat: add OSC bridge server`, `fix: resolve mobile touch offset`).

#### Commit Message Convention

```
<type>: <short description>

Types:
  feat     — New feature
  fix      — Bug fix
  docs     — Documentation only
  style    — Formatting, no code change
  refactor — Code restructuring
  test     — Adding or updating tests
  chore    — Build process or tooling
```

### 6.2 Quality Assurance (QA) Plan

#### Testing Strategy

| Level | Scope | Method | Tools |
|:------|:------|:-------|:------|
| **Manual Functional** | User stories US-01 through US-10 | Exploratory testing against acceptance criteria | Browser DevTools, multiple devices |
| **Cross-Browser** | US-01 compatibility | Test on Safari (iOS), Chrome (Android/Desktop), Firefox | Physical devices + BrowserStack |
| **Cross-Device** | Mobile responsiveness | Verify layout, touch input, and canvas rendering | iPhone, Android phones, tablets |
| **Network** | OSC latency and reliability | Measure round-trip time under load | Wireshark, console timestamps |
| **Performance** | 60 fps rendering | Profile frame rate on homepage and interact page | Chrome DevTools Performance tab |
| **Linting** | Code quality | Automated ESLint on all `.js`/`.jsx` files | ESLint 9.39 with React plugins |

#### QA Checklist (per PR)

- [ ] Code passes `npm run lint` with no errors
- [ ] `npm run build` completes without errors
- [ ] Feature works on Chrome desktop
- [ ] Feature works on Safari iOS
- [ ] Feature works on Chrome Android
- [ ] No console errors in browser DevTools
- [ ] OSC messages confirmed received in TouchDesigner/Max MSP (if applicable)
- [ ] Responsive layout verified at 375 px, 768 px, and 1440 px widths

#### Pre-Deployment Testing

Before festival deployment, the team will conduct:

1. **End-to-end test on venue Wi-Fi:** Verify that phones can load the site and send OSC data over the actual network.
2. **Load test with N simultaneous devices:** Connect 10+ devices and confirm the OSC bridge handles concurrent connections.
3. **Fallback plan:** If the WebSocket connection fails during a performance, the audiovisual system will fall back to pre-programmed sequences.

---

## 7. Technical Justifications

### 7.1 Technology Choices

| Decision | Choice | Justification |
|:---------|:-------|:--------------|
| **Frontend Framework** | React 19 | Component-based architecture supports modular UI development. Hooks enable clean state management for audio, canvas, and WebSocket logic. Widely adopted with strong ecosystem support. |
| **3D Rendering** | p5.js (WEBGL) | Provides an accessible creative-coding API for 3D graphics without requiring raw WebGL knowledge. Well-suited for artistic, interactive visuals. Lightweight compared to Three.js for this scope. |
| **Audio Engine** | Web Audio API (native) | No external library required. Provides low-latency synthesis, filters, and effects directly in the browser. Essential for real-time collision sounds and ambient audio. |
| **Real-Time Protocol** | WebSocket | Full-duplex, low-latency communication supported natively by all modern browsers. No polling overhead. Ideal for streaming continuous touch position data. |
| **AV Integration** | OSC over UDP | Industry-standard protocol for creative/media software (TouchDesigner, Max MSP, Ableton). UDP provides minimal latency with no connection overhead—packet loss is acceptable for real-time control data. |
| **Bridge Architecture** | Node.js server | JavaScript on both client and server simplifies the stack. The `osc` npm package provides reliable OSC encoding. Node.js handles concurrent WebSocket connections efficiently via its event loop. |
| **Build Tool** | Vite (Rolldown) | Near-instant HMR (Hot Module Replacement) during development. Fast production builds. Native ESM support aligns with modern React. |
| **No Database** | N/A | The MVP scope excludes user accounts, analytics, and persistent data. All interaction data is ephemeral and streamed in real time. Adding a database would introduce unnecessary complexity. |
| **No Authentication** | N/A | Festival attendees must join instantly without friction. Requiring login would conflict with the goal of zero-install, instant participation. Out of scope per project charter. |

### 7.2 Architectural Decisions

| Decision | Rationale |
|:---------|:----------|
| **Single-page scroll layout** | Festival information is presented as a continuous narrative. Scroll-snap provides a structured yet fluid experience without full page reloads. |
| **Separate Interact route** | The OSC controller is functionally distinct from the informational site. A dedicated route provides a full-screen canvas without interference from other UI elements. |
| **Bridge server as separate process** | Decoupling the WebSocket-to-OSC bridge from the frontend build allows independent deployment and configuration. The bridge can run on any machine on the local network. |
| **Normalized coordinates (0–1)** | Sending normalized values rather than pixel coordinates makes the system resolution-independent. Artists can map the 0–1 range to any parameter in their AV software. |
| **Mobile-first responsive design** | The primary users are festival attendees on smartphones. The interface prioritizes touch interaction, large tap targets, and minimal chrome on small screens. |
| **No external API dependencies** | The platform operates entirely on a local network during performances. Avoiding external API calls eliminates internet dependency, reduces latency, and improves reliability in venue environments where connectivity may be limited. |

### 7.3 Constraints Addressed

| Constraint | How Addressed |
|:-----------|:-------------|
| No native app installation | Browser-based PWA-ready architecture; accessible via URL |
| Limited festival Wi-Fi bandwidth | Small JSON payloads (~50 bytes per message); no media streaming |
| Diverse device landscape | Responsive design; tested on iOS Safari + Android Chrome |
| Real-time latency requirements | WebSocket + UDP/OSC pipeline minimizes hops; no database writes in the critical path |
| Limited development timeline | React component reuse; p5.js abstracts WebGL complexity; Vite accelerates development feedback loop |

---

*Document prepared for IAMBICA — Portfolio Project Stage 3*
*© 2026 Festival Iámbica. Puerto Rico.*
