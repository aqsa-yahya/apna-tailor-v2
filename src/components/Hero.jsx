import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3 2 8l10 5 10-5-10-5Z" strokeLinejoin="round" />
    <path d="m2 13 10 5 10-5" strokeLinejoin="round" />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M7 15h4" strokeLinecap="round" />
  </svg>
);

const GiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="9" width="18" height="11" rx="1.5" />
    <path d="M3 9h18v4H3zM12 9v11M12 9c-2-3-6-3-6-1s3 1 6 1Zm0 0c2-3 6-3 6-1s-3 1-6 1Z" />
  </svg>
);

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-container">
      {/* Left Text Content */}
      <div className="hero-content">
        <h1>Design Your Dream Dress Before Visiting Your Tailor</h1>
        <p>
          Mix &amp; match necklines, sleeves, and daman to create the perfect
          reference card for your darzi.
        </p>

        <div className="hero-cta-row">
          <button className="browse-btn" onClick={() => navigate('/design')}>
            Start Customizing &rarr;
          </button>

          <Link to="/design" className="ai-preview-btn">
            ✨ Try AI Preview
          </Link>
        </div>

        <div className="feature-mini-row">
          <div className="feature-mini-card">
            <span className="feature-mini-icon"><LayersIcon /></span>
            <span>1000+ Combinations</span>
          </div>
          <div className="feature-mini-card">
            <span className="feature-mini-icon"><CardIcon /></span>
            <span>Instant Design Card</span>
          </div>
          <div className="feature-mini-card">
            <span className="feature-mini-icon"><GiftIcon /></span>
            <span>100% Free</span>
          </div>
        </div>
      </div>

      {/* Right Image Block - the info card now overlays the image's
          bottom-right corner instead of sitting beside it as a
          separate column (that extra column was causing overlap). */}
      <div className="hero-image-wrapper">
        <div className="image-frame-holder">
          <div className="image-frame">
            <img
              src="https://images.pexels.com/photos/20792022/pexels-photo-20792022.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Reference look - embroidered kurta with lace detailing"
              className="model-img"
            />
          </div>

          <div className="hero-design-info">
            <h4>About This Look</h4>
            <ul>
              <li><span>Fabric</span><strong>Lawn Cotton</strong></li>
              <li><span>Neckline</span><strong>Embroidered V-Neck</strong></li>
              <li><span>Sleeves</span><strong>Lace-trimmed 3/4</strong></li>
              <li><span>Color</span><strong>Sage Green</strong></li>
            </ul>
            <Link to="/design" className="hero-design-info-link">
              Customize this look &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
