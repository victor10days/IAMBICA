import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SinglePageHome from './pages/SinglePageHome.jsx';
import Interact from './pages/Interact.jsx';
import History from './pages/History.jsx';
import Admin from './pages/Admin.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SinglePageHome />} />
        <Route path="/interact" element={<Interact />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
