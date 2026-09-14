import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Design from './pages/Design';
import DesignBuilder from './pages/DesignBuilder';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Contact from './pages/Contact';
import TrendingStyles from './pages/TrendingStyles';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/design-builder" element={<DesignBuilder />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trending-styles" element={<TrendingStyles />} />
      </Routes>
    </Router>
  );
}
