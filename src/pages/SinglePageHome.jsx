import React, { useRef, useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import p5 from 'p5';

// Interactive Cube Component (Welcome Section)
const InteractiveCubeSection = () => {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let rotationX = 0;
      let rotationY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;
      let isDragging = false;
      let lastMouseX = 0;
      let lastMouseY = 0;

      const createTextTexture = (text, bgColor, textColor, fontSize = 32) => {
        const g = p.createGraphics(256, 256);
        g.background(bgColor);
        g.fill(textColor);
        g.textAlign(p.CENTER, p.CENTER);
        g.textFont('Georgia');
        g.textSize(fontSize);
        g.textStyle(p.BOLD);
        g.text(text, 128, 128);
        return g;
      };

      const createIAMBICATexture = () => {
        const g = p.createGraphics(256, 256);
        g.background('#222222');
        g.textFont('Georgia');
        g.textSize(32);
        g.textStyle(p.BOLD);
        const fullText = 'IAMBICA';
        g.textAlign(p.LEFT, p.CENTER);
        const totalWidth = g.textWidth(fullText);
        const startX = (256 - totalWidth) / 2;
        g.fill('#FAF3E1');
        const iWidth = g.textWidth('I');
        g.text('I', startX, 128);
        g.fill('#D22B2B');
        const aWidth = g.textWidth('A');
        g.text('A', startX + iWidth, 128);
        g.fill('#FAF3E1');
        g.text('MBICA', startX + iWidth + aWidth, 128);
        return g;
      };

      let textures;

      p.setup = () => {
        const canvas = p.createCanvas(400, 400, p.WEBGL);
        canvas.parent(sketchRef.current);

        textures = {
          front: createIAMBICATexture(),
          back: createTextTexture('ABOUT US', '#F5E7C6', '#222222'),
          left: createTextTexture('MISSION', '#FAF3E1', '#222222'),
          right: createTextTexture('PHILOSOPHY', '#F5E7C6', '#222222'),
          top: createTextTexture('INTERACT', '#FAF3E1', '#D22B2B'),
          bottom: createTextTexture('', '#222222', '#FAF3E1')
        };
      };

      p.draw = () => {
        p.background('#FAF3E1');

        rotationX += (targetRotationX - rotationX) * 0.1;
        rotationY += (targetRotationY - rotationY) * 0.1;

        if (!isDragging) {
          targetRotationY += 0.005;
        }

        p.push();
        p.rotateX(rotationX);
        p.rotateY(rotationY);

        const size = 150;

        // Front
        p.push();
        p.translate(0, 0, size/2);
        p.texture(textures.front);
        p.plane(size, size);
        p.pop();

        // Back
        p.push();
        p.translate(0, 0, -size/2);
        p.rotateY(p.PI);
        p.texture(textures.back);
        p.plane(size, size);
        p.pop();

        // Left
        p.push();
        p.translate(-size/2, 0, 0);
        p.rotateY(-p.PI/2);
        p.texture(textures.left);
        p.plane(size, size);
        p.pop();

        // Right
        p.push();
        p.translate(size/2, 0, 0);
        p.rotateY(p.PI/2);
        p.texture(textures.right);
        p.plane(size, size);
        p.pop();

        // Top
        p.push();
        p.translate(0, -size/2, 0);
        p.rotateX(p.PI/2);
        p.texture(textures.top);
        p.plane(size, size);
        p.pop();

        // Bottom
        p.push();
        p.translate(0, size/2, 0);
        p.rotateX(-p.PI/2);
        p.texture(textures.bottom);
        p.plane(size, size);
        p.pop();

        p.pop();
      };

      p.mousePressed = () => {
        isDragging = true;
        lastMouseX = p.mouseX;
        lastMouseY = p.mouseY;
      };

      p.mouseDragged = () => {
        if (isDragging) {
          const deltaX = p.mouseX - lastMouseX;
          const deltaY = p.mouseY - lastMouseY;
          targetRotationY += deltaX * 0.01;
          targetRotationX -= deltaY * 0.01;
          lastMouseX = p.mouseX;
          lastMouseY = p.mouseY;
        }
      };

      p.mouseReleased = () => {
        isDragging = false;
      };

      p.windowResized = () => {
        p.resizeCanvas(400, 400);
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return (
    <div
      ref={sketchRef}
      style={{
        width: '400px',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
  );
};

// Triangle Animation Component - Memoized for performance
const Triangle = React.memo(({ x, y, size, mouseX, mouseY, rotation }) => {
  const angle = Math.atan2(mouseY - y, mouseX - x);
  const fib = React.useMemo(() => [1, 1, 2, 3, 5, 8, 13], []);
  const scale = size * 0.066;
  const colors = React.useMemo(() => ['#F5E7C6', '#222222', '#F5E7C6', '#222222', '#F5E7C6', '#222222', '#F5E7C6'], []);

  const ropeSegments = useRef(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const animationFrameRef = useRef(null);
  const frameCount = useRef(0);

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

  useEffect(() => {
    const segmentLength = scale * 3;
    const gravity = 0.3;
    const damping = 0.98;
    const constraintIterations = 3;

    const updateRope = () => {
      const segments = ropeSegments.current;

      segments.forEach((segment, index) => {
        segment.vy += gravity;
        segment.vx *= damping;
        segment.vy *= damping;
        segment.x += segment.vx;
        segment.y += segment.vy;
      });

      for (let iter = 0; iter < constraintIterations; iter++) {
        segments.forEach((segment, index) => {
          if (index === 0) {
            const targetX = Math.cos(angle) * segmentLength;
            const targetY = Math.sin(angle) * segmentLength;
            segment.x = targetX;
            segment.y = targetY;
          } else {
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
              segment.vx -= offsetX;
              segment.vy -= offsetY;
            }
          }

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

      // Only force update every 3 frames to reduce re-renders
      frameCount.current++;
      if (frameCount.current % 3 === 0) {
        forceUpdate();
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
      <polygon points={trianglePoints} fill="#D22B2B" />
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
});

// Main Single Page Home Component
const SinglePageHome = () => {
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
  const lastMouseMoveTimeRef = useRef(0);
  const ambienceStartedRef = useRef(false);

  const {
    isAudioEnabled,
    toggleAudio,
    playCollisionSound,
    startAmbience,
    updateAmbience,
    playMouseSound,
  } = useAudio();

  const handleMouseMove = (event) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const newX = event.clientX - rect.left;
      const newY = event.clientY - rect.top;

      setMousePos({ x: newX, y: newY });

      const now = Date.now();
      if (isAudioEnabled && now - lastMouseMoveTimeRef.current > 100) {
        const isMoving = Math.abs(newX - mousePos.x) > 5 || Math.abs(newY - mousePos.y) > 5;
        playMouseSound(newX, newY, width, height, isMoving);
        lastMouseMoveTimeRef.current = now;
      }
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
    if (isAudioEnabled && !ambienceStartedRef.current) {
      startAmbience(eyePositions);
      ambienceStartedRef.current = true;
    }
  }, [isAudioEnabled, eyePositions, startAmbience]);

  useEffect(() => {
    const widthRef = width;
    const heightRef = height;

    const animate = () => {
      setEyePositions(prevEyes => {
        const newEyes = prevEyes.map(eye => {
          let newX = eye.x + eye.vx;
          let newY = eye.y + eye.vy;
          let newVx = eye.vx;
          let newVy = eye.vy;
          let newAngularVelocity = eye.angularVelocity;
          let collided = false;

          newAngularVelocity *= 0.995;

          if (newX - eye.size/2 < 0 || newX + eye.size/2 > widthRef) {
            newVx *= -0.95;
            newX = Math.max(eye.size/2, Math.min(widthRef - eye.size/2, newX));
            newAngularVelocity += newVy * 3;
            collided = true;
          }

          if (newY - eye.size/2 < 0 || newY + eye.size/2 > heightRef) {
            newVy *= -0.95;
            newY = Math.max(eye.size/2, Math.min(heightRef - eye.size/2, newY));
            newAngularVelocity += newVx * 3;
            collided = true;
          }

          if (collided) {
            const velocity = Math.sqrt(newVx * newVx + newVy * newVy);
            playCollisionSound(velocity, eye.size);
          }

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
        });

        if (isAudioEnabled) {
          updateAmbience(newEyes, widthRef, heightRef);
        }

        return newEyes;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, playCollisionSound, updateAmbience, isAudioEnabled]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      height: '100vh',
      width: '100vw',
      overflow: 'auto',
      overflowX: 'hidden',
      scrollSnapType: 'y mandatory'
    }}>
      {/* Sticky Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'rgba(250, 243, 225, 0.95)',
        borderBottom: '1px solid #222222',
        zIndex: 100,
        boxSizing: 'border-box'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          cursor: 'pointer'
        }}
        onClick={() => scrollToSection('welcome')}
        >
          I<span style={{ color: '#D22B2B' }}>A</span>MBICA
        </div>

        <nav style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {['about', 'mission', 'philosophy', 'interact'].map((section) => (
            <a
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                textTransform: 'capitalize'
              }}
              onMouseEnter={(e) => e.target.style.color = '#D22B2B'}
              onMouseLeave={(e) => e.target.style.color = '#333'}
            >
              {section === 'about' ? 'About Us' : section}
            </a>
          ))}
        </nav>
      </header>

      {/* Welcome Section with Cube */}
      <section id="welcome" style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#FAF3E1',
        paddingTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <div style={{
          textAlign: 'center',
          marginTop: '10vh',
          marginBottom: '20px'
        }}>
          <h1 style={{
            fontSize: '48px',
            color: '#222222',
            margin: '0 0 10px 0'
          }}>
            Festival I<span style={{ color: '#D22B2B' }}>á</span>mbica
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#333',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Explora el futuro del arte digital
          </p>
        </div>
        <InteractiveCubeSection />
        <button
          onClick={() => scrollToSection('about')}
          style={{
            marginTop: '20px',
            padding: '10px 25px',
            fontSize: '14px',
            backgroundColor: 'transparent',
            color: '#333',
            border: '2px solid #333',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontFamily: 'Georgia, serif'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#D22B2B';
            e.target.style.borderColor = '#D22B2B';
            e.target.style.color = '#FAF3E1';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = '#333';
            e.target.style.color = '#333';
          }}
        >
          Descubre Más
        </button>
      </section>

      {/* About Section with Triangle Animation */}
      <section id="about" style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundColor: '#FAF3E1',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          style={{ display: 'block' }}
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

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '800px',
          width: '90%',
          padding: '20px',
          zIndex: 5,
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#222222',
          textAlign: 'justify',
          boxSizing: 'border-box'
        }}>
          <h2 style={{
            fontSize: '36px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            About Us
          </h2>
          <p style={{ margin: 0 }}>
            El Festival <span style={{ color: '#D22B2B', fontWeight: 'bold' }}>Iámbica</span> (FI) es un evento anual dedicado a la exploración, producción y exhibición de prácticas artísticas contemporáneas que integran tecnología avanzada, innovación digital y experimentación multimedia. Este festival aspira a convertir a Puerto Rico en un nodo caribeño de vanguardia para artistas, tecnólogos, investigadores y comunidades interesadas en el arte del futuro.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#F5E7C6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1000px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '42px',
            color: '#222222',
            marginBottom: '30px'
          }}>
            Mission
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#333',
            lineHeight: '1.8'
          }}>
            Coming Soon
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#FAF3E1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1000px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '42px',
            color: '#222222',
            marginBottom: '30px'
          }}>
            Philosophy
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#333',
            lineHeight: '1.8'
          }}>
            Coming Soon
          </p>
        </div>
      </section>

      {/* Interact Section */}
      <section id="interact" style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#F5E7C6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1000px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '42px',
            color: '#222222',
            marginBottom: '30px'
          }}>
            Interact
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#333',
            lineHeight: '1.8',
            marginBottom: '30px'
          }}>
            Control OSC data in real-time for TouchDesigner and Max MSP
          </p>
          <Link
            to="/interact"
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: '#D22B2B',
              color: '#FAF3E1',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textDecoration: 'none',
              fontFamily: 'Georgia, serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#222222';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#D22B2B';
            }}
          >
            Launch Interactive Interface
          </Link>
        </div>
      </section>

      {/* Audio Control Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 100
      }}>
        <button
          onClick={toggleAudio}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: 'transparent',
            color: '#333',
            border: '1px solid #333',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'Georgia, serif'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#333';
            e.target.style.color = '#FAF3E1';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#333';
          }}
        >
          {isAudioEnabled ? 'Disable Sound' : 'Enable Sound'}
        </button>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#222222',
        color: '#FAF3E1',
        padding: '40px 20px',
        textAlign: 'center',
        width: '100vw',
        boxSizing: 'border-box'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          © 2026 Festival Iámbica. Puerto Rico.
        </p>
      </footer>
    </div>
  );
};

export default SinglePageHome;
