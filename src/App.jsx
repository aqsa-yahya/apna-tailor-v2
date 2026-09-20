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
import DesignDetail from './pages/DesignDetail'; // apne folder ke hisaab se path likho



export default function App() {
  return (
    /* basename must always match vite.config.js's `base` (both "/" now
       that the deployment target is Netlify, which serves from its own
       domain root, not a subpath). Keeping this pairing matters even at
       "/" - if the site ever moves to a host that serves from a subpath
       again, forgetting one of the two reproduces a real bug seen during
       an earlier GitHub Pages attempt: BrowserRouter reads the actual
       URL, but every <Route path="..."> is written as if the app were at
       the domain root, so nothing matches on first load and only the
       Navbar (outside <Routes>) shows - it only looked "fixed" by
       clicking a nav link, because that pushes the literal href ("/"),
       which happens to match by luck. */
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/design-builder" element={<DesignBuilder />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trending-styles" element={<TrendingStyles />} />
        <Route path="/design-details/:audience/:slug" element={<DesignDetail />} />
      </Routes>
    </Router>
  );
}
