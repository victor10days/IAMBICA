import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT } from '../styles/theme';
import Header from '../components/Header';
import InteractiveCube from '../components/InteractiveCube';
import Triangle from '../components/TriangleAnimation';
import SamuelYanShader from '../components/SamuelYanShader';
import PhilosophyShader from '../components/PhilosophyShader';
import InteractSketch from '../components/InteractShader';

// Main Single Page Home Component
const SinglePageHome = () => {
  const { isMobile, width, height } = useMobile();
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

  const location = useLocation();

  // Handle scroll-to from navigation state (when navigating from other pages)
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location.state]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      fontFamily: FONT,
      minHeight: '100vh',
      width: '100%',
      overflow: 'auto',
      overflowX: 'hidden',
      scrollSnapType: 'y mandatory'
    }}>
      {/* Sticky Header */}
      <Header />

      {/* Welcome Section with Cube */}
      <section id="welcome" style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <InteractSketch fullscreen />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          paddingTop: isMobile ? '50px' : '60px',
          paddingBottom: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '10px' : '20px',
            padding: '0 20px'
          }}>
            <h1 style={{
              fontSize: isMobile ? '24px' : '48px',
              color: COLORS.dark,
              margin: '-18px 0 8px 0'
            }}>
              I<span style={{ color: COLORS.red }}>á</span>mbica
            </h1>
            <p style={{
              fontSize: isMobile ? '12px' : '18px',
              color: COLORS.text,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Festival de new media art.
            </p>
          </div>
          <button
            onClick={() => scrollToSection('about')}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: isMobile ? '8px 20px' : '10px 25px',
              fontSize: isMobile ? '12px' : '14px',
              backgroundColor: 'transparent',
              color: COLORS.text,
              border: `2px solid ${COLORS.text}`,
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: FONT
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = COLORS.red;
              e.target.style.borderColor = COLORS.red;
              e.target.style.color = COLORS.cream;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = COLORS.text;
              e.target.style.color = COLORS.text;
            }}
          >
            Descubre Más
          </button>
        </div>
      </section>

      {/* About Section with Cellular Automaton */}
      <section id="about" style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <SamuelYanShader fullscreen />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}>
          <div style={{
            maxWidth: '700px',
            width: isMobile ? '92%' : '80%',
            padding: isMobile ? '15px 15px' : '40px',
            backgroundColor: 'rgba(250, 243, 225, 0.92)',
            border: `1px solid ${COLORS.dark}`,
            boxSizing: 'border-box',
            maxHeight: isMobile ? '80vh' : 'none',
            overflowY: isMobile ? 'auto' : 'visible'
          }}>
            <h2 style={{
              fontSize: isMobile ? '20px' : '36px',
              marginBottom: isMobile ? '10px' : '20px',
              textAlign: 'center',
              color: COLORS.dark
            }}>
              Sobre Nosotros
            </h2>
            <p style={{
              margin: 0,
              fontSize: isMobile ? '12px' : '16px',
              lineHeight: isMobile ? '1.5' : '1.8',
              color: COLORS.text,
              textAlign: 'center'
            }}>
              El Festival <span style={{ color: COLORS.red, fontWeight: 'bold' }}>Iámbica</span> (FI) es un evento anual dedicado a la exploración, producción y exhibición de prácticas artísticas contemporáneas que integran tecnología avanzada, innovación digital y experimentación multimedia.
            </p>
            <p style={{
              margin: isMobile ? '8px 0 0 0' : '15px 0 0 0',
              fontSize: isMobile ? '12px' : '16px',
              lineHeight: isMobile ? '1.5' : '1.8',
              color: COLORS.text,
              textAlign: 'center'
            }}>
              Este festival aspira a convertir a Puerto Rico en un nodo caribeño de vanguardia para artistas, tecnólogos, investigadores y comunidades interesadas en el arte del futuro.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section with Cube */}
      <section id="mission" style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.cream,
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <h2 style={{
          fontSize: isMobile ? '32px' : '42px',
          color: COLORS.dark,
          marginBottom: isMobile ? '0px' : '1px'
        }}>
          Misión
        </h2>
        <InteractiveCube key={location.key} />
        <p style={{
          fontSize: isMobile ? '16px' : '20px',
          color: COLORS.text,
          lineHeight: '1.8',
          marginTop: isMobile ? '20px' : '30px',
          textAlign: 'center',
          maxWidth: '600px',
          padding: '0 20px'
        }}>
Crear un espacio accesible, inclusivo y dinámico donde artistas y comunidades puedan explorar las posibilidades del arte tecnológico, promoviendo la innovación, la formación y la colaboración global desde Puerto Rico.
        </p>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <PhilosophyShader fullscreen />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}>
          <div style={{
            maxWidth: '800px',
            width: '90%',
            textAlign: 'center',
            padding: isMobile ? '20px' : '40px',
            backgroundColor: 'rgba(250, 243, 225, 0.85)',
            border: `1px solid ${COLORS.dark}`
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '42px',
              color: COLORS.dark,
              marginBottom: '20px'
            }}>
              Objetivos
            </h2>
              <ul style={{ textAlign: 'left', paddingLeft: isMobile ? '16px' : '20px',
                color: COLORS.text, fontSize: isMobile ? '16px' : '20px', lineHeight: '1.8', listStyleType: 'disc', maxWidth: '600px', margin: '0 auto'
               }}>
                <li>Impulsar la creación y exhibición de arte tecnológico contemporáneo.</li>
                <li>Exponer al público general a prácticas emergentes y accesibles.</li>
                <li>Fortalecer las redes culturales, académicas y tecnológicas del ecosistema local.</li>
              </ul>
          </div>
        </div>
      </section>

      {/* Interact Section with Triangle Animation */}
      <section id="interact" style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        height: '100vh',
        width: '100%',
        position: 'relative',
        backgroundColor: COLORS.cream,
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        boxSizing: 'border-box'
      }}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}
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
          zIndex: 5
        }}>
          <div style={{
            maxWidth: '800px',
            width: isMobile ? '85vw' : '60vw',
            textAlign: 'center',
            padding: isMobile ? '20px' : '40px',
            backgroundColor: 'rgba(250, 243, 225, 0.92)',
            border: `1px solid ${COLORS.dark}`,
            boxSizing: 'border-box'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '42px',
              color: COLORS.dark,
              marginBottom: '20px'
            }}>
              Interactuar
            </h2>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              color: COLORS.text,
              lineHeight: '1.8',
              marginBottom: '30px'
            }}>
              Interactúa con el arte.
            </p>

            {/* Audio Control Button */}
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={toggleAudio}
                style={{
                  padding: isMobile ? '8px 16px' : '10px 20px',
                  fontSize: isMobile ? '11px' : '14px',
                  backgroundColor: isAudioEnabled ? COLORS.red : 'transparent',
                  color: isAudioEnabled ? COLORS.cream : COLORS.text,
                  border: `1px solid ${COLORS.text}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: FONT
                }}
              >
                {isAudioEnabled ? 'Sonido Activo' : 'Activar Sonido'}
              </button>
            </div>

            <Link
              to="/interact"
              style={{
                display: 'inline-block',
                padding: isMobile ? '12px 30px' : '15px 40px',
                fontSize: isMobile ? '16px' : '18px',
                backgroundColor: COLORS.red,
                color: COLORS.cream,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
                fontFamily: FONT
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = COLORS.dark;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = COLORS.red;
              }}
            >
              Lanzar Interfaz Interactiva
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: COLORS.dark,
        color: COLORS.cream,
        padding: '40px 20px',
        textAlign: 'center',
        width: '100%',
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
