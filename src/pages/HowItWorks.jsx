import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const AudienceIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="14" cy="14" r="5.5" />
    <circle cx="27" cy="16" r="4.5" />
    <path d="M5 33c0-6.5 4.5-10.5 9-10.5s9 4 9 10.5" strokeLinecap="round" />
    <path d="M22 33c0-5 3-8.5 6.5-8.5s6.5 3.5 6.5 8.5" strokeLinecap="round" />
  </svg>
);

const ExploreIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="5" y="6" width="12" height="12" rx="2" />
    <rect x="21" y="6" width="14" height="12" rx="2" />
    <rect x="5" y="22" width="14" height="12" rx="2" />
    <rect x="23" y="22" width="12" height="12" rx="2" />
  </svg>
);

const AiIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M20 5v6M20 29v6M5 20h6M29 20h6M10 10l4.2 4.2M25.8 25.8 30 30M30 10l-4.2 4.2M14.2 25.8 10 30" strokeLinecap="round" />
    <circle cx="20" cy="20" r="5.5" />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="6" y="4" width="22" height="30" rx="2" />
    <path d="M11 11h12M11 16h12M11 21h8" strokeLinecap="round" />
    <circle cx="30" cy="30" r="8" style={{ fill: 'var(--accent-bright)' }} stroke="none" />
    <path d="M30 26v8M26 30l4 4 4-4" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const steps = [
  {
    Icon: AudienceIcon,
    title: 'Pick who you’re designing for',
    desc: 'Choose Women, Men, Baby Girl or Baby Boy so every neckline, sleeve and cut you see next actually fits the outfit you’re planning.',
  },
  {
    Icon: ExploreIcon,
    title: 'Browse the Design Explorer',
    desc: 'Flip through real reference photos for necklines, sleeves, daman cuts and trouser styles, organised the way you’d actually describe them to your tailor.',
  },
  {
    Icon: AiIcon,
    title: 'Or generate one with AI',
    desc: 'Not seeing it in the gallery? Open the Stitching Studio, describe your dream outfit in your own words, and get a front and back AI preview in seconds.',
  },
  {
    Icon: CardIcon,
    title: 'Download your design card',
    desc: 'Every choice - fabric, color, neckline, sleeves, daman, trouser - collects into one clean, downloadable card with notes for your tailor. No more voice notes.',
  },
];

export default function HowItWorks() {
  return (
    <div className="hiw-page">
      <section className="hiw-hero">
        <span className="hiw-eyebrow">The Process</span>
        <h1>How It Works</h1>
        <p>From a vague idea to a design your darzi can stitch from - in four steps.</p>
      </section>

      <section className="hiw-steps">
        {steps.map(({ Icon, title, desc }, i) => (
          <div className="hiw-step" key={title}>
            <div className="hiw-step-top">
              <span className="hiw-step-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="hiw-step-icon"><Icon /></span>
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </section>

      <section className="hiw-cta">
        <h2>Ready to design your next outfit?</h2>
        <p>It takes less time than scrolling through your saved Instagram posts.</p>
        <div className="hiw-cta-actions">
          <Link to="/design" className="hiw-btn-primary">Explore Designs &rarr;</Link>
          <Link to="/design-builder" className="hiw-btn-ghost">Try Stitching Studio</Link>
        </div>
      </section>
    </div>
  );
}
