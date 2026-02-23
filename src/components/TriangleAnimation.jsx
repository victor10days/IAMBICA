import React, { useRef, useEffect, useState } from 'react';
import { COLORS } from '../styles/theme';

const COLORS_ARRAY = [COLORS.tan, COLORS.dark, COLORS.tan, COLORS.dark, COLORS.tan, COLORS.dark, COLORS.tan];
const FIB = [1, 1, 2, 3, 5, 8, 13];

function createSegments(angle, scale) {
  const segmentLength = scale * 3;
  return FIB.map((num, index) => ({
    x: Math.cos(angle) * segmentLength * index,
    y: Math.sin(angle) * segmentLength * index,
    vx: 0,
    vy: 0,
    size: num * scale,
    rotation: 0,
  }));
}

function snapshotSegments(segments) {
  return segments.map(s => ({ x: s.x, y: s.y, size: s.size, rotation: s.rotation }));
}

const Triangle = React.memo(({ x, y, size, mouseX, mouseY, rotation }) => {
  const angle = Math.atan2(mouseY - y, mouseX - x);
  const scale = size * 0.066;

  const ropeSegments = useRef(null);
  const animationFrameRef = useRef(null);
  const frameCount = useRef(0);
  const [renderSegments, setRenderSegments] = useState(() =>
    snapshotSegments(createSegments(angle, scale))
  );

  useEffect(() => {
    const segmentLength = scale * 3;
    const gravity = 0.3;
    const damping = 0.98;
    const constraintIterations = 3;

    if (!ropeSegments.current) {
      ropeSegments.current = createSegments(angle, scale);
    }

    const updateRope = () => {
      const segments = ropeSegments.current;

      for (const segment of segments) {
        segment.vy += gravity;
        segment.vx *= damping;
        segment.vy *= damping;
        segment.x += segment.vx;
        segment.y += segment.vy;
      }

      for (let iter = 0; iter < constraintIterations; iter++) {
        for (let index = 0; index < segments.length; index++) {
          const segment = segments[index];
          if (index === 0) {
            segment.x = Math.cos(angle) * segmentLength;
            segment.y = Math.sin(angle) * segmentLength;
          } else {
            const prev = segments[index - 1];
            const dx = segment.x - prev.x;
            const dy = segment.y - prev.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
              const diff = (distance - segmentLength) / distance;
              const offsetX = dx * diff * 0.5;
              const offsetY = dy * diff * 0.5;
              segment.x -= offsetX;
              segment.y -= offsetY;
              segment.vx -= offsetX;
              segment.vy -= offsetY;
            }
          }

          if (index > 0) {
            const prev = segments[index - 1];
            segment.rotation = (segment.rotation + Math.atan2(segment.y - prev.y, segment.x - prev.x) * 2) % 360;
          } else {
            segment.rotation = (segment.rotation + angle * 2) % 360;
          }
        }
      }

      frameCount.current++;
      if (frameCount.current % 3 === 0) {
        setRenderSegments(snapshotSegments(segments));
      }
      animationFrameRef.current = requestAnimationFrame(updateRope);
    };

    animationFrameRef.current = requestAnimationFrame(updateRope);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [x, y, mouseX, mouseY, angle, scale]);

  const triangleHeight = size / 1.2;
  const trianglePoints = `0,${-triangleHeight} ${-triangleHeight * 0.866},${triangleHeight / 2} ${triangleHeight * 0.866},${triangleHeight / 2}`;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      <polygon points={trianglePoints} fill={COLORS.red} />
      {renderSegments.map((segment, index) => (
        <g key={index} transform={`translate(${segment.x}, ${segment.y})`}>
          <rect
            x={-segment.size / 2}
            y={-segment.size / 2}
            width={segment.size}
            height={segment.size}
            fill={COLORS_ARRAY[index]}
            opacity={0.8}
            transform={`rotate(${segment.rotation})`}
          />
        </g>
      ))}
    </g>
  );
});

export default Triangle;
