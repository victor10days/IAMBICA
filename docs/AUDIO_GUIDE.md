# IAMBICA Audio System Guide

## Introduction

This guide explains the interactive audio system for IAMBICA, built using the Web Audio API. The system creates a hybrid audio experience combining:
- **Ambient generative music** that responds to triangle positions
- **Collision sounds** triggered when triangles bounce off walls
- **Mouse-tracking synthesis** controlled by cursor movement

---

## Table of Contents

1. [Web Audio API Basics](#web-audio-api-basics)
2. [System Architecture](#system-architecture)
3. [Code Walkthrough](#code-walkthrough)
4. [Creating Your Own Sounds](#creating-your-own-sounds)
5. [Quick Reference](#quick-reference)

---

## Web Audio API Basics

The Web Audio API works like a modular synthesizer - you create **nodes** (sound sources, effects, etc.) and **connect** them together to build complex sounds.

### Basic Workflow

```javascript
// 1. Create an AudioContext (the "engine" for all audio)
const audioContext = new AudioContext();

// 2. Create nodes (sound sources, effects, etc.)
const oscillator = audioContext.createOscillator();  // Generates tones
const gainNode = audioContext.createGain();          // Controls volume

// 3. Connect them: oscillator → gain → speakers
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);  // destination = speakers

// 4. Start/stop sounds
oscillator.start();
oscillator.stop();
```

### Key Concepts

- **AudioContext**: The main engine that manages all audio operations
- **Nodes**: Building blocks (oscillators, filters, gain controls, etc.)
- **Connections**: Audio signal flows from one node to another
- **Destination**: Your speakers/headphones (the final output)

---

## System Architecture

The audio system in IAMBICA consists of:

### File Structure
```
src/
├── useAudio.js       # Custom hook managing all audio functionality
└── homepage.jsx      # Main component integrating audio with visuals
```

### Audio Components

1. **Audio Context Initialization** - Sets up the Web Audio API
2. **Master Gain Control** - Global volume control for all sounds
3. **Collision Sound Generator** - Creates impact sounds on wall bounces
4. **Ambient Music Generator** - Continuous drone soundscape
5. **Mouse Sound Generator** - Interactive cursor-controlled tones

---

## Code Walkthrough

### 1. Setup & Initialization

```javascript
import { useRef, useEffect, useState, useCallback } from 'react';

export const useAudio = () => {
  // Store the audio context (must persist across renders)
  const audioContextRef = useRef(null);

  // Track if user has enabled audio
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // Master volume control for all sounds
  const masterGainRef = useRef(null);

  // Store active oscillators (for ambient drones)
  const oscillatorsRef = useRef([]);
  const ambienceOscillatorsRef = useRef([]);
```

**Why useRef?**
- Audio nodes must persist between React re-renders
- `useRef` keeps the same object instance across renders
- Audio context should only be created once

```javascript
  // Initialize Audio Context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      // Create the audio context (only once)
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

      // Create master volume control
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.gain.value = 0.3;  // 30% volume
      masterGainRef.current.connect(audioContextRef.current.destination);
    }

    // Resume if browser auto-suspended it
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    setIsAudioEnabled(true);
  }, []);
```

**Key Points:**
- `AudioContext` is the main engine - create it once
- `createGain()` creates a volume control node
- `gain.value` sets volume level (0 = silent, 1 = full volume)
- `destination` represents your speakers

---

### 2. Collision Sound Generator

This creates a "ping" sound when triangles hit walls.

```javascript
const playCollisionSound = useCallback((velocity, size) => {
  if (!audioContextRef.current || !isAudioEnabled) return;

  const ctx = audioContextRef.current;
  const now = ctx.currentTime;  // Current time in seconds
```

#### Part A: Creating the Tone

```javascript
  // === TONE PART ===
  const osc = ctx.createOscillator();        // Creates a tone
  const gain = ctx.createGain();             // Volume envelope
  const filter = ctx.createBiquadFilter();   // EQ/filtering

  // Map size to frequency: larger triangles = lower pitch
  const baseFreq = 200 + (1 / size) * 400;

  // Higher velocity = slightly higher pitch
  const velocityFactor = Math.min(velocity / 5, 2);

  osc.frequency.value = baseFreq * (1 + velocityFactor * 0.3);
  osc.type = 'sine';  // Smooth, pure tone
```

**Frequency Mapping:**
- Small triangle (size = 50): `200 + (1/50)*400 = 208 Hz`
- Large triangle (size = 160): `200 + (1/160)*400 = 202.5 Hz`
- Result: Larger objects sound deeper!

**Oscillator Types:**
- `sine` - Pure, smooth tone (like a flute)
- `square` - Hollow, clarinet-like
- `sawtooth` - Bright, brassy
- `triangle` - Mellow, between sine and square

```javascript
  // Low-pass filter: cuts high frequencies for warmth
  filter.type = 'lowpass';
  filter.frequency.value = 2000 + velocity * 100;  // Faster = brighter
  filter.Q.value = 1;  // Resonance amount
```

**Filter Explanation:**
- **Lowpass**: Only frequencies below the cutoff pass through
- **Cutoff frequency**: The point where filtering begins
- **Q (resonance)**: How much the filter "rings" at the cutoff
  - Low Q (0.1-1): Gentle slope, natural sound
  - High Q (5-20): Sharp peak, vocal/electronic sound

```javascript
  // Volume envelope: fade in quickly, fade out slowly
  gain.gain.value = 0;  // Start silent
  gain.gain.setTargetAtTime(
    Math.min(velocity * 0.15, 0.3),  // Target volume (velocity-dependent)
    now,                              // Start time
    0.01                              // Time constant (how fast to reach target)
  );
  gain.gain.setTargetAtTime(0, now + 0.05, 0.1);  // Fade out after 0.05s
```

**Understanding `setTargetAtTime`:**
```javascript
gain.gain.setTargetAtTime(targetValue, startTime, timeConstant);
```
- `targetValue`: The volume you're aiming for
- `startTime`: When to start (in seconds from context creation)
- `timeConstant`: How fast to approach the target
  - Smaller values = faster (0.001 = almost instant)
  - Larger values = slower (1.0 = gradual fade)

**Envelope Visualization:**
```
Volume
  |
  |     /\
  |    /  \___
  |   /        \____
  |__/______________\_______ Time
     ^    ^         ^
   Attack Peak    Decay
```

```javascript
  // Connect: oscillator → filter → gain → speakers
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(masterGainRef.current);

  osc.start(now);
  osc.stop(now + 0.5);  // Cleanup after 0.5 seconds
```

**Signal Flow:**
```
Oscillator (tone)
    ↓
Filter (EQ/tone shaping)
    ↓
Gain (volume control)
    ↓
Master Gain (overall volume)
    ↓
Destination (speakers)
```

#### Part B: Creating the Impact "Thud"

```javascript
  // === NOISE BURST PART ===
  // Create a buffer filled with random noise
  const bufferSize = ctx.sampleRate * 0.1;  // 0.1 seconds of audio
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Fill with decaying white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1)  // Random value -1 to 1
              * Math.exp(-i / (bufferSize * 0.1));  // Exponential decay
  }
```

**What's Happening:**
1. Create an audio buffer (like a tiny recording)
2. `sampleRate` = samples per second (usually 44100 or 48000)
3. Fill it with random noise values between -1 and 1
4. Apply exponential decay to create a "thud" that fades quickly

**Noise Visualization:**
```
Amplitude
  |
  |###
  |######
  |########___
  |###########______
  |###############_________ Time
     Noise decays exponentially
```

```javascript
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();

  noise.buffer = buffer;

  // High-pass filter: only keep high frequencies (crisp impact)
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 500;

  // Quick burst envelope
  noiseGain.gain.value = 0;
  noiseGain.gain.setTargetAtTime(Math.min(velocity * 0.08, 0.15), now, 0.001);
  noiseGain.gain.setTargetAtTime(0, now + 0.02, 0.05);

  // Connect: noise → filter → gain → speakers
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGainRef.current);

  noise.start(now);
}, [isAudioEnabled]);
```

**Filter Types:**
- **Lowpass**: Cuts highs (muffled, warm)
- **Highpass**: Cuts lows (crispy, airy)
- **Bandpass**: Only allows middle frequencies
- **Notch**: Removes a specific frequency band

**Result:** Collision sound = Pure tone + Noise burst = Realistic impact!

---

### 3. Ambient Soundscape Generator

Creates continuous drone notes, one per triangle.

```javascript
const startAmbience = useCallback((trianglePositions) => {
  if (!audioContextRef.current || !isAudioEnabled
      || ambienceOscillatorsRef.current.length > 0) return;

  const ctx = audioContextRef.current;
  const now = ctx.currentTime;

  // Musical scales: arrays of frequencies in Hz
  const scales = [
    [261.63, 329.63, 392.00, 523.25], // C major pentatonic (C, E, G, C)
    [293.66, 369.99, 440.00, 587.33], // D major pentatonic (D, F#, A, D)
    [246.94, 311.13, 369.99, 493.88], // B minor pentatonic (B, D, F#, B)
  ];
```

**Musical Frequency Reference:**
```javascript
// Middle C (C4) = 261.63 Hz
// Each semitone up = multiply by 1.059463 (12th root of 2)
// One octave up = multiply by 2
// One octave down = divide by 2

const C4 = 261.63;   // Middle C
const D4 = 293.66;   // D (2 semitones up)
const E4 = 329.63;   // E (4 semitones up)
const F4 = 349.23;   // F
const G4 = 392.00;   // G
const A4 = 440.00;   // A (concert pitch)
const B4 = 493.88;   // B
const C5 = 523.25;   // C (one octave up from C4)
```

**Pentatonic Scale:**
- Uses 5 notes instead of 7 (diatonic)
- Sounds harmonious no matter which notes you combine
- Perfect for generative/algorithmic music

```javascript
  trianglePositions.forEach((triangle, index) => {
    // Pick a scale based on triangle index
    const scale = scales[index % scales.length];

    // Pick a random note from that scale
    const freq = scale[Math.floor(Math.random() * scale.length)];

    // === CREATE THE DRONE ===
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // LFO = Low Frequency Oscillator (creates vibrato/wobble)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    // Main oscillator
    osc.type = 'sine';
    osc.frequency.value = freq / 2;  // One octave down for ambient feel
```

**LFO (Low Frequency Oscillator):**
```javascript
    // LFO setup: slowly wobbles the pitch
    lfo.type = 'sine';
    lfo.frequency.value = 0.2 + Math.random() * 0.3;  // 0.2-0.5 Hz (slow wobble)
    lfoGain.gain.value = 2;  // ±2 Hz vibrato depth

    // Connect LFO to oscillator frequency
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);  // Modulates the pitch!
```

**How LFO Works:**
```
Main Oscillator (440 Hz base frequency)
         ↑
         | (modulation)
         |
    LFO (0.5 Hz sine wave, ±2 Hz amplitude)

Result: Frequency wobbles between 438-442 Hz
        Creates a vibrato/chorus effect
```

**Visualized:**
```
Pitch
  |
  |    /\      /\      /\
  |   /  \    /  \    /  \
  |__/____\__/____\__/____\__ Time
       LFO slowly modulates pitch
       (0.5 times per second)
```

```javascript
    // Filter for tone shaping
    filter.type = 'lowpass';
    filter.frequency.value = 800 + Math.random() * 400;  // 800-1200 Hz
    filter.Q.value = 2;  // Resonance

    // Slow fade-in envelope
    gain.gain.value = 0;
    gain.gain.setTargetAtTime(
      0.03 + Math.random() * 0.02,  // Very quiet (3-5% volume)
      now,
      2  // Fade in over ~2 seconds
    );

    // Connect: osc → filter → gain → speakers
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(now);
    lfo.start(now);

    // Store references for later control
    ambienceOscillatorsRef.current.push({ osc, gain, filter, lfo, lfoGain });
  });
}, [isAudioEnabled]);
```

**Complete Ambient Drone Signal Flow:**
```
LFO Oscillator (0.5 Hz sine)
    ↓
LFO Gain (±2 Hz)
    ↓
    ↓ (modulates)
    ↓
Main Oscillator (220 Hz with vibrato) ← Base frequency / 2
    ↓
Lowpass Filter (800-1200 Hz cutoff)
    ↓
Gain (3-5% volume, slow fade-in)
    ↓
Master Gain
    ↓
Speakers
```

---

### 4. Update Ambient Sound

Modulates the drones based on triangle positions in real-time.

```javascript
const updateAmbience = useCallback((trianglePositions, width, height) => {
  if (!audioContextRef.current || !isAudioEnabled) return;

  const ctx = audioContextRef.current;

  ambienceOscillatorsRef.current.forEach((oscData, index) => {
    if (trianglePositions[index]) {
      const triangle = trianglePositions[index];

      // Normalize position to 0-1 range
      const normalizedX = triangle.x / width;   // 0 (left) to 1 (right)
      const normalizedY = triangle.y / height;  // 0 (top) to 1 (bottom)

      // Map X position to filter brightness
      // Left side = 400 Hz (dark/muffled)
      // Right side = 1600 Hz (bright/clear)
      oscData.filter.frequency.setTargetAtTime(
        400 + normalizedX * 1200,
        ctx.currentTime,
        0.1  // Smooth transition (100ms)
      );

      // Map Y position to volume
      // Top = louder, Bottom = quieter
      oscData.gain.gain.setTargetAtTime(
        0.02 + (1 - normalizedY) * 0.03,  // 2-5% volume
        ctx.currentTime,
        0.1
      );
    }
  });
}, [isAudioEnabled]);
```

**Position Mapping Examples:**

| Triangle Position | X (normalized) | Filter Freq | Y (normalized) | Volume |
|------------------|----------------|-------------|----------------|--------|
| Top-left corner | 0.0 | 400 Hz (dark) | 0.0 | 5% (loud) |
| Center | 0.5 | 1000 Hz (medium) | 0.5 | 3.5% (medium) |
| Bottom-right | 1.0 | 1600 Hz (bright) | 1.0 | 2% (quiet) |

**Interactive Result:**
- Move triangle left → sound becomes darker/warmer
- Move triangle right → sound becomes brighter/crisper
- Move triangle up → sound gets louder
- Move triangle down → sound gets quieter

---

### 5. Mouse Sound Generator

Creates short "blip" sounds based on mouse position.

```javascript
const playMouseSound = useCallback((mouseX, mouseY, width, height, isMoving) => {
  if (!audioContextRef.current || !isAudioEnabled || !isMoving) return;

  const ctx = audioContextRef.current;
  const now = ctx.currentTime;

  // Map mouse position to sound parameters
  const normalizedX = mouseX / width;   // 0-1
  const normalizedY = mouseY / height;  // 0-1

  // X axis controls pitch: left = 200 Hz, right = 1000 Hz
  const freq = 200 + normalizedX * 800;

  // Y axis controls filter: top = 500 Hz, bottom = 2500 Hz
  const filterFreq = 500 + normalizedY * 2000;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.frequency.value = freq;
  osc.type = 'triangle';  // Slightly buzzy tone

  filter.type = 'lowpass';
  filter.frequency.value = filterFreq;
  filter.Q.value = 5;  // High resonance = vocal-like

  // Quick blip envelope
  gain.gain.value = 0;
  gain.gain.setTargetAtTime(0.08, now, 0.001);      // Fast attack
  gain.gain.setTargetAtTime(0, now + 0.05, 0.02);   // Quick decay

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(masterGainRef.current);

  osc.start(now);
  osc.stop(now + 0.1);
}, [isAudioEnabled]);
```

**Mouse Mapping:**
```
Screen Layout:

Top-left (0, 0)          Top-right (width, 0)
   Low pitch                High pitch
   Low filter               Low filter

Bottom-left              Bottom-right (width, height)
   Low pitch                High pitch
   High filter              High filter
```

**Interactive Theremin Effect:**
- Move mouse left/right → changes pitch
- Move mouse up/down → changes brightness
- Creates an instrument-like experience

---

### 6. Cleanup

```javascript
useEffect(() => {
  return () => {
    // Stop all ambient oscillators when component unmounts
    ambienceOscillatorsRef.current.forEach(({ osc, lfo }) => {
      try {
        osc.stop();
        lfo.stop();
      } catch (e) {
        // Already stopped - ignore error
      }
    });

    // Close audio context to free resources
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };
}, []);
```

**Why Cleanup Matters:**
- Audio nodes consume memory and CPU
- Oscillators keep running even if not connected
- Closing the context releases all resources
- Prevents memory leaks in single-page apps

---

## Creating Your Own Sounds

### Example 1: Simple Beep

```javascript
const playBeep = (frequency = 440) => {
  const ctx = audioContextRef.current;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.frequency.value = frequency;  // A4 = 440 Hz
  osc.type = 'sine';                // Pure tone

  gain.gain.value = 0.3;            // 30% volume

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);  // 0.2 second beep
};

// Usage:
playBeep(440);  // Play A4
playBeep(880);  // Play A5 (one octave up)
```

---

### Example 2: Kick Drum

```javascript
const playKick = () => {
  const ctx = audioContextRef.current;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Start at 150 Hz, drop to 50 Hz (pitch bend down)
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

  // Sharp attack, quick decay
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
};
```

**Explanation:**
- Kick drums have a falling pitch (150 Hz → 50 Hz)
- `exponentialRampToValueAtTime` creates smooth, natural-sounding transitions
- Short duration (0.2s) = punchy sound

---

### Example 3: Laser Sound

```javascript
const playLaser = () => {
  const ctx = audioContextRef.current;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';  // Buzzy waveform

  // Pitch drops from 1000 Hz to 100 Hz
  osc.frequency.setValueAtTime(1000, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);

  // Fade out as pitch drops
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.setValueAtTime(0, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);
};
```

**Key Features:**
- Sawtooth wave = bright, buzzy (good for laser/sci-fi sounds)
- Dramatic pitch drop (1000 Hz → 100 Hz)
- Linear volume fade

---

### Example 4: Snare Drum

```javascript
const playSnare = () => {
  const ctx = audioContextRef.current;
  const now = ctx.currentTime;

  // === TONE PART (body of the drum) ===
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();

  osc.frequency.value = 200;  // Body tone
  osc.type = 'triangle';

  oscGain.gain.setValueAtTime(0.7, now);
  oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  // === NOISE PART (snare wires) ===
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;  // White noise
  }

  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();

  noise.buffer = buffer;
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 1000;  // Crispy highs

  noiseGain.gain.setValueAtTime(0.5, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  // Start both
  osc.start(now);
  osc.stop(now + 0.1);
  noise.start(now);
};
```

**Snare Anatomy:**
1. **Tone**: 200 Hz triangle wave (drum body)
2. **Noise**: High-pass filtered white noise (snare wires)
3. Both fade out quickly for a "crack" sound

---

### Example 5: Hi-Hat

```javascript
const playHiHat = (open = false) => {
  const ctx = audioContextRef.current;
  const now = ctx.currentTime;

  // Create noise
  const bufferSize = ctx.sampleRate * 0.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  noise.buffer = buffer;

  // High-pass filter for metallic sound
  filter.type = 'highpass';
  filter.frequency.value = 7000;  // Very high
  filter.Q.value = 1;

  // Envelope depends on open/closed
  const duration = open ? 0.5 : 0.05;

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
};

// Usage:
playHiHat(false);  // Closed hi-hat (short)
playHiHat(true);   // Open hi-hat (long)
```

---

### Example 6: Melodic Arpeggio

```javascript
const playArpeggio = () => {
  const ctx = audioContextRef.current;
  const now = ctx.currentTime;

  // C major chord: C, E, G
  const notes = [261.63, 329.63, 392.00];
  const noteLength = 0.2;

  notes.forEach((freq, index) => {
    const startTime = now + (index * noteLength);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = freq;
    osc.type = 'sine';

    // Envelope
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.3, startTime + 0.01);  // Attack
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + noteLength);  // Decay

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + noteLength);
  });
};
```

**Result:** Plays C → E → G in sequence (arpeggio)

---

### Example 7: Theremin (Continuous Pitch Control)

```javascript
const createTheremin = () => {
  const ctx = audioContextRef.current;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = 440;
  gain.gain.value = 0.3;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();

  // Return control functions
  return {
    setFrequency: (freq) => {
      osc.frequency.setTargetAtTime(freq, ctx.currentTime, 0.01);
    },
    setVolume: (vol) => {
      gain.gain.setTargetAtTime(vol, ctx.currentTime, 0.01);
    },
    stop: () => {
      osc.stop();
    }
  };
};

// Usage:
const theremin = createTheremin();

// Change pitch smoothly
document.addEventListener('mousemove', (e) => {
  const freq = 200 + (e.clientX / window.innerWidth) * 800;
  theremin.setFrequency(freq);

  const vol = e.clientY / window.innerHeight * 0.5;
  theremin.setVolume(vol);
});

// Stop when done
// theremin.stop();
```

---

### Example 8: Reverb Effect

```javascript
const createReverb = async () => {
  const ctx = audioContextRef.current;

  // Create impulse response (simulates room acoustics)
  const length = ctx.sampleRate * 2;  // 2 seconds
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
  const left = impulse.getChannelData(0);
  const right = impulse.getChannelData(1);

  for (let i = 0; i < length; i++) {
    // Decaying random noise = room reflections
    const decay = Math.exp(-i / (length * 0.3));
    left[i] = (Math.random() * 2 - 1) * decay;
    right[i] = (Math.random() * 2 - 1) * decay;
  }

  const reverb = ctx.createConvolver();
  reverb.buffer = impulse;

  return reverb;
};

// Usage:
const playWithReverb = async (frequency) => {
  const ctx = audioContextRef.current;
  const reverb = await createReverb();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.frequency.value = frequency;

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

  // Route through reverb
  osc.connect(gain);
  gain.connect(reverb);
  reverb.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 2);
};
```

---

## Quick Reference

### Audio Node Types

| Node Type | Purpose | Key Properties |
|-----------|---------|----------------|
| `createOscillator()` | Generate tones | `frequency.value`, `type` (sine/square/sawtooth/triangle) |
| `createGain()` | Control volume | `gain.value` (0 to 1+) |
| `createBiquadFilter()` | EQ/filtering | `type`, `frequency.value`, `Q.value` |
| `createBufferSource()` | Play samples/noise | `buffer` |
| `createConvolver()` | Reverb/effects | `buffer` (impulse response) |
| `createDelay()` | Echo/delay | `delayTime.value` |
| `createDynamicsCompressor()` | Loudness control | `threshold`, `ratio`, `attack`, `release` |

### Oscillator Waveforms

```javascript
osc.type = 'sine';      // Smooth, pure tone (flute-like)
osc.type = 'square';    // Hollow, clarinet-like
osc.type = 'sawtooth';  // Bright, brassy
osc.type = 'triangle';  // Mellow, between sine and square
```

**Waveform Visualization:**
```
Sine:     ∿∿∿∿∿
Square:   ‾|_|‾|_
Sawtooth: /|/|/|/
Triangle: /\/\/\/\
```

### Filter Types

```javascript
filter.type = 'lowpass';   // Cuts high frequencies (warm, muffled)
filter.type = 'highpass';  // Cuts low frequencies (thin, crispy)
filter.type = 'bandpass';  // Only allows middle frequencies (telephone-like)
filter.type = 'notch';     // Removes specific frequency band
filter.type = 'allpass';   // Changes phase (for effects)
filter.type = 'lowshelf';  // Boosts/cuts lows
filter.type = 'highshelf'; // Boosts/cuts highs
filter.type = 'peaking';   // Boosts/cuts specific frequency
```

### Envelope Methods

| Method | Use Case | Example |
|--------|----------|---------|
| `setValueAtTime(value, time)` | Instant change | `gain.gain.setValueAtTime(1, now)` |
| `linearRampToValueAtTime(value, time)` | Linear fade | `gain.gain.linearRampToValueAtTime(0, now + 1)` |
| `exponentialRampToValueAtTime(value, time)` | Natural-sounding fade | `gain.gain.exponentialRampToValueAtTime(0.01, now + 1)` |
| `setTargetAtTime(value, time, constant)` | Smooth approach | `gain.gain.setTargetAtTime(0.5, now, 0.1)` |

**Important:**
- `exponentialRampToValueAtTime` cannot ramp to 0 (use 0.01 instead)
- Chain multiple envelope commands to create complex shapes

### Common Frequencies

| Note | Frequency | Octave |
|------|-----------|--------|
| C4 | 261.63 Hz | Middle C |
| D4 | 293.66 Hz | |
| E4 | 329.63 Hz | |
| F4 | 349.23 Hz | |
| G4 | 392.00 Hz | |
| A4 | 440.00 Hz | Concert pitch |
| B4 | 493.88 Hz | |
| C5 | 523.25 Hz | One octave up |

**Formula:**
- Next semitone up: `freq × 1.059463`
- Next octave up: `freq × 2`
- Next octave down: `freq ÷ 2`

### Volume Levels Guide

```javascript
gain.gain.value = 0.0;   // Silent
gain.gain.value = 0.1;   // Very quiet (background)
gain.gain.value = 0.3;   // Moderate
gain.gain.value = 0.5;   // Half volume
gain.gain.value = 1.0;   // Full volume
gain.gain.value = 2.0;   // 2x (may distort)
```

**Perceived Loudness:**
- Humans perceive volume logarithmically
- 0.5 ≠ "half as loud" (more like 70% as loud)
- For natural fades, use `exponentialRampToValueAtTime`

### Time Constants Guide

For `setTargetAtTime(value, startTime, timeConstant)`:

```javascript
0.001  // Almost instant (1ms)
0.01   // Very fast (10ms)
0.1    // Fast (100ms)
0.5    // Medium (500ms)
1.0    // Slow (1s)
2.0    // Very slow (2s)
```

**Rule of Thumb:** Sound reaches ~63% of target value after `timeConstant` seconds

### Common Patterns

#### ADSR Envelope (Attack, Decay, Sustain, Release)
```javascript
const now = ctx.currentTime;

gain.gain.setValueAtTime(0, now);                           // Start at 0
gain.gain.linearRampToValueAtTime(1, now + 0.01);          // Attack (10ms)
gain.gain.exponentialRampToValueAtTime(0.5, now + 0.1);    // Decay to sustain (90ms)
// ... sustain for duration ...
gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);   // Release (1s total)
```

#### Pitch Bend
```javascript
osc.frequency.setValueAtTime(440, now);                    // Start at A4
osc.frequency.exponentialRampToValueAtTime(880, now + 1);  // Bend up to A5
```

#### Vibrato (LFO)
```javascript
const lfo = ctx.createOscillator();
const lfoGain = ctx.createGain();

lfo.frequency.value = 5;      // 5 Hz wobble
lfoGain.gain.value = 10;      // ±10 Hz depth

lfo.connect(lfoGain);
lfoGain.connect(osc.frequency);  // Modulate main oscillator

lfo.start();
```

#### Tremolo (Volume LFO)
```javascript
const lfo = ctx.createOscillator();
const lfoGain = ctx.createGain();

lfo.frequency.value = 6;      // 6 Hz wobble
lfoGain.gain.value = 0.5;     // ±50% volume

lfo.connect(lfoGain);
lfoGain.connect(gain.gain);   // Modulate volume

lfo.start();
```

---

## Tips for Experimentation

### 1. Start Simple
Begin with a basic oscillator and gradually add filters, envelopes, and effects.

### 2. Layer Sounds
Combine multiple oscillators at different frequencies for rich timbres:
```javascript
// Thick saw sound (3 detuned oscillators)
const createThickSaw = (baseFreq) => {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const osc3 = ctx.createOscillator();

  osc1.frequency.value = baseFreq;
  osc2.frequency.value = baseFreq * 1.01;  // Slightly detuned
  osc3.frequency.value = baseFreq * 0.99;  // Slightly detuned

  // Connect all to same gain...
};
```

### 3. Use Randomization
Add subtle random variations to make sounds more organic:
```javascript
const freq = baseFreq * (1 + (Math.random() - 0.5) * 0.02);  // ±1% variation
```

### 4. Experiment with Q (Resonance)
High Q values create interesting "vocal" or "electronic" sounds:
```javascript
filter.Q.value = 20;  // Very resonant, almost self-oscillating
```

### 5. Chain Multiple Filters
```javascript
osc.connect(lowpass);
lowpass.connect(highpass);
highpass.connect(gain);
gain.connect(destination);
```

### 6. Automate Parameters
Use `setTargetAtTime` to create evolving sounds:
```javascript
filter.frequency.setTargetAtTime(2000, now, 0);      // Start at 2000 Hz
filter.frequency.setTargetAtTime(500, now + 1, 0.5); // Sweep down to 500 Hz
```

---

## Common Pitfalls

### 1. Forgetting to Call `start()`
```javascript
// ❌ Won't make sound
osc.connect(gain);
gain.connect(ctx.destination);

// ✅ Correct
osc.start();
```

### 2. Trying to Reuse Oscillators
```javascript
// ❌ Cannot restart
osc.start();
osc.stop();
osc.start();  // Error!

// ✅ Create new oscillator each time
const playNote = () => {
  const osc = ctx.createOscillator();
  // ... configure and start
};
```

### 3. Exponential Ramp to Zero
```javascript
// ❌ Error: exponential ramp can't reach 0
gain.gain.exponentialRampToValueAtTime(0, now + 1);

// ✅ Use 0.01 (effectively silent)
gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
```

### 4. Forgetting AudioContext State
```javascript
// ❌ Context might be suspended
const ctx = new AudioContext();
osc.start();  // Might not play

// ✅ Resume if needed
if (ctx.state === 'suspended') {
  ctx.resume();
}
```

### 5. Not Cleaning Up
```javascript
// ❌ Memory leak
const osc = ctx.createOscillator();
osc.start();
// ... forgot to stop

// ✅ Always stop and disconnect
osc.stop(ctx.currentTime + 1);
```

---

## Resources

- [MDN Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Audio API Specification](https://www.w3.org/TR/webaudio/)
- [Web Audio Examples](https://github.com/mdn/webaudio-examples)
- [JavaScript Systems Music](http://teropa.info/blog/2016/07/28/javascript-systems-music.html)

---

## Project Structure

```
IAMBICA/
├── src/
│   ├── useAudio.js       # Audio engine hook
│   ├── homepage.jsx      # Main visual component
│   └── main.jsx          # App entry point
├── AUDIO_GUIDE.md        # This file
└── package.json
```

---

## License

This audio system is part of the IAMBICA project. Feel free to use and modify for your own creative projects!

---

**Built with Web Audio API and React**

**Created by: Victor**

**Last Updated: 2025**
