import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { COLORS, FONT } from '../styles/theme';
import { useMobile } from '../hooks/useMobile';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { isMobile } = useMobile();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const scrollToSection = (sectionId) => {
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const navItems = [
    { type: 'section', id: 'about', label: isMobile ? t('nav.aboutShort') : t('nav.about') },
    { type: 'section', id: 'mission', label: t('nav.mission') },
    { type: 'section', id: 'philosophy', label: t('nav.objectives') },
    { type: 'section', id: 'history', label: t('nav.history') },
    { type: 'section', id: 'interact', label: t('nav.interact') },
  ];

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
        {navItems.map((item) => {
          if (item.type === 'page') {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...linkStyle,
                  color: isActive ? COLORS.red : COLORS.text,
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.red}
                onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? COLORS.red : COLORS.text; }}
              >
                {item.label}
              </Link>
            );
          }
          return (
            <a
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection(item.id)}
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = COLORS.red}
              onMouseLeave={(e) => e.currentTarget.style.color = COLORS.text}
            >
              {item.label}
            </a>
          );
        })}

        <button
          onClick={toggleLanguage}
          style={{
            background: 'none',
            border: `1px solid ${COLORS.text}`,
            color: COLORS.text,
            padding: isMobile ? '2px 6px' : '4px 10px',
            fontSize: isMobile ? '11px' : '13px',
            fontFamily: FONT,
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = COLORS.red; e.currentTarget.style.color = COLORS.cream; e.currentTarget.style.borderColor = COLORS.red; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = COLORS.text; e.currentTarget.style.borderColor = COLORS.text; }}
        >
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
