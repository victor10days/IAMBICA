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
## Project Purpose

The purpose of this project is to design and prototype a browser-based interactive platform that allows festival audiences to actively participate in audiovisual artworks using their personal mobile devices. The project aims to extend the on-site festival experience through accessible, real-time digital interaction, while reinforcing Iámbica’s mission of experimental and technology-driven artistic practices.

## SMART Objectives
- Develop a functional MVP of a browser-based interactive platform that captures user sensor or media input (motion, camera, or sound) and transmits it to audiovisual systems in real time during the festival.

- Enable audience participation without app installation by implementing a mobile-friendly web interface accessible through standard smartphone browsers.

- Establish a scalable technical foundation that can be reused and expanded for future editions of the Iámbica festival and other cultural events.


## Stakeholders and Roles Summary

| Category     | Stakeholder                                     | Role                                        | Responsibility                                             |
|:-------------|:------------------------------------------------|:--------------------------------------------|:-----------------------------------------------------------|
| **Internal** | Maria Isabel Rodriguez                          | Project Director / Manager                  | Oversees planning, coordination, and progress tracking     |
| **Internal** | Felix Adorno                                    | Artistic Co-Director                        | Defines artistic vision and festival alignment             |
| **Internal** | Araceli Pino                                    | Artistic Co-Director                        | Supports curatorial decisions and experience design        |
| **Internal** | Donald Escudero                                 | Administration & Logistics Director         | Manages logistics, documentation, and operations           |
| **Internal** | Víctor E. Díaz                                  | Interactive Media & Programming Director    | Leads technical design and MVP development                 |
| **Internal** | Instructors / Tutors                            | Academic Advisors                           | Provide guidance, feedback, and evaluation                 |
| **External** | Festival Attendees                              | End Users                                   | Interact with the platform during performances             |
| **External** | Participating Artists                           | Creative Contributors                       | Integrate platform into audiovisual installations          |
| **External** | Cultural Partners                               | Strategic Allies                            | Provide support, visibility, and future adoption potential |
| **External** | Technical Infrastructure Providers              | Technical Support                           | Provide networking and hardware support during event       |


## Project Scope

### In-Scope Items
The project will include:
- A browser-based mobile interface accessible through standard smartphone web browsers
- Real-time audience interaction using selected device inputs (e.g., motion, camera, or sound)
- A backend system to receive, process, and route interaction data to audiovisual installations
- Live feedback between audience input and audiovisual outputs during the festival
- Basic data storage to support testing, evaluation, and future iteration
- Integration with on-site audiovisual systems used by participating artists

### Out-of-Scope Items
The project will not include:
- Native mobile applications for iOS or Android
- User account creation, authentication, or long-term profiles
- Social networking, chat, or messaging features
- Advanced data analytics or reporting dashboards
- Augmented reality (AR) or virtual reality (VR) experiences
- Post-festival commercial deployment or monetization features

### Scope Control Statement
Any features or changes not explicitly listed within the in-scope items will be considered out of scope and require team discussion and approval to be included.


## Risk Management

| Risk Area             | Risk Description                                             | Impact  | Mitigation Strategy                                                  |
|:----------------------|:-------------------------------------------------------------|:--------|:---------------------------------------------------------------------|
| **Technology**        | Unstable or slow network affecting real-time interaction     | High    | Limit data payloads, pre-test system, prepare fallback mode          |
| **Technology**        | Browser/device compatibility issues across smartphones       | Medium  | Design for common browsers, test on multiple devices                 |
| **Timeline**          | Limited time to develop and test MVP                         | High    | Prioritize core features, avoid non-essential functionality          |
| **Team Coordination** | Misalignment between artistic vision and technical execution | Medium  | Maintain regular check-ins and collaborative decision validation     |
| **User Experience**   | Privacy concerns with camera/microphone permissions          | Medium  | Clearly communicate permissions, minimize data collection            |

### Risk Management Approach

Risks will be reviewed periodically during the project. If a risk begins to impact progress, mitigation actions will be prioritized to maintain project scope and timeline.


## High-Level Project Plan

### Purpose
To outline the major phases of the project and identify key milestones that guide the project from initial concept to completion.

### Project Timeline and Phases

#### Stage 1: Idea Development (Completed)
**Key Activities**
- Team formation and role definition
- Brainstorming and evaluation of multiple ideas
- Selection of MVP concept

**Milestone:** MVP concept selected and documented

#### Stage 2: Project Charter Development (Current)
**Key Activities**
- Define project objectives and scope
- Identify stakeholders and team roles
- Assess risks and mitigation strategies
- Develop high-level project plan

**Milestone:** Project Charter finalized and approved

#### Stage 3: Technical Documentation
**Key Activities**
- Define system architecture and data flow
- Document interaction logic and technical requirements
- Identify tools, technologies, and integration needs

**Milestone:** Technical documentation completed

#### Stage 4: MVP Development
**Key Activities**
- Develop front-end and back-end components
- Implement real-time data capture and processing
- Integrate platform with audiovisual systems
- Conduct testing and refinements

**Milestone:** Functional MVP ready for deployment

#### Stage 5: Project Closure
**Key Activities**
- Deploy MVP during the festival
- Collect feedback and evaluate performance
- Document outcomes and lessons learned

**Milestone:** Project presentation and closure completed

### High-Level Timeline

| Project Stage                      | Estimated Timeframe | Status      |
|:-----------------------------------|:--------------------|:------------|
| Stage 1: Idea Development          | Completed           | ✓ Complete  |
| Stage 2: Project Charter           | Weeks 1–4           | In Progress |
| Stage 3: Technical Documentation   | Weeks 5–6           | Pending     |
| Stage 4: MVP Development           | Weeks 7–10          | Pending     |
| Stage 5: Project Closure           | Weeks 11–12         | Pending     |

### Planning Note
This high-level plan provides a flexible framework that allows adjustments based on technical findings and time constraints while maintaining focus on the core project objectives.


---

© 2026 Festival Iámbica. Puerto Rico.
