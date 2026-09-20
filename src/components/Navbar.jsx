import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo takes user back to the homepage / main purpose of the site */}
      <Link to="/" className="logo" onClick={closeMenu}>
        apna<span className="logo-accent">tailor.</span>
      </Link>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/design" onClick={closeMenu}>Explore Designs</NavLink>
        <NavLink to="/design-builder" onClick={closeMenu}>Design Builder</NavLink>
        <NavLink to="/trending-styles" onClick={closeMenu}>Trending Styles</NavLink>

        {/* Shown inside the dropdown on mobile only */}
        <Link to="/design-builder" className="ai-preview-btn-nav mobile-only" onClick={closeMenu}>
          ✨ AI Preview
        </Link>
      </div>

      <div className="nav-actions">
        {/* Single AI Preview CTA - replaces the old search/cart icons */}
        <Link to="/design-builder" className="ai-preview-btn-nav desktop-only">
          ✨ AI Preview
        </Link>

        {/* Hamburger toggle - visible on mobile only */}
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
