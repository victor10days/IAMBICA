import { useRef, useEffect, useState, useCallback } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const masterGainRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const ambienceOscillatorsRef = useRef([]);

  // Initialize Audio Context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.gain.value = 0.3;
      masterGainRef.current.connect(audioContextRef.current.destination);
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    setIsAudioEnabled(true);
  }, []);

  // Toggle audio on/off
  const toggleAudio = useCallback(() => {
    if (!audioContextRef.current) {
      initAudioContext();
      return;
    }

    if (isAudioEnabled) {
      // Stop all ambient oscillators
      ambienceOscillatorsRef.current.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
        } catch (e) {
          // Already stopped
        }
      });
      ambienceOscillatorsRef.current = [];

      // Suspend audio context
      if (audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
      setIsAudioEnabled(false);
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      setIsAudioEnabled(true);
    }
  }, [isAudioEnabled, initAudioContext]);

  // Play collision sound
  const playCollisionSound = useCallback((velocity, size) => {
    if (!audioContextRef.current || !isAudioEnabled) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Create oscillator for tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Map size to frequency (larger = lower pitch)
    const baseFreq = 200 + (1 / size) * 400;
    const velocityFactor = Math.min(velocity / 5, 2);

    osc.frequency.value = baseFreq * (1 + velocityFactor * 0.3);
    osc.type = 'sine';

    // Filter for warmth
    filter.type = 'lowpass';
    filter.frequency.value = 2000 + velocity * 100;
    filter.Q.value = 1;

    // Envelope
    gain.gain.value = 0;
    gain.gain.setTargetAtTime(Math.min(velocity * 0.15, 0.3), now, 0.01);
    gain.gain.setTargetAtTime(0, now + 0.05, 0.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(now);
    osc.stop(now + 0.5);

    // Add noise burst for impact
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }

    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();

    noise.buffer = buffer;
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 500;

    noiseGain.gain.value = 0;
    noiseGain.gain.setTargetAtTime(Math.min(velocity * 0.08, 0.15), now, 0.001);
    noiseGain.gain.setTargetAtTime(0, now + 0.02, 0.05);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGainRef.current);

    noise.start(now);
  }, [isAudioEnabled]);

  // Start ambient soundscape
  const startAmbience = useCallback((trianglePositions) => {
    if (!audioContextRef.current || !isAudioEnabled || ambienceOscillatorsRef.current.length > 0) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Create ambient drones based on triangle positions
    const scales = [
      [261.63, 329.63, 392.00, 523.25], // C major pentatonic
      [293.66, 369.99, 440.00, 587.33], // D major pentatonic
      [246.94, 311.13, 369.99, 493.88], // B minor pentatonic
    ];

    trianglePositions.forEach((triangle, index) => {
      const scale = scales[index % scales.length];
      const freq = scale[Math.floor(Math.random() * scale.length)];

      // Create oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq / 2; // One octave down for ambient feel

      // LFO for subtle vibrato
      lfo.type = 'sine';
      lfo.frequency.value = 0.2 + Math.random() * 0.3;
      lfoGain.gain.value = 2;

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      // Filter
      filter.type = 'lowpass';
      filter.frequency.value = 800 + Math.random() * 400;
      filter.Q.value = 2;

      // Soft envelope
      gain.gain.value = 0;
      gain.gain.setTargetAtTime(0.03 + Math.random() * 0.02, now, 2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current);

      osc.start(now);
      lfo.start(now);

      ambienceOscillatorsRef.current.push({ osc, gain, filter, lfo, lfoGain });
    });
  }, [isAudioEnabled]);

  // Update ambient soundscape based on triangle positions
  const updateAmbience = useCallback((trianglePositions, width, height) => {
    if (!audioContextRef.current || !isAudioEnabled) return;

    const ctx = audioContextRef.current;

    ambienceOscillatorsRef.current.forEach((oscData, index) => {
      if (trianglePositions[index]) {
        const triangle = trianglePositions[index];

        // Map position to filter frequency
        const normalizedX = triangle.x / width;
        const normalizedY = triangle.y / height;

        // Smoothly adjust filter based on position
        oscData.filter.frequency.setTargetAtTime(
          400 + normalizedX * 1200,
          ctx.currentTime,
          0.1
        );

        // Adjust volume based on Y position
        oscData.gain.gain.setTargetAtTime(
          0.02 + (1 - normalizedY) * 0.03,
          ctx.currentTime,
          0.1
        );
      }
    });
  }, [isAudioEnabled]);

  // Mouse-based sound modulation
  const playMouseSound = useCallback((mouseX, mouseY, width, height, isMoving) => {
    if (!audioContextRef.current || !isAudioEnabled || !isMoving) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Map mouse position to frequency
    const normalizedX = mouseX / width;
    const normalizedY = mouseY / height;

    const freq = 200 + normalizedX * 800;
    const filterFreq = 500 + normalizedY * 2000;

    // Create short blip sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.frequency.value = freq;
    osc.type = 'triangle';

    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 5;

    gain.gain.value = 0;
    gain.gain.setTargetAtTime(0.08, now, 0.001);
    gain.gain.setTargetAtTime(0, now + 0.05, 0.02);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start(now);
    osc.stop(now + 0.1);
  }, [isAudioEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ambienceOscillatorsRef.current.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
        } catch (e) {
          // Already stopped
        }
      });

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    isAudioEnabled,
    initAudioContext,
    toggleAudio,
    playCollisionSound,
    startAmbience,
    updateAmbience,
    playMouseSound,
  };
};
