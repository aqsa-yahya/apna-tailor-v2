import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const CompassIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="16" cy="16" r="12" />
    <path d="M20 12l-6 2-2 6 6-2 2-6Z" strokeLinejoin="round" />
  </svg>
);

const HeartHandsIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M16 25s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 3-2 5.5-4.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 22l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M16 5v6M16 21v6M5 16h6M21 16h6M8.5 8.5l4.2 4.2M19.3 19.3l4.2 4.2M23.5 8.5l-4.2 4.2M12.7 19.3l-4.2 4.2" strokeLinecap="round" />
  </svg>
);

const values = [
  {
    Icon: CompassIcon,
    title: 'Clarity over guesswork',
    desc: "A design that lives only in your head gets lost in translation at the shop. We turn it into a precise, shareable reference before you ever step outside.",
  },
  {
    Icon: HeartHandsIcon,
    title: 'Built for the Pakistani darzi',
    desc: 'Necklines, daman cuts and shalwar styles named the way you and your tailor already talk about them - not generic Western fashion terms.',
  },
  {
    Icon: SparkIcon,
    title: 'Free to explore',
    desc: 'Browsing designs, mixing styles and generating AI previews costs nothing. Good design tools should not be a barrier to a well-stitched outfit.',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <span className="about-eyebrow">Our Story</span>
        <h1>Why ApnaTailor Exists</h1>
        <p>
          Every season starts the same way: a screenshot from Instagram, a half-remembered
          neckline from a wedding, and a tailor asking questions you don&apos;t have answers
          to. ApnaTailor exists to close that gap - between the outfit in your head and the
          outfit your darzi actually stitches.
        </p>
      </section>

      <section className="about-values">
        {values.map(({ Icon, title, desc }) => (
          <div className="about-value-card" key={title}>
            <span className="about-value-icon"><Icon /></span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </section>

      <section className="about-story">
        <div className="about-story-text">
          <h2>From browsing to a design card</h2>
          <p>
            We built ApnaTailor around one simple idea: choosing an outfit design shouldn&apos;t
            mean juggling ten saved screenshots and a WhatsApp voice note to your tailor. The
            Design Explorer lets you mix and match real reference photos for necklines, sleeves,
            daman and trouser cuts across Women, Men, Baby Girl and Baby Boy styles. The Stitching
            Studio takes it further - describe the outfit in your own words and get an AI-generated
            front and back preview in seconds. Either way, you walk away with one clean,
            downloadable design card that says exactly what you want, in language your tailor
            already understands.
          </p>
          <div className="about-story-actions">
            <Link to="/design" className="about-btn-primary">Explore Designs &rarr;</Link>
            <Link to="/design-builder" className="about-btn-ghost">Try Stitching Studio</Link>
          </div>
        </div>
        <div className="about-story-stats">
          <div className="about-stat">
            <strong>4</strong>
            <span>Audiences - Women, Men, Baby Girl &amp; Baby Boy</span>
          </div>
          <div className="about-stat">
            <strong>1000+</strong>
            <span>Style combinations to explore</span>
          </div>
          <div className="about-stat">
            <strong>100%</strong>
            <span>Free design cards, always</span>
          </div>
        </div>
      </section>
    </div>
  );
}
