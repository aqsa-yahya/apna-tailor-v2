import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H6v3.5h2V21h3.5v-7.5h2.7l.5-3.5h-3.2V8a1.5 1.5 0 0 1 1.5-1.5H15V3Z" strokeLinejoin="round" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" strokeLinejoin="round" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7.5 10v6.5M7.5 7.2v.1" strokeLinecap="round" />
    <path d="M11.5 16.5V10M11.5 12.5c0-1.4 1-2.5 2.4-2.5s2.1 1 2.1 2.6v3.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16 12.5l4 1.5v3a2 2 0 0 1-2.2 2C10.6 18.5 5.5 13.4 5 6.2A2 2 0 0 1 7 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo">
            apna<span className="footer-logo-accent">tailor.</span>
          </Link>
          <p>Design your dream dress before visiting your tailor.</p>
          <div className="footer-social-row">
            <a href="https://www.instagram.com/aqsa.dev/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://www.facebook.com/profile.php?id=61593378210787" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            <a href="https://github.com/aqsa-yahya" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/aqsa-muhammad-yahya-738468418/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/design">Explore Designs</Link>
          <Link to="/design-builder">Design Builder</Link>
          <Link to="/trending-styles">Trending Styles</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <a href="mailto:hello@apnatailor.com" className="footer-contact-row">
            <MailIcon /> hello@apnatailor.com
          </a>
          <a href="tel:+923001234567" className="footer-contact-row">
            <PhoneIcon /> +92 300 1234567
          </a>
          <span className="footer-contact-row">
            <PinIcon /> Lahore, Pakistan
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ApnaTailor. All rights reserved.</span>
      </div>
    </footer>
  );
}
