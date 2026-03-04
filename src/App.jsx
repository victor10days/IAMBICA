import { lazy, Suspense, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
};
import { useTranslation } from 'react-i18next';
import { COLORS, FONT } from './styles/theme';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: COLORS.cream, fontFamily: FONT, padding: '40px', textAlign: 'center',
        }}>
          <h2 style={{ color: COLORS.dark, marginBottom: '16px' }}>Algo salió mal</h2>
          <p style={{ color: COLORS.text, marginBottom: '24px', maxWidth: '500px' }}>
            {this.state.error?.message || 'Error inesperado'}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
            style={{ padding: '10px 24px', backgroundColor: COLORS.dark, color: COLORS.cream, border: 'none', cursor: 'pointer', fontFamily: FONT }}
          >
            Volver al inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const SinglePageHome = lazy(() => import('./pages/SinglePageHome.jsx'));
const Interact = lazy(() => import('./pages/Interact.jsx'));
const History = lazy(() => import('./pages/History.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.cream,
      fontFamily: FONT,
      color: COLORS.text,
      fontSize: '16px',
    }}>
      {t('common.loading')}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<SinglePageHome />} />
            <Route path="/interact" element={<Interact />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
