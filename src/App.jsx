import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Design from './pages/Design';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import TrendingStyles from './pages/TrendingStyles';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/trending-styles" element={<TrendingStyles />} />
      </Routes>
    </Router>
  );
}
