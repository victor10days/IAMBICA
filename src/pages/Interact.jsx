import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Interact = () => {
  const canvasRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [wsConnection, setWsConnection] = useState(null);
  // Auto-detect local network IP for mobile convenience
  const [oscHost, setOscHost] = useState(() => {
    // On mobile, try to get the local network IP from window.location
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return window.location.hostname;
    }
    return '127.0.0.1';
  });
  const [oscPort, setOscPort] = useState('8000');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isPressing, setIsPressing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Connect to OSC bridge (WebSocket server)
  const connectOSC = () => {
    try {
      const ws = new WebSocket(`ws://${oscHost}:${oscPort}`);

      ws.onopen = () => {
        setIsConnected(true);
        console.log('Connected to OSC bridge');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('Disconnected from OSC bridge');
      };

      setWsConnection(ws);
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnected(false);
    }
  };

  const disconnectOSC = () => {
    if (wsConnection) {
      wsConnection.close();
      setWsConnection(null);
      setIsConnected(false);
    }
  };

  // Send OSC message via WebSocket
  const sendOSC = (address, args) => {
    if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
      wsConnection.send(JSON.stringify({
        address: address,
        args: args
      }));
    }
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse/touch interaction
  const handleInteraction = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    // Handle both mouse and touch events
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    setMousePos({ x, y });

    // Send normalized coordinates (0-1)
    sendOSC('/mouse/x', [x]);
    sendOSC('/mouse/y', [y]);
    sendOSC('/mouse/xy', [x, y]);
  };

  const handlePressStart = (e) => {
    setIsPressing(true);
    sendOSC('/press', [1]);
    handleInteraction(e);
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    sendOSC('/press', [0]);
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#FAF3E1';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#F5E7C6';
      ctx.lineWidth = 1;

      for (let i = 0; i <= 10; i++) {
        const x = (canvas.width / 10) * i;
        const y = (canvas.height / 10) * i;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw cursor position
      const cursorX = mousePos.x * canvas.width;
      const cursorY = mousePos.y * canvas.height;

      // Responsive cursor size
      const baseSize = Math.min(canvas.width, canvas.height) * 0.05;
      const outerRadius = isPressing ? baseSize * 1.3 : baseSize;
      const innerRadius = isPressing ? baseSize * 0.5 : baseSize * 0.35;

      // Outer circle
      ctx.strokeStyle = '#D22B2B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, outerRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner circle
      ctx.fillStyle = isPressing ? '#D22B2B' : '#222222';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, innerRadius, 0, Math.PI * 2);
      ctx.fill();

      // Connection indicator lines
      if (isConnected) {
        ctx.strokeStyle = 'rgba(210, 43, 43, 0.3)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(cursorX, 0);
        ctx.lineTo(cursorX, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, cursorY);
        ctx.lineTo(canvas.width, cursorY);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [mousePos, isPressing, isConnected]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {/* Header - Hidden on mobile for more space */}
      {!isMobile && (
        <header style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 40px',
          zIndex: 10
        }}>
          <Link to="/" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            fontFamily: 'Georgia, serif',
            textDecoration: 'none'
          }}>
            I<span style={{ color: '#D22B2B' }}>A</span>MBICA
          </Link>

          <nav style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center'
          }}>
            <Link to="/about" style={{
              color: '#333',
              textDecoration: 'none',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#D22B2B'}
            onMouseLeave={(e) => e.target.style.color = '#333'}
            >
              About Us
            </Link>
            <Link to="/mission" style={{
              color: '#333',
              textDecoration: 'none',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#D22B2B'}
            onMouseLeave={(e) => e.target.style.color = '#333'}
            >
              Mission
            </Link>
            <Link to="/philosophy" style={{
              color: '#333',
              textDecoration: 'none',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#D22B2B'}
            onMouseLeave={(e) => e.target.style.color = '#333'}
            >
              Philosophy
            </Link>
            <Link to="/interact" style={{
              color: '#D22B2B',
              textDecoration: 'none',
              fontFamily: 'Georgia, serif',
              fontSize: '16px'
            }}>
              Interact
            </Link>
          </nav>
        </header>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <Link to="/" style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'Georgia, serif',
          textDecoration: 'none',
          zIndex: 10,
          backgroundColor: 'rgba(250, 243, 225, 0.9)',
          padding: '8px 12px',
          border: '1px solid #333'
        }}>
          I<span style={{ color: '#D22B2B' }}>A</span>MBICA
        </Link>
      )}

      {/* OSC Controls - Responsive */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '10px' : '20px',
        left: isMobile ? '10px' : '20px',
        right: isMobile ? '10px' : 'auto',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: isMobile ? 'rgba(250, 243, 225, 0.95)' : 'transparent',
        padding: isMobile ? '10px' : '0',
        border: isMobile ? '1px solid #333' : 'none'
      }}>
        {/* Mobile: Settings Toggle */}
        {isMobile && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: isConnected ? '#D22B2B' : 'transparent',
              color: isConnected ? '#FAF3E1' : '#333',
              border: '1px solid #333',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{isConnected ? '● Connected' : '○ OSC Settings'}</span>
            <span style={{ fontSize: '10px' }}>
              {mousePos.x.toFixed(2)}, {mousePos.y.toFixed(2)}
            </span>
          </button>
        )}

        {/* Desktop: Always show controls | Mobile: Show when toggled */}
        {(!isMobile || showSettings) && (
          <>
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}>
              <input
                type="text"
                value={oscHost}
                onChange={(e) => setOscHost(e.target.value)}
                placeholder="Host"
                disabled={isConnected}
                style={{
                  padding: '8px 12px',
                  fontSize: isMobile ? '16px' : '14px',
                  fontFamily: 'Georgia, serif',
                  border: '1px solid #333',
                  backgroundColor: '#FAF3E1',
                  color: '#333',
                  width: isMobile ? 'calc(50% - 5px)' : '120px',
                  flex: isMobile ? '1' : 'none'
                }}
              />
              <input
                type="text"
                value={oscPort}
                onChange={(e) => setOscPort(e.target.value)}
                placeholder="Port"
                disabled={isConnected}
                style={{
                  padding: '8px 12px',
                  fontSize: isMobile ? '16px' : '14px',
                  fontFamily: 'Georgia, serif',
                  border: '1px solid #333',
                  backgroundColor: '#FAF3E1',
                  color: '#333',
                  width: isMobile ? 'calc(50% - 5px)' : '80px',
                  flex: isMobile ? '1' : 'none'
                }}
              />
              <button
                onClick={isConnected ? disconnectOSC : connectOSC}
                style={{
                  padding: '8px 16px',
                  fontSize: isMobile ? '16px' : '14px',
                  backgroundColor: isConnected ? '#D22B2B' : 'transparent',
                  color: isConnected ? '#FAF3E1' : '#333',
                  border: '1px solid #333',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'Georgia, serif',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                {isConnected ? 'Disconnect' : 'Connect OSC'}
              </button>
            </div>

            {!isMobile && (
              <div style={{
                fontSize: '12px',
                fontFamily: 'Georgia, serif',
                color: '#333'
              }}>
                {isConnected ? (
                  <span style={{ color: '#D22B2B' }}>● Connected</span>
                ) : (
                  <span>○ Disconnected</span>
                )}
                <div style={{ marginTop: '5px', fontSize: '11px', opacity: 0.7 }}>
                  X: {mousePos.x.toFixed(3)} | Y: {mousePos.y.toFixed(3)}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Info Panel - Desktop Only */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: '80px',
          right: '40px',
          padding: '20px',
          backgroundColor: 'rgba(250, 243, 225, 0.9)',
          border: '1px solid #333',
          maxWidth: '300px',
          fontFamily: 'Georgia, serif',
          fontSize: '12px',
          color: '#333',
          zIndex: 10
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>OSC Messages</h3>
          <div style={{ lineHeight: '1.6' }}>
            <code>/mouse/x</code> - X position (0-1)<br/>
            <code>/mouse/y</code> - Y position (0-1)<br/>
            <code>/mouse/xy</code> - Both X,Y<br/>
            <code>/press</code> - Press state (0/1)
          </div>
          <div style={{ marginTop: '15px', fontSize: '11px', opacity: 0.7 }}>
            Run OSC bridge server first.<br/>
            See OSC_SETUP.md for details.
          </div>
        </div>
      )}

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleInteraction}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchMove={(e) => {
          e.preventDefault();
          handleInteraction(e.touches[0]);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePressStart(e.touches[0]);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePressEnd();
        }}
        style={{
          display: 'block',
          cursor: 'none',
          touchAction: 'none'
        }}
      />
    </div>
  );
};

export default Interact;
