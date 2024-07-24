import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrlShortener from './components/UrlShortener'
import NotFound from './components/NotFound';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UrlShortener />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
