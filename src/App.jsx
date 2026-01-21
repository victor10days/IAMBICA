import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SinglePageHome from './pages/SinglePageHome.jsx';
import Interact from './pages/Interact.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SinglePageHome />} />
        <Route path="/interact" element={<Interact />} />
      </Routes>
    </Router>
  );
};

export default App;
