import React, { useState, useEffect } from 'react';
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

/* Har slide = 1 image + uski details */
const SLIDES = [
  {
    src: 'https://images.pexels.com/photos/20792022/pexels-photo-20792022.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Sage green embroidered kurta with lace detailing',
    details: [
      ['Fabric', 'Lawn Cotton'],
      ['Neckline', 'Embroidered V-Neck'],
      ['Sleeves', 'Lace-trimmed 3/4'],
      ['Color', 'Sage Green'],
    ],
  },
  {
    src: 'https://images.pexels.com/photos/31874451/pexels-photo-31874451.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Grey printed kurta with embroidered front panel and cuffs',
    details: [
      ['Fabric', 'Printed Lawn'],
      ['Neckline', 'Embroidered Placket'],
      ['Sleeves', 'Full, Embroidered Cuff'],
      ['Color', 'Dove Grey'],
    ],
  },
  {
    src: 'https://images.pexels.com/photos/36567519/pexels-photo-36567519.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Olive green kurta with mirror work embroidery',
    details: [
      ['Fabric', 'Mirror-work Lawn'],
      ['Neckline', 'Scalloped Round Neck'],
      ['Sleeves', 'Flared, Lace-trimmed'],
      ['Color', 'Olive Green'],
    ],
  },
];

/* Neeche wale 3 cards. count wale card mein number 0 se upar chadhta hai.
   Middle card mein number nahi hai, us par sirf shine aata hai. */
const FEATURES = [
  { Icon: LayersIcon, count: 1000, suffix: '+', label: 'Combinations' },
  { Icon: CardIcon, label: 'Instant Design Card' },
  { Icon: GiftIcon, count: 100, suffix: '%', label: 'Free' },
];

const HEADLINE = 'Design Your Dream Dress Before Visiting Your Tailor';
const TYPE_SPEED_MS = 55; // typing speed (kam = tez)
const SLIDE_MS = 5000; // har image kitni der rukay
const COUNT_DELAY_MS = 500; // page khulne ke kitni der baad ginti shuru ho
const COUNT_MS = 1800; // ginti kitni der mein poori ho

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useTypewriter(text, speed, disabled) {
  const [count, setCount] = useState(disabled ? text.length : 0);

  useEffect(() => {
    if (disabled) {
      setCount(text.length);
      return undefined;
    }
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, disabled]);

  return count;
}

/* 0 se 1 tak ek smooth progress (shuru mein tez, end mein aahista) */
function useProgress(duration, delay, disabled) {
  const [t, setT] = useState(disabled ? 1 : 0);

  useEffect(() => {
    if (disabled) {
      setT(1);
      return undefined;
    }
    let raf = 0;
    let start = null;
    const timer = setTimeout(() => {
      const tick = (now) => {
        if (start === null) start = now;
        const p = Math.min((now - start) / duration, 1);
        setT(1 - Math.pow(1 - p, 3));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [duration, delay, disabled]);

  return t;
}

export default function Hero() {
  const navigate = useNavigate();
  const [reduced] = useState(prefersReducedMotion);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const typedCount = useTypewriter(HEADLINE, TYPE_SPEED_MS, reduced);
  const typingDone = typedCount >= HEADLINE.length;

  const progress = useProgress(COUNT_MS, COUNT_DELAY_MS, reduced);
  const statsDone = progress >= 1;

  /* Auto-slide: hover/focus par ruk jata hai, dot click par timer reset */
  useEffect(() => {
    if (reduced || paused) return undefined;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => clearTimeout(id);
  }, [active, paused, reduced]);

  const current = SLIDES[active];

  return (
    <section className="hero-container">
      {/* Left Text Content */}
      <div className="hero-content">
        {/* Ghost text poori height reserve karta hai taake typing ke waqt
            neechay wala content upar-neechay na jump kare */}
        <h1 className="hero-title" aria-label={HEADLINE}>
          <span className="hero-title-ghost" aria-hidden="true">
            {HEADLINE}
          </span>
          <span className="hero-title-typed" aria-hidden="true">
            {HEADLINE.slice(0, typedCount)}
            <span className={`hero-caret ${typingDone ? 'is-done' : ''}`} />
          </span>
        </h1>

        <p>
          Mix &amp; match necklines, sleeves, and daman to create the perfect
          reference card for your darzi.
        </p>

        <div className="hero-cta-row">
          <button className="browse-btn" onClick={() => navigate('/design-builder')}>
            Start Customizing &rarr;
          </button>

          <Link to="/design-builder" className="ai-preview-btn">
            ✨ Try AI Preview
          </Link>
        </div>

        <div className="feature-mini-row">
          {FEATURES.map(({ Icon, count, suffix, label }, i) => {
            const hasCount = typeof count === 'number';
            const finalText = hasCount ? `${count}${suffix}` : '';
            const liveText = hasCount ? `${Math.round(count * progress)}${suffix}` : '';

            return (
              <div
                key={label}
                className={`feature-mini-card ${statsDone ? 'is-done' : ''}`}
                style={{ '--i': i }}
              >
                <span className="feature-mini-icon"><Icon /></span>

                {/* Screen reader ko hamesha poora final text milta hai */}
                <span className="visually-hidden">
                  {hasCount ? `${finalText} ${label}` : label}
                </span>

                <span className="feature-mini-text" aria-hidden="true">
                  {hasCount && (
                    <span className="stat-num">
                      {/* ghost final width reserve karta hai, text jump nahi karta */}
                      <span className="stat-num-ghost">{finalText}</span>
                      <span className="stat-num-live">{liveText}</span>
                    </span>
                  )}
                  {hasCount ? ' ' : ''}
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Image Block: rotating images + details card */}
      <div className="hero-image-wrapper">
        <div
          className="image-frame-holder"
          aria-roledescription="carousel"
          aria-label="Reference looks"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="image-frame">
            {SLIDES.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`model-img hero-slide ${i === active ? 'is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                aria-hidden={i !== active}
              />
            ))}
          </div>

          <div className="hero-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hero-dot ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Show look ${i + 1}`}
                aria-current={i === active}
              >
                {i === active && (
                  <span
                    className={`hero-dot-fill ${!paused && !reduced ? 'is-running' : ''}`}
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hero-design-info">
            <h4>About This Look</h4>
            <ul key={active} className="hero-design-list">
              {current.details.map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>
            <Link to="/design-builder" className="hero-design-info-link">
              Customize this look &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}