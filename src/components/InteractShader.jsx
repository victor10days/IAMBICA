import React, { useRef, useEffect } from 'react';
import { COLORS } from '../styles/theme';

const SHAPE_SIZE = 130;
const PADDING = SHAPE_SIZE * 0.25;
const GRIDBOX = SHAPE_SIZE + PADDING;
const START = SHAPE_SIZE / 2 + PADDING / 2;

const BG_COLOR = COLORS.tan;
const COLOR_A = COLORS.red;
const COLOR_B = COLORS.cream;
const COLOR_C = COLORS.dark;
const COLOR_D = '#C4A882';          // muted tan (between tan and dark)

const InteractSketch = ({ fullscreen = false, height = 300 }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angleDistrict = 0;
    let angleHammersmith = 0;
    let animatingDistrict = true;
    let frameCount = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = fullscreen ? parent.offsetHeight : height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const drawDistrictAndCircleLine = (x, y, isNormalOrder, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle * Math.PI / 180);

      const rectWidth = 20;
      const rectHeight = 60;

      if (isNormalOrder) {
        ctx.fillStyle = COLOR_B;
        ctx.fillRect(-30, -30, rectWidth, rectHeight);
        ctx.fillStyle = COLOR_A;
        ctx.fillRect(10, -30, rectWidth, rectHeight);
      } else {
        ctx.fillStyle = COLOR_A;
        ctx.fillRect(-30, -30, rectWidth, rectHeight);
        ctx.fillStyle = COLOR_B;
        ctx.fillRect(10, -30, rectWidth, rectHeight);
      }
      ctx.restore();
    };

    const drawHammersmithAndCityLine = (x, y, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle * Math.PI / 180);

      const rectWidth = 60;
      const rectHeight = 20;

      ctx.fillStyle = COLOR_D;
      ctx.fillRect(-30, -30, rectWidth, rectHeight);
      ctx.fillStyle = COLOR_C;
      ctx.fillRect(-30, 10, rectWidth, rectHeight);

      ctx.restore();
    };

    const render = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      const columns = Math.ceil(w / GRIDBOX);
      const rows = Math.ceil(h / GRIDBOX);

      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          const posX = START + x * GRIDBOX;
          const posY = START + y * GRIDBOX;

          if ((x + y) % 2 === 0) {
            drawDistrictAndCircleLine(posX, posY, y % 2 === 0, angleDistrict);
          } else {
            drawHammersmithAndCityLine(posX, posY, angleHammersmith);
          }
        }
      }

      frameCount++;
      if (animatingDistrict) {
        if (frameCount % 10 === 0) {
          angleDistrict += 45;
          if (angleDistrict >= 360) {
            angleDistrict = 0;
            animatingDistrict = false;
          }
        }
      } else {
        if (frameCount % 10 === 0) {
          angleHammersmith += 45;
          if (angleHammersmith >= 360) {
            angleHammersmith = 0;
            animatingDistrict = true;
          }
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [height, fullscreen]);

  const containerStyle = fullscreen
    ? { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', lineHeight: 0 }
    : { width: '100%', overflow: 'hidden', lineHeight: 0 };

  const canvasStyle = fullscreen
    ? { display: 'block', width: '100%', height: '100%' }
    : { display: 'block', width: '100%', height: `${height}px` };

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
};

export default InteractSketch;
