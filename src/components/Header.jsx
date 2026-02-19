import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { COLORS, FONT } from '../styles/theme';
import { useMobile } from '../hooks/useMobile';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { isMobile } = useMobile();

  const scrollToSection = (sectionId) => {
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const homeSections = [
    { id: 'about', label: isMobile ? 'Nosotros' : 'Sobre Nosotros' },
    { id: 'mission', label: 'Misión' },
    { id: 'philosophy', label: 'Objetivos' },
    { id: 'interact', label: 'Interactuar' },
  ];
  const pageLinks = [{ label: 'Historia', path: '/history' }];

  const linkStyle = {
    color: COLORS.text,
    textDecoration: 'none',
    fontSize: isMobile ? '12px' : '16px',
    cursor: 'pointer',
    transition: 'color 0.2s',
    whiteSpace: 'nowrap',
    fontFamily: FONT,
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '12px 15px' : '20px 30px',
      backgroundColor: COLORS.creamTranslucent,
      borderBottom: `1px solid ${COLORS.dark}`,
      zIndex: 100,
      boxSizing: 'border-box',
    }}>
      <Link to="/" style={{
        fontSize: isMobile ? '18px' : '24px',
        fontWeight: 'bold',
        color: COLORS.text,
        textDecoration: 'none',
        flexShrink: 0,
        fontFamily: FONT,
      }}>
        I<span style={{ color: COLORS.red }}>A</span>MBICA
      </Link>

      <nav style={{
        display: 'flex',
        gap: isMobile ? '8px' : '20px',
        alignItems: 'center',
        flexWrap: 'nowrap',
      }}>
        {homeSections.map((section) => (
          <a
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToSection(section.id)}
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = COLORS.red}
            onMouseLeave={(e) => e.currentTarget.style.color = COLORS.text}
          >
            {section.label}
          </a>
        ))}

        {pageLinks.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              style={{
                ...linkStyle,
                color: isActive ? COLORS.red : COLORS.text,
                fontWeight: isActive ? 'bold' : 'normal',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = COLORS.red}
              onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? COLORS.red : COLORS.text; }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
