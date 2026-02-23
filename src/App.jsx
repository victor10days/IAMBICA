import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { COLORS, FONT } from './styles/theme';

const SinglePageHome = lazy(() => import('./pages/SinglePageHome.jsx'));
const Interact = lazy(() => import('./pages/Interact.jsx'));
const History = lazy(() => import('./pages/History.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const Loading = () => (
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
    Cargando...
  </div>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<SinglePageHome />} />
          <Route path="/interact" element={<Interact />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
