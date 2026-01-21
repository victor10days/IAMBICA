# IAMBICA Project Structure

## Directory Organization

```
IAMBICA/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components (routes)
│   │   ├── InteractiveCube.jsx    # Homepage with 3D cube navigation
│   │   ├── AboutUs.jsx            # About Us page with triangle animation
│   │   ├── Mission.jsx            # Mission page (placeholder)
│   │   ├── Philosophy.jsx         # Philosophy page (placeholder)
│   │   ├── Interact.jsx           # Interact page (placeholder)
│   │   └── homepage.jsx           # Original homepage (archived)
│   ├── hooks/              # Custom React hooks
│   │   └── useAudio.js            # Audio system hook
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── package.json
└── PROJECT_STRUCTURE.md
```

## Key Components

### Pages
- **InteractiveCube.jsx** - Interactive 3D cube homepage using p5.js WEBGL
- **AboutUs.jsx** - Page with animated triangles and Fibonacci rope physics
- **Mission.jsx, Philosophy.jsx, Interact.jsx** - Placeholder pages for future content

### Hooks
- **useAudio.js** - Custom hook managing Web Audio API for collision sounds, ambient sound, and mouse interactions

### Routing
- **App.jsx** - Contains React Router setup with smooth fade transitions between pages

## Color Palette
- Cream: `#FAF3E1`
- Light Cream: `#F5E7C6`
- Dark: `#222222`
- Red: `#D22B2B`

## Typography
- Primary Font: Georgia (serif)
- Style: Minimalistic, elegant

## Features
- Interactive 3D cube navigation
- Smooth page transitions (300ms fade)
- Physics-based triangle animations
- Web Audio API integration
- Click vs drag detection for stable navigation
