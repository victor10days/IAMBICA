import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useMobile } from '../hooks/useMobile';
import { COLORS, FONT } from '../styles/theme';

const MODES = [
  { id: 'separate', label: 'Separado', desc: 'Cada usuario tiene su propio canal' },
  { id: 'single', label: 'Individual', desc: 'Un usuario activo a la vez' },
  { id: 'blended', label: 'Mezclado', desc: 'Todas las entradas promediadas' },
  { id: 'zones', label: 'Zonas', desc: 'Lienzo dividido en regiones' }
];

const Interact = () => {
  const canvasRef = useRef(null);
  const wsRef = useRef(null);

  // Use refs for values that the animation loop needs (avoids re-creating loop)
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const isPressingRef = useRef(false);
  const isConnectedRef = useRef(false);
  const currentModeRef = useRef('separate');
  const isActiveRef = useRef(true);
  const userZoneRef = useRef(null);

  // State for UI updates
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected' | 'connecting' | 'connected' | 'error'
  const [oscHost, setOscHost] = useState(() => {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return window.location.hostname;
    }
    return '127.0.0.1';
  });
  const [oscPort, setOscPort] = useState('8000');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isPressing, setIsPressing] = useState(false);

  // Multi-user state
  const [userId, setUserId] = useState(null);
  const [currentMode, setCurrentMode] = useState('separate');
  const [totalUsers, setTotalUsers] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [userZone, setUserZone] = useState(null);

  const { isMobile } = useMobile();
  const connectionStatusRef = useRef(connectionStatus);

  // Sync refs with state
  useEffect(() => { isConnectedRef.current = isConnected; }, [isConnected]);
  useEffect(() => { currentModeRef.current = currentMode; }, [currentMode]);
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);
  useEffect(() => { userZoneRef.current = userZone; }, [userZone]);
  useEffect(() => { connectionStatusRef.current = connectionStatus; }, [connectionStatus]);

  // Send OSC message
  const sendOSC = useCallback((address, args) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ address, args }));
    }
  }, []);

  // Connect to OSC bridge
  const connectOSC = useCallback(() => {
    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setConnectionStatus('connecting');

    try {
      const ws = new WebSocket(`ws://${oscHost}:${oscPort}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setConnectionStatus('connected');
        console.log('Connected to OSC bridge');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'state') {
            setUserId(data.userId);
            setCurrentMode(data.mode);
            setTotalUsers(data.totalUsers);
            setIsActive(data.isActive);
            setUserZone(data.zone);
          } else if (data.type === 'userCount') {
            setTotalUsers(data.count);
          }
        } catch (e) {
          console.error('Error parsing server message:', e);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
      };

      ws.onclose = () => {
        setIsConnected(false);
        setUserId(null);
        if (connectionStatusRef.current !== 'error') {
          setConnectionStatus('disconnected');
        }
        console.log('Disconnected from OSC bridge');
      };

    } catch (error) {
      console.error('Connection error:', error);
      setConnectionStatus('error');
      setIsConnected(false);
    }
  }, [oscHost, oscPort]);

  const disconnectOSC = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setUserId(null);
    setConnectionStatus('disconnected');
  }, []);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  // Change mode
  const changeMode = useCallback((newMode) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'setMode', mode: newMode }));
    }
  }, []);

  // Request to become active user
  const requestActive = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'requestActive' }));
    }
  }, []);


  // Handle mouse/touch interaction
  const handleInteraction = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    mousePosRef.current = { x, y };
    setMousePos({ x, y });

    sendOSC('/mouse/x', [x]);
    sendOSC('/mouse/y', [y]);
    sendOSC('/mouse/xy', [x, y]);
  }, [sendOSC]);

  const handlePressStart = useCallback((clientX, clientY) => {
    isPressingRef.current = true;
    setIsPressing(true);
    sendOSC('/press', [1]);
    handleInteraction(clientX, clientY);
  }, [sendOSC, handleInteraction]);

  const handlePressEnd = useCallback(() => {
    isPressingRef.current = false;
    setIsPressing(false);
    sendOSC('/press', [0]);
  }, [sendOSC]);

  // Mouse event handlers
  const onMouseMove = useCallback((e) => {
    handleInteraction(e.clientX, e.clientY);
  }, [handleInteraction]);

  const onMouseDown = useCallback((e) => {
    handlePressStart(e.clientX, e.clientY);
  }, [handlePressStart]);

  const onMouseUp = useCallback(() => {
    handlePressEnd();
  }, [handlePressEnd]);

  // Touch event handlers
  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleInteraction]);

  const onTouchStart = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handlePressStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handlePressStart]);

  const onTouchEnd = useCallback((e) => {
    e.preventDefault();
    handlePressEnd();
  }, [handlePressEnd]);

  // Single persistent animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = () => {
      const pos = mousePosRef.current;
      const pressing = isPressingRef.current;
      const connected = isConnectedRef.current;
      const mode = currentModeRef.current;
      const active = isActiveRef.current;
      const zone = userZoneRef.current;

      // Clear canvas
      ctx.fillStyle = COLORS.cream;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = COLORS.tan;
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

      // Draw zone overlay if in zones mode
      if (mode === 'zones' && zone) {
        const gridSize = 2; // 2x2 grid
        const zoneWidth = canvas.width / gridSize;
        const zoneHeight = canvas.height / gridSize;

        // Highlight user's zone
        const zoneX = ((zone - 1) % gridSize) * zoneWidth;
        const zoneY = Math.floor((zone - 1) / gridSize) * zoneHeight;

        ctx.fillStyle = 'rgba(210, 43, 43, 0.1)';
        ctx.fillRect(zoneX, zoneY, zoneWidth, zoneHeight);

        ctx.strokeStyle = COLORS.red;
        ctx.lineWidth = 3;
        ctx.strokeRect(zoneX, zoneY, zoneWidth, zoneHeight);

        // Draw zone labels
        ctx.font = `${Math.min(24, canvas.width / 20)}px ${FONT}`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.textAlign = 'center';
        for (let i = 0; i < gridSize * gridSize; i++) {
          const zx = (i % gridSize) * zoneWidth + zoneWidth / 2;
          const zy = Math.floor(i / gridSize) * zoneHeight + zoneHeight / 2;
          ctx.fillText(`Zona ${i + 1}`, zx, zy);
        }
        ctx.textAlign = 'left';
      }

      // Draw "waiting" overlay if not active in single mode
      if (mode === 'single' && !active) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fontSize = Math.min(32, canvas.width / 15);
        ctx.font = `bold ${fontSize}px ${FONT}`;
        ctx.fillStyle = COLORS.cream;
        ctx.textAlign = 'center';
        ctx.fillText('Esperando tu turno...', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = `${fontSize * 0.6}px ${FONT}`;
        ctx.fillText('Toca "Solicitar Control" para activarte', canvas.width / 2, canvas.height / 2 + 20);
        ctx.textAlign = 'left';
      }

      // Draw cursor position
      const cursorX = pos.x * canvas.width;
      const cursorY = pos.y * canvas.height;

      const baseSize = Math.min(canvas.width, canvas.height) * 0.05;
      const outerRadius = pressing ? baseSize * 1.3 : baseSize;
      const innerRadius = pressing ? baseSize * 0.5 : baseSize * 0.35;

      // Dim cursor if not active
      const cursorOpacity = (mode === 'single' && !active) ? 0.3 : 1;
      ctx.globalAlpha = cursorOpacity;

      // Outer circle
      ctx.strokeStyle = COLORS.red;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, outerRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner circle
      ctx.fillStyle = pressing ? COLORS.red : COLORS.dark;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, innerRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;

      // Connection indicator lines
      if (connected && active) {
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
  }, []); // Empty dependency array - runs once

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

  // Status badge component
  const StatusBadge = () => {
    if (!isConnected) return null;

    let statusText = '';
    let statusColor = COLORS.red;

    if (currentMode === 'separate') {
      statusText = `Usuario #${userId}`;
    } else if (currentMode === 'single') {
      statusText = isActive ? 'Activo' : 'Esperando';
      statusColor = isActive ? '#2B8C2B' : COLORS.textLight;
    } else if (currentMode === 'blended') {
      statusText = `Mezclando (${totalUsers})`;
    } else if (currentMode === 'zones') {
      statusText = `Zona ${userZone}`;
    }

    return (
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 'max(15px, env(safe-area-inset-bottom))' : 'auto',
        top: isMobile ? 'auto' : '20px',
        right: isMobile ? '10px' : '40px',
        backgroundColor: statusColor,
        color: COLORS.cream,
        padding: isMobile ? '6px 12px' : '8px 16px',
        fontFamily: FONT,
        fontSize: isMobile ? '12px' : '16px',
        fontWeight: 'bold',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '2px'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: COLORS.cream,
          animation: 'pulse 2s infinite'
        }} />
        {statusText}
      </div>
    );
  };

  // Connection status indicator
  const getConnectionButtonText = () => {
    switch (connectionStatus) {
      case 'connecting': return 'Conectando...';
      case 'connected': return 'Desconectar';
      case 'error': return 'Reintentar';
      default: return 'Conectar';
    }
  };

  const getConnectionButtonColor = () => {
    switch (connectionStatus) {
      case 'connecting': return COLORS.textLight;
      case 'connected': return COLORS.red;
      case 'error': return '#B22222';
      default: return COLORS.dark;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      touchAction: 'none'
    }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
      `}</style>

      {/* Status Badge */}
      <StatusBadge />

      {/* Header - Hidden on mobile */}
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
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          <Link to="/" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: COLORS.text,
            fontFamily: FONT,
            textDecoration: 'none',
            pointerEvents: 'auto'
          }}>
            I<span style={{ color: COLORS.red }}>A</span>MBICA
          </Link>

          <nav style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            pointerEvents: 'auto'
          }}>
            <Link to="/" state={{ scrollTo: 'about' }} style={{ color: COLORS.text, textDecoration: 'none', fontFamily: FONT, fontSize: '16px' }}>Sobre Nosotros</Link>
            <Link to="/" state={{ scrollTo: 'mission' }} style={{ color: COLORS.text, textDecoration: 'none', fontFamily: FONT, fontSize: '16px' }}>Misión</Link>
            <Link to="/" state={{ scrollTo: 'philosophy' }} style={{ color: COLORS.text, textDecoration: 'none', fontFamily: FONT, fontSize: '16px' }}>Filosofía</Link>
            <Link to="/interact" style={{ color: COLORS.red, textDecoration: 'none', fontFamily: FONT, fontSize: '16px' }}>Interactuar</Link>
          </nav>
        </header>
      )}

      {/* Mobile Logo */}
      {isMobile && (
        <Link to="/" style={{
          position: 'absolute',
          top: 'max(10px, env(safe-area-inset-top))',
          left: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: COLORS.text,
          fontFamily: FONT,
          textDecoration: 'none',
          zIndex: 20,
          backgroundColor: 'rgba(250, 243, 225, 0.95)',
          padding: '5px 8px',
          border: `1px solid ${COLORS.text}`
        }}>
          I<span style={{ color: COLORS.red }}>A</span>MBICA
        </Link>
      )}

      {/* OSC Controls - Now at TOP */}
      <div style={{
        position: 'absolute',
        top: isMobile ? 'max(50px, calc(env(safe-area-inset-top) + 45px))' : '80px',
        left: isMobile ? '10px' : '20px',
        right: isMobile ? '10px' : 'auto',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        backgroundColor: 'rgba(250, 243, 225, 0.98)',
        padding: isMobile ? '8px' : '15px',
        border: `1px solid ${COLORS.text}`,
        maxWidth: isMobile ? '260px' : '400px',
        borderRadius: '2px',
        touchAction: 'manipulation'
      }}>
        {/* Connection status message */}
        {connectionStatus === 'error' && (
          <div style={{
            color: '#B22222',
            fontSize: '12px',
            fontFamily: FONT,
            padding: '8px',
            backgroundColor: 'rgba(178, 34, 34, 0.1)',
            border: '1px solid #B22222',
            marginBottom: '5px'
          }}>
            Error de conexión. Verifica que el puente OSC esté ejecutándose.
          </div>
        )}

        {/* Connection controls */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={oscHost}
            onChange={(e) => setOscHost(e.target.value)}
            placeholder="IP del Host"
            disabled={isConnected || connectionStatus === 'connecting'}
            style={{
              padding: isMobile ? '8px 6px' : '10px 12px',
              fontSize: isMobile ? '12px' : '14px',
              fontFamily: FONT,
              border: `1px solid ${COLORS.text}`,
              backgroundColor: isConnected ? '#eee' : COLORS.cream,
              color: COLORS.text,
              width: isMobile ? '90px' : '120px',
              borderRadius: '2px'
            }}
          />
          <input
            type="text"
            value={oscPort}
            onChange={(e) => setOscPort(e.target.value)}
            placeholder="Puerto"
            disabled={isConnected || connectionStatus === 'connecting'}
            style={{
              padding: isMobile ? '8px 6px' : '10px 12px',
              fontSize: isMobile ? '12px' : '14px',
              fontFamily: FONT,
              border: `1px solid ${COLORS.text}`,
              backgroundColor: isConnected ? '#eee' : COLORS.cream,
              color: COLORS.text,
              width: isMobile ? '55px' : '80px',
              borderRadius: '2px'
            }}
          />
          <button
            onClick={isConnected ? disconnectOSC : connectOSC}
            disabled={connectionStatus === 'connecting'}
            style={{
              padding: isMobile ? '8px 12px' : '10px 20px',
              fontSize: isMobile ? '13px' : '14px',
              backgroundColor: getConnectionButtonColor(),
              color: COLORS.cream,
              border: 'none',
              cursor: connectionStatus === 'connecting' ? 'wait' : 'pointer',
              fontFamily: FONT,
              fontWeight: 'bold',
              flex: 1,
              borderRadius: '2px',
              opacity: connectionStatus === 'connecting' ? 0.7 : 1
            }}
          >
            {getConnectionButtonText()}
          </button>
        </div>

        {/* Mode selector - always visible */}
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '6px' }}>
          <div style={{
            fontSize: '10px',
            fontFamily: FONT,
            color: COLORS.textLight,
            marginBottom: '4px'
          }}>
            Modo{isConnected ? ` (${totalUsers} usuario${totalUsers !== 1 ? 's' : ''})` : ''}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '3px',
            opacity: isConnected ? 1 : 0.5
          }}>
            {MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => changeMode(mode.id)}
                disabled={!isConnected}
                title={mode.desc}
                style={{
                  padding: isMobile ? '6px 2px' : '8px 4px',
                  fontSize: isMobile ? '10px' : '11px',
                  backgroundColor: currentMode === mode.id ? COLORS.red : COLORS.cream,
                  color: currentMode === mode.id ? COLORS.cream : COLORS.text,
                  border: `1px solid ${COLORS.text}`,
                  cursor: isConnected ? 'pointer' : 'default',
                  fontFamily: FONT,
                  fontWeight: currentMode === mode.id ? 'bold' : 'normal',
                  borderRadius: '2px'
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>
          {!isConnected && (
            <div style={{
              fontSize: '9px',
              fontFamily: FONT,
              color: '#999',
              marginTop: '3px',
              fontStyle: 'italic'
            }}>
              Conecta para cambiar el modo
            </div>
          )}
        </div>

        {/* Single mode: Request control button */}
        {isConnected && currentMode === 'single' && !isActive && (
          <button
            onClick={requestActive}
            style={{
              padding: '12px 20px',
              fontSize: '14px',
              backgroundColor: '#2B8C2B',
              color: COLORS.cream,
              border: 'none',
              cursor: 'pointer',
              fontFamily: FONT,
              fontWeight: 'bold',
              borderRadius: '2px'
            }}
          >
            Solicitar Control
          </button>
        )}


        {/* Coordinates display */}
        <div style={{
          fontSize: '10px',
          fontFamily: 'monospace',
          color: '#888',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>X: {mousePos.x.toFixed(3)} | Y: {mousePos.y.toFixed(3)}</span>
          {isConnected && userId && (
            <span>Usuario #{userId}</span>
          )}
        </div>
      </div>

      {/* Info Panel - Desktop Only */}
      {!isMobile && isConnected && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '40px',
          padding: '15px',
          backgroundColor: 'rgba(250, 243, 225, 0.95)',
          border: `1px solid ${COLORS.text}`,
          maxWidth: '280px',
          fontFamily: FONT,
          fontSize: '12px',
          color: COLORS.text,
          zIndex: 10,
          borderRadius: '2px'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            {currentMode === 'separate' && 'Canales Separados'}
            {currentMode === 'single' && 'Usuario Activo Individual'}
            {currentMode === 'blended' && 'Entrada Mezclada'}
            {currentMode === 'zones' && 'Control por Zonas'}
          </h3>
          <div style={{ lineHeight: '1.5' }}>
            {currentMode === 'separate' && (
              <>Tus direcciones OSC:<br/>
              <code style={{ fontSize: '10px' }}>/user/{userId}/mouse/x</code><br/>
              <code style={{ fontSize: '10px' }}>/user/{userId}/mouse/y</code><br/>
              <code style={{ fontSize: '10px' }}>/user/{userId}/press</code></>
            )}
            {currentMode === 'single' && (
              <>Solo se envían los datos del usuario activo.<br/>
              {isActive ? <strong>Estás activo actualmente.</strong> : 'Estás esperando el control.'}</>
            )}
            {currentMode === 'blended' && (
              <>Las posiciones de los {totalUsers} usuarios se promedian.<br/>
              ¡Muévanse juntos para un control suave!</>
            )}
            {currentMode === 'zones' && (
              <>Controlas la <strong>Zona {userZone}</strong>.<br/>
              OSC: <code style={{ fontSize: '10px' }}>/zone/{userZone}/...</code></>
            )}
          </div>
        </div>
      )}

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
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
