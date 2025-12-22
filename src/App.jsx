import React, { useRef, useEffect, useState } from 'react';

  const Triangle = ({ x, y, size, mouseX, mouseY, rotation }) => {
    const angle = Math.atan2(mouseY - y, mouseX - x);

    // Fibonacci sequence
    const fib = [1, 1, 2, 3, 5, 8, 13];
    const scale = size * .066; // Scale factor based on triangle size
    const colors = ['#F5E7C6', '#222222', '#F5E7C6', '#222222', '#F5E7C6', '#222222', '#F5E7C6'];

    // Rope physics state
    const ropeSegments = useRef(null);
    const [, setTick] = useState(0);
    const animationFrameRef = useRef(null);

    // Initialize rope segments
    if (!ropeSegments.current) {
      const segmentLength = scale * 3;
      ropeSegments.current = fib.map((num, index) => ({
        x: Math.cos(angle) * segmentLength * index,
        y: Math.sin(angle) * segmentLength * index,
        vx: 0,
        vy: 0,
        size: num * scale,
        rotation: 0
      }));
    }

    // Rope physics simulation
    useEffect(() => {
      const segmentLength = scale * 3;
      const gravity = 0.3;
      const damping = 0.98;
      const constraintIterations = 3;

      const updateRope = () => {
        const segments = ropeSegments.current;

        // Apply physics to each segment
        segments.forEach((segment, index) => {
          // Apply gravity
          segment.vy += gravity;

          // Apply damping
          segment.vx *= damping;
          segment.vy *= damping;

          // Update position
          segment.x += segment.vx;
          segment.y += segment.vy;
        });

        // Apply constraints (keep segments connected)
        for (let iter = 0; iter < constraintIterations; iter++) {
          segments.forEach((segment, index) => {
            if (index === 0) {
              // First segment attached to triangle, following mouse direction
              const targetX = Math.cos(angle) * segmentLength;
              const targetY = Math.sin(angle) * segmentLength;
              segment.x = targetX;
              segment.y = targetY;
            } else {
              // Other segments constrained to previous segment
              const prevSegment = segments[index - 1];
              const dx = segment.x - prevSegment.x;
              const dy = segment.y - prevSegment.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance > 0) {
                const diff = (distance - segmentLength) / distance;
                const offsetX = dx * diff * 0.5;
                const offsetY = dy * diff * 0.5;

                segment.x -= offsetX;
                segment.y -= offsetY;

                // Apply constraint force back to velocity
                segment.vx -= offsetX;
                segment.vy -= offsetY;
              }
            }

            // Update rotation based on angle to previous segment
            if (index > 0) {
              const prevSegment = segments[index - 1];
              const dx = segment.x - prevSegment.x;
              const dy = segment.y - prevSegment.y;
              segment.rotation += Math.atan2(dy, dx) * 2;
            } else {
              segment.rotation += angle * 2;
            }
          });
        }

        setTick(t => t + 1);
        animationFrameRef.current = requestAnimationFrame(updateRope);
      };

      animationFrameRef.current = requestAnimationFrame(updateRope);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [x, y, mouseX, mouseY, angle, scale]);

    // Create triangle points (equilateral triangle)
    const triangleHeight = size / 1.2;
    const trianglePoints = `0,${-triangleHeight} ${-triangleHeight * 3.866},${triangleHeight / 2} ${triangleHeight * 0.866},${triangleHeight / 2}`;

    return (
      <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
        {/* Outer triangle */}
        <polygon points={trianglePoints} fill="#FF6D1F" />

        {/* Rope segments */}
        {ropeSegments.current && ropeSegments.current.map((segment, index) => (
          <g key={index} transform={`translate(${segment.x}, ${segment.y})`}>
            <rect
              x={-segment.size / 2}
              y={-segment.size / 2}
              width={segment.size}
              height={segment.size}
              fill={colors[index]}
              opacity={0.8}
              transform={`rotate(${segment.rotation})`}
            />
          </g>
        ))}
      </g>
    );
  };

  const ArctanEyes = () => {
    const [dimensions, setDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    });
    const [mousePos, setMousePos] = useState({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });
    const [eyePositions, setEyePositions] = useState(() => [
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.2, size: 100, vx: 3, vy: 2, rotation: 0, angularVelocity: 0 },
      { x: window.innerWidth * 0.6, y: window.innerHeight * 0.5, size: 50, vx: -2, vy: 2.5, rotation: 0, angularVelocity: 0 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.7, size: 160, vx: 2.5, vy: -3, rotation: 0, angularVelocity: 0 },
    ]);

    const svgRef = useRef(null);
    const animationRef = useRef(null);
    const { width, height } = dimensions;

    const handleMouseMove = (event) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setMousePos({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        });
      }
    };

    useEffect(() => {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      const widthRef = width;
      const heightRef = height;

      const animate = () => {
        setEyePositions(prevEyes =>
          prevEyes.map(eye => {
            let newX = eye.x + eye.vx;
            let newY = eye.y + eye.vy;
            let newVx = eye.vx;
            let newVy = eye.vy;
            let newAngularVelocity = eye.angularVelocity;

            // Apply friction to angular velocity (less friction = more spin)
            newAngularVelocity *= 0.995;

            // Bounce off edges with angular momentum
            if (newX - eye.size/2 < 0 || newX + eye.size/2 > widthRef) {
              newVx *= -0.95; // Energy loss on bounce
              newX = Math.max(eye.size/2, Math.min(widthRef - eye.size/2, newX));
              // Add spin based on velocity - vertical velocity creates spin
              newAngularVelocity += newVy * 3;
            }

            if (newY - eye.size/2 < 0 || newY + eye.size/2 > heightRef) {
              newVy *= -0.95; // Energy loss on bounce
              newY = Math.max(eye.size/2, Math.min(heightRef - eye.size/2, newY));
              // Add spin based on velocity - horizontal velocity creates spin
              newAngularVelocity += newVx * 3;
            }

            // Update rotation based on angular velocity
            const newRotation = (eye.rotation + newAngularVelocity) % 360;

            return {
              ...eye,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
              rotation: newRotation,
              angularVelocity: newAngularVelocity
            };
          })
        );

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [width, height]);

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}>
        {/* Sidebar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200px',
          height: '100%',
          backgroundColor: 'transparent',
          color: '#333',
          padding: '20px',
          zIndex: 10,
          overflowY: 'auto'
        }}>
          <h3>Menu</h3>
          
          <p>Your sidebar content here</p>
        </div>

        <header style={{
          position: 'absolute',
          top: '20px',
          width: '100%',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          zIndex: 10
        }}>
          I<span style={{ color: '#FF0000' }}>A</span>MBICA
        </header>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          style={{ display: 'block', backgroundColor: '#FAF3E1' }}
        >
          {eyePositions.map((eye, index) => (
            <Triangle
              key={index}
              x={eye.x}
              y={eye.y}
              size={eye.size}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
              rotation={eye.rotation}
            />
          ))}
        </svg>
      </div>
    );
  };

  export default ArctanEyes;


