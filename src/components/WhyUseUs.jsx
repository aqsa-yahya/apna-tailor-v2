import React from 'react';
import './WhyUseUs.css';

const ClockIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="16" cy="16" r="12" />
    <path d="M16 9v7l5 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 8h20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H14l-6 5v-5H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
    <path d="M10 14h12M10 18h8" strokeLinecap="round" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M9 4h10l6 6v18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 7 28V5.5A1.5 1.5 0 0 1 8.5 4Z" strokeLinejoin="round" />
    <path d="M19 4v6h6" strokeLinejoin="round" />
    <path d="M12 17h8M12 21h8M12 13h3" strokeLinecap="round" />
  </svg>
);

const HandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 12V4a1.5 1.5 0 0 1 3 0v8M14 12V5.5a1.5 1.5 0 0 1 3 0V13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 13l-1.8-1.8a1.6 1.6 0 0 0-2.3 2.3L8 17.5c1.4 1.4 2.4 3.5 6 3.5 4 0 6-2.5 6-6.5v-4a1.5 1.5 0 0 0-3 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DressIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M9 3.5h6l.6 2.8-1.6 1.2 3 10.5a1 1 0 0 1-1 1.3H8a1 1 0 0 1-1-1.3l3-10.5-1.6-1.2L9 3.5Z" strokeLinejoin="round" />
    <path d="M9.6 6.3h4.8" strokeLinecap="round" />
  </svg>
);

const WifiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 9c4.5-4.2 11.5-4.2 16 0" strokeLinecap="round" />
    <path d="M7 12.7c2.9-2.5 7.1-2.5 10 0" strokeLinecap="round" />
    <path d="M10 16.3c1.2-1 2.8-1 4 0" strokeLinecap="round" />
    <circle cx="12" cy="19.2" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="18" cy="5.5" r="2.4" />
    <circle cx="18" cy="18.5" r="2.4" />
    <path d="M8.1 10.8 15.9 6.7M8.1 13.2l7.8 4.1" strokeLinecap="round" />
  </svg>
);

const reasons = [
  {
    Icon: ClockIcon,
    title: 'Save Hours of Searching',
    desc: 'No more endless browsing. Find and customize the perfect design in minutes.',
  },
  {
    Icon: ChatIcon,
    title: 'Avoid Tailor Miscommunication',
    desc: 'Clear design card with all details helps your tailor understand exactly what you want.',
  },
  {
    Icon: DocumentIcon,
    title: 'Get Perfect Visual Guides',
    desc: 'Show exact design, fabric, color and measurements with confident clarity.',
  },
];

const perks = [
  { Icon: HandIcon, label: 'Easy to Use' },
  { Icon: DressIcon, label: 'Hundreds of Styles' },
  { Icon: WifiIcon, label: 'Works Offline' },
  { Icon: ShareIcon, label: 'Share Anywhere' },
];

export default function WhyUseUs() {
  return (
    <>
      <section className="why-use-section">
        <h2 className="why-use-title">Why Use ApnaTailor?</h2>
        <div className="why-use-grid">
          {reasons.map(({ Icon, title, desc }) => (
            <div className="why-use-card" key={title}>
              <span className="why-use-icon"><Icon /></span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="perks-strip">
        <div className="perks-strip-inner">
          {perks.map(({ Icon, label }, i) => (
            <React.Fragment key={label}>
              <div className="perk-item">
                <span className="perk-icon"><Icon /></span>
                <span>{label}</span>
              </div>
              {i < perks.length - 1 && <span className="perk-divider" />}
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
