import React, { useState } from 'react';
import './Design.css';

/* Original schematic neckline icons - small dots along the neckline
   curve suggest embroidery/stitch detail without copying anyone
   else's artwork. Fully hand-drawn here, free to use anywhere. */
const RoundNeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6v15M20 6v15" strokeLinecap="round" />
    <path d="M5 6q7 11 14 0" />
    <circle cx="8.3" cy="9.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="11.2" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="15.7" cy="9.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const VNeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6v15M20 6v15" strokeLinecap="round" />
    <path d="M5 6 12 17 19 6" strokeLinejoin="round" />
    <circle cx="8.3" cy="10.2" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="15.7" cy="10.2" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const BoatNeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 9v12M20 9v12" strokeLinecap="round" />
    <path d="M3 7q9 5 18 0" />
    <circle cx="7.5" cy="8.3" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="9.6" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="8.3" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const MandarinNeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 10v11M18 10v11" strokeLinecap="round" />
    <rect x="8" y="4" width="8" height="6" rx="1.5" />
    <circle cx="10.5" cy="7" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="13.5" cy="7" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const KeyholeNeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6v15M20 6v15" strokeLinecap="round" />
    <path d="M5 6q7 8 14 0" />
    <circle cx="12" cy="14" r="1.8" />
    <circle cx="8.3" cy="8.5" r="0.55" fill="currentColor" stroke="none" />
    <circle cx="15.7" cy="8.5" r="0.55" fill="currentColor" stroke="none" />
  </svg>
);
const SquareNeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6v15M20 6v15" strokeLinecap="round" />
    <path d="M5 6h5v5h4V6h5" strokeLinejoin="round" />
    <circle cx="7.5" cy="6.6" r="0.55" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="6.6" r="0.55" fill="currentColor" stroke="none" />
  </svg>
);
const SweetheartNeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6v15M20 6v15" strokeLinecap="round" />
    <path d="M5 7q3.5-3 7 1q3.5-4 7-1" />
    <circle cx="7" cy="7.5" r="0.55" fill="currentColor" stroke="none" />
    <circle cx="17" cy="7.5" r="0.55" fill="currentColor" stroke="none" />
  </svg>
);
const CollarNeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6v15M20 6v15" strokeLinecap="round" />
    <path d="M5 6 12 12 19 6M5 6 9 6M19 6 15 6" strokeLinejoin="round" />
    <circle cx="9" cy="6" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="6" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const StraightSleeveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 4h16v6l-4 12H8L4 10Z" strokeLinejoin="round" />
  </svg>
);
const BellSleeveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 4h16v4L16 20H8L4 8Z" strokeLinejoin="round" />
  </svg>
);
const RolledSleeveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 4h16v5H4z" strokeLinejoin="round" />
    <path d="M6 9h12l-2 9H8Z" strokeLinejoin="round" />
  </svg>
);
const CuffSleeveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 4h16v10l-3 6H7l-3-6Z" strokeLinejoin="round" />
    <path d="M7 20h10" />
  </svg>
);

const StraightHemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3v18M18 3v18M6 21h12" strokeLinecap="round" />
  </svg>
);
const CutworkHemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3v16M18 3v16" strokeLinecap="round" />
    <path d="M6 19q1.5 2 3 0t3 0 3 0 3 0" />
  </svg>
);
const AsymmetricHemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3v13M18 3v18" strokeLinecap="round" />
    <path d="M6 16 18 21" />
  </svg>
);

const StraightPantIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M7 3h10l1 18h-4l-2-11-2 11H6Z" strokeLinejoin="round" />
  </svg>
);
const TulipShalwarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3h12q1 9-3 10t-3-4q1 5-3 4t-3-10Z" strokeLinejoin="round" />
  </svg>
);
const PalazzoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3h5v18H8l-2-18ZM13 3h5l-2 18h-3Z" strokeLinejoin="round" />
  </svg>
);

/* How It Works step icons */
const FabricSelectIcon = () => (
  <svg viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="6" width="10" height="10" rx="1.5" />
    <rect x="14" y="6" width="10" height="10" rx="1.5" />
    <rect x="2" y="18" width="10" height="10" rx="1.5" />
    <rect x="14" y="18" width="10" height="10" rx="1.5" />
    <circle cx="46" cy="10" r="5" />
    <path d="M38 34c0-7 4-11 8-11s8 4 8 11" strokeLinecap="round" />
  </svg>
);
const DownloadCardIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="2" width="22" height="30" rx="2" />
    <path d="M9 10h12M9 15h12M9 20h8" strokeLinecap="round" />
    <circle cx="30" cy="30" r="9" style={{ fill: 'var(--accent-bright)' }} stroke="none" />
    <path d="M30 25v9M26 30l4 4 4-4" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Design library, organised by audience -> category */
const designLibrary = {
  Women: {
    Necklines: [
      { name: 'Round Neck', Icon: RoundNeckIcon, desc: 'Classic & versatile - suits most fabrics' },
      { name: 'V Neck', Icon: VNeckIcon, desc: 'Elegant, works well with lawn & lace' },
      { name: 'Boat Neck', Icon: BoatNeckIcon, desc: 'Wide neckline, great for embroidery' },
      { name: 'Mandarin Neck', Icon: MandarinNeckIcon, desc: 'Structured, formal look' },
      { name: 'Keyhole Neck', Icon: KeyholeNeckIcon, desc: 'Subtle cutout, pairs with pearls' },
      { name: 'Square Neck', Icon: SquareNeckIcon, desc: 'Modern silhouette, bold border work' },
      { name: 'Sweetheart Neck', Icon: SweetheartNeckIcon, desc: 'Soft curved dip, festive look' },
      { name: 'Collar Neck', Icon: CollarNeckIcon, desc: 'Shirt-style collar, smart casual' },
    ],
    Sleeves: [
      { name: 'Straight Sleeve', Icon: StraightSleeveIcon, desc: 'Simple, everyday wear' },
      { name: 'Bell Sleeve', Icon: BellSleeveIcon, desc: 'Flared at the end, festive feel' },
      { name: 'Rolled Sleeve', Icon: RolledSleeveIcon, desc: 'Folded cuff, casual style' },
      { name: 'Cuffed 3/4 Sleeve', Icon: CuffSleeveIcon, desc: 'Fitted cuff, formal finish' },
    ],
    'Daman Cuts': [
      { name: 'Straight Hem', Icon: StraightHemIcon, desc: 'Clean, classic finish' },
      { name: 'Cutwork Hem', Icon: CutworkHemIcon, desc: 'Scalloped lace edge' },
      { name: 'Asymmetric Hem', Icon: AsymmetricHemIcon, desc: 'High-low modern cut' },
    ],
    'Trouser Styles': [
      { name: 'Straight Pant', Icon: StraightPantIcon, desc: 'Everyday comfortable fit' },
      { name: 'Tulip Shalwar', Icon: TulipShalwarIcon, desc: 'Traditional draped style' },
      { name: 'Palazzo', Icon: PalazzoIcon, desc: 'Wide flowy silhouette' },
    ],
  },
  Men: {
    Necklines: [
      { name: 'Mandarin Neck', Icon: MandarinNeckIcon, desc: 'Classic kurta collar' },
      { name: 'Round Neck', Icon: RoundNeckIcon, desc: 'Simple, casual kurta style' },
      { name: 'Collar Neck', Icon: CollarNeckIcon, desc: 'Semi-formal shirt collar' },
    ],
    Sleeves: [
      { name: 'Straight Sleeve', Icon: StraightSleeveIcon, desc: 'Standard kurta sleeve' },
      { name: 'Cuffed Sleeve', Icon: CuffSleeveIcon, desc: 'Buttoned cuff, formal look' },
    ],
    'Kurta Styles': [
      { name: 'Straight Hem', Icon: StraightHemIcon, desc: 'Traditional straight kurta' },
      { name: 'Asymmetric Hem', Icon: AsymmetricHemIcon, desc: 'Modern side-slit kurta' },
    ],
  },
  'Baby Girl': {
    Necklines: [
      { name: 'Round Neck', Icon: RoundNeckIcon, desc: 'Soft & comfortable for daily wear' },
      { name: 'Sweetheart Neck', Icon: SweetheartNeckIcon, desc: 'Cute festive frock style' },
    ],
    Sleeves: [
      { name: 'Bell Sleeve', Icon: BellSleeveIcon, desc: 'Frilly, playful look' },
      { name: 'Rolled Sleeve', Icon: RolledSleeveIcon, desc: 'Easy everyday sleeve' },
    ],
    'Frock Styles': [
      { name: 'Straight Hem', Icon: StraightHemIcon, desc: 'Simple daily frock' },
      { name: 'Cutwork Hem', Icon: CutworkHemIcon, desc: 'Lace-trimmed party frock' },
    ],
  },
  'Baby Boy': {
    Necklines: [
      { name: 'Round Neck', Icon: RoundNeckIcon, desc: 'Comfortable everyday kurta' },
      { name: 'Mandarin Neck', Icon: MandarinNeckIcon, desc: 'Smart festive kurta collar' },
    ],
    Sleeves: [
      { name: 'Straight Sleeve', Icon: StraightSleeveIcon, desc: 'Simple, easy to wear' },
    ],
    'Kurta Styles': [
      { name: 'Straight Hem', Icon: StraightHemIcon, desc: 'Classic kids kurta cut' },
    ],
  },
};

const VISIBLE_LIMIT = 6;

export default function Design() {
  const [audience, setAudience] = useState('Women');
  const [explorerTab, setExplorerTab] = useState('Necklines');
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const tabsForAudience = Object.keys(designLibrary[audience]);
  const activeTab = tabsForAudience.includes(explorerTab) ? explorerTab : tabsForAudience[0];
  const items = designLibrary[audience][activeTab] || [];
  const visibleItems = showAll ? items : items.slice(0, VISIBLE_LIMIT);

  const handleAudienceChange = (cat) => {
    setAudience(cat);
    const firstTab = Object.keys(designLibrary[cat])[0];
    setExplorerTab(firstTab);
    setShowAll(false);
    setSelectedItem(null);
  };

  const handleTabChange = (tab) => {
    setExplorerTab(tab);
    setShowAll(false);
    setSelectedItem(null);
  };

  return (
    <div className="design-page-container">
      {/* Audience Selection */}
      <div className="audience-bar">
        {Object.keys(designLibrary).map((cat) => (
          <button
            key={cat}
            className={`audience-btn ${audience === cat ? 'active' : ''}`}
            onClick={() => handleAudienceChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Design Explorer */}
      <section className="explorer-section" id="explorer">
        <h2 className="section-title-serif">Design Explorer</h2>

        <div className="category-pills">
          {tabsForAudience.map((tab) => (
            <button
              key={tab}
              className={`pill-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="design-cards-grid">
          {visibleItems.map((item) => (
            <div
              key={item.name}
              className={`design-card ${selectedItem === item.name ? 'active' : ''}`}
              onClick={() => setSelectedItem(item.name)}
            >
              <span className="design-card-icon">
                <item.Icon />
              </span>
              <div className="design-card-label">{item.name}</div>
              <div className="design-card-desc">{item.desc}</div>
            </div>
          ))}
        </div>

        {items.length > VISIBLE_LIMIT && (
          <button className="view-all-btn" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? 'Show Less ↑' : 'View All Designs →'}
          </button>
        )}
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <h2 className="section-title-serif">How It Works</h2>

        <div className="steps-row">
          <div className="step-box">
            <span className="step-badge">1</span>
            <span className="step-icon"><FabricSelectIcon /></span>
            <h3>Select Fabric, Color &amp; Gender</h3>
            <p>Choose your favorite fabric, color and select the gender.</p>
          </div>

          <div className="step-connector" />

          <div className="step-box">
            <span className="step-badge">2</span>
            <div className="step-photo-single">
              <img src="https://images.pexels.com/photos/20792022/pexels-photo-20792022.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Sage embroidered neckline reference" />
            </div>
            <h3>Mix &amp; Match Necklines, Sleeves &amp; Daman</h3>
            <p>Explore hundreds of styles and create your perfect combination.</p>
          </div>

          <div className="step-connector" />

          <div className="step-box">
            <span className="step-badge">3</span>
            <span className="step-icon"><DownloadCardIcon /></span>
            <h3>Download Design Card to show your tailor</h3>
            <p>Get your tailor reference card and share with confidence.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
