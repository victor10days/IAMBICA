import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { COLORS, FONT } from '../styles/theme';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div style={{
      fontFamily: FONT,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.cream,
      textAlign: 'center',
      padding: '20px',
    }}>
      <h1 style={{ fontSize: '72px', color: COLORS.red, margin: '0 0 16px 0' }}>404</h1>
      <p style={{ fontSize: '20px', color: COLORS.text, marginBottom: '32px' }}>
        {t('notFound.message')}
      </p>
      <Link
        to="/"
        style={{
          padding: '12px 32px',
          fontSize: '16px',
          backgroundColor: COLORS.dark,
          color: COLORS.cream,
          textDecoration: 'none',
          fontFamily: FONT,
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = COLORS.red; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = COLORS.dark; }}
      >
        {t('notFound.backHome')}
      </Link>
    </div>
  );
};

export default NotFound;
