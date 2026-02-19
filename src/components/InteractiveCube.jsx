import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { COLORS } from '../styles/theme';

// Module-level guard to prevent duplicate p5 cube instances
let activeCubeInstance = null;

const getCubeSize = () => {
  const minDim = Math.min(window.innerWidth, window.innerHeight);
  if (minDim < 400) return 220;
  if (minDim < 500) return 280;
  if (minDim < 700) return 340;
  return 400;
};

const FACE_COLORS = {
  front: COLORS.dark,
  back: COLORS.tan,
  left: COLORS.cream,
  right: COLORS.tan,
  top: COLORS.cream,
  bottom: COLORS.red,
};

const InteractiveCube = () => {
  const sketchRef = useRef(null);
  const cubeSizeRef = useRef(getCubeSize());

  useEffect(() => {
    const container = sketchRef.current;
    if (!container) return;

    // Destroy any existing instance before creating a new one
    if (activeCubeInstance) {
      activeCubeInstance._loop = false;
      if (activeCubeInstance._requestAnimId) {
        window.cancelAnimationFrame(activeCubeInstance._requestAnimId);
      }
      activeCubeInstance.remove();
      activeCubeInstance = null;
    }

    // Remove any leftover canvases
    document.querySelectorAll('canvas.p5Canvas').forEach(c => c.remove());
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const sketch = (p) => {
      let rotationX = 0;
      let rotationY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;
      let isDragging = false;
      let lastMouseX = 0;
      let lastMouseY = 0;

      p.setup = () => {
        const size = cubeSizeRef.current;
        p.createCanvas(size, size, p.WEBGL);
      };

      p.draw = () => {
        p.background(COLORS.cream);

        rotationX += (targetRotationX - rotationX) * 0.1;
        rotationY += (targetRotationY - rotationY) * 0.1;

        if (!isDragging) {
          targetRotationY += 0.005;
        }

        p.push();
        p.rotateX(rotationX);
        p.rotateY(rotationY);
        p.noStroke();

        const size = cubeSizeRef.current * 0.4;
        const half = size / 2;

        const faces = [
          { translate: [0, 0, half], rotate: null, color: FACE_COLORS.front },
          { translate: [0, 0, -half], rotate: [0, p.PI, 0], color: FACE_COLORS.back },
          { translate: [-half, 0, 0], rotate: [0, -p.PI / 2, 0], color: FACE_COLORS.left },
          { translate: [half, 0, 0], rotate: [0, p.PI / 2, 0], color: FACE_COLORS.right },
          { translate: [0, -half, 0], rotate: [p.PI / 2, 0, 0], color: FACE_COLORS.top },
          { translate: [0, half, 0], rotate: [-p.PI / 2, 0, 0], color: FACE_COLORS.bottom },
        ];

        for (const face of faces) {
          p.push();
          p.translate(...face.translate);
          if (face.rotate) {
            p.rotateX(face.rotate[0]);
            p.rotateY(face.rotate[1]);
          }
          p.fill(face.color);
          p.plane(size, size);
          p.pop();
        }

        p.pop();
      };

      p.mousePressed = () => {
        isDragging = true;
        lastMouseX = p.mouseX;
        lastMouseY = p.mouseY;
      };

      p.mouseDragged = () => {
        if (isDragging) {
          targetRotationY += (p.mouseX - lastMouseX) * 0.01;
          targetRotationX -= (p.mouseY - lastMouseY) * 0.01;
          lastMouseX = p.mouseX;
          lastMouseY = p.mouseY;
        }
      };

      p.mouseReleased = () => { isDragging = false; };

      p.touchStarted = () => {
        isDragging = true;
        lastMouseX = p.mouseX;
        lastMouseY = p.mouseY;
        return false;
      };

      p.touchMoved = () => {
        if (isDragging) {
          targetRotationY += (p.mouseX - lastMouseX) * 0.01;
          targetRotationX -= (p.mouseY - lastMouseY) * 0.01;
          lastMouseX = p.mouseX;
          lastMouseY = p.mouseY;
        }
        return false;
      };

      p.touchEnded = () => { isDragging = false; return false; };
    };

    const instance = new p5(sketch, container);
    activeCubeInstance = instance;

    return () => {
      instance._loop = false;
      if (instance._requestAnimId) {
        window.cancelAnimationFrame(instance._requestAnimId);
      }
      container.querySelectorAll('canvas').forEach(c => c.remove());
      document.querySelectorAll('canvas.p5Canvas').forEach(c => c.remove());
      instance.remove();
      if (activeCubeInstance === instance) {
        activeCubeInstance = null;
      }
    };
  }, []);

  const size = cubeSizeRef.current;
  return (
    <div
      ref={sketchRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        maxWidth: '90vw',
        maxHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    />
  );
};

export default InteractiveCube;
