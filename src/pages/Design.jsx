import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Design.css';
import { getImage, designPath } from './designData';

/* Refined garment icons: a filled bodice/silhouette sits inside a soft
   circular badge, with the neckline drawn as a true cutout (matching the
   badge background) and a tiny stitched-flower accent at the center front -
   evokes real embroidery reference without copying anyone else's artwork. */
const Bodice = () => (
  <path
    d="M3.6 9.6C3.9 5.7 6.7 3.2 9.7 3.2H14.3C17.3 3.2 20.1 5.7 20.4 9.6L21.3 26.2H2.7Z"
    fill="#FFFFFF"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinejoin="round"
  />
);

const EmbroideryFlower = ({ cx, cy, r = 0.85 }) => (
  <g fill="var(--accent-bright)" stroke="none">
    <circle cx={cx} cy={cy - r} r={r * 0.45} opacity="0.85" />
    <circle cx={cx} cy={cy + r * 0.9} r={r * 0.45} opacity="0.85" />
    <circle cx={cx - r} cy={cy} r={r * 0.45} opacity="0.85" />
    <circle cx={cx + r} cy={cy} r={r * 0.45} opacity="0.85" />
    <circle cx={cx} cy={cy} r={r * 0.6} />
  </g>
);

const RoundNeckIcon = () => (
  <svg viewBox="0 0 24 28" fill="none">
    <Bodice />
    <path d="M7.8 4 Q12 14.5 16.2 4" fill="var(--bg-cream)" stroke="currentColor" strokeWidth="1.3" />
    <EmbroideryFlower cx={12} cy={10.6} />
  </svg>
);
const VNeckIcon = () => (
  <svg viewBox="0 0 24 28" fill="none">
    <Bodice />
    <path d="M7.5 3.8 L12 16 L16.5 3.8 Z" fill="var(--bg-cream)" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <EmbroideryFlower cx={12} cy={13} />
  </svg>
);
const BoatNeckIcon = () => (
  <svg viewBox="0 0 24 28" fill="none">
    <Bodice />
    <path d="M4.7 6 Q12 9.8 19.3 6" fill="var(--bg-cream)" stroke="currentColor" strokeWidth="1.3" />
    <EmbroideryFlower cx={12} cy={8} r={0.7} />
  </svg>
);
const MandarinNeckIcon = () => (
  <svg viewBox="0 0 24 28" fill="none">
    <Bodice />
    <path d="M8.5 5.6 Q12 7.4 15.5 5.6" fill="var(--bg-cream)" stroke="currentColor" strokeWidth="1.2" />
    <rect x="9" y="1.6" width="6" height="4.4" rx="1.2" fill="#FFFFFF" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="10.8" cy="3.9" r="0.42" fill="var(--accent-bright)" stroke="none" />
    <circle cx="13.2" cy="3.9" r="0.42" fill="var(--accent-bright)" stroke="none" />
  </svg>
);
const KeyholeNeckIcon = () => (
  <svg viewBox="0 0 24 28" fill="none">
    <Bodice />
    <path d="M7.8 4 Q12 12.3 16.2 4" fill="var(--bg-cream)" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="12" cy="15.4" r="2" fill="var(--bg-cream)" stroke="currentColor" strokeWidth="1.3" />
    <EmbroideryFlower cx={12} cy={8.3} r={0.7} />
  </svg>
);
const SquareNeckIcon = () => (
  <svg viewBox="0 0 24 28" fill="none">
    <Bodice />
    <path d="M9.2 2 V9.6 H14.8 V2" fill="var(--bg-cream)" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <EmbroideryFlower cx={12} cy={8.8} r={0.7} />
  </svg>
);
const SweetheartNeckIcon = () => (
  <svg viewBox="0 0 24 28" fill="none">
    <Bodice />
    <path
      d="M7 5 Q9.5 1.8 12 6.2 Q14.5 1.8 17 5 Q14.5 11 12 14.5 Q9.5 11 7 5 Z"
      fill="var(--bg-cream)"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <EmbroideryFlower cx={12} cy={9.3} r={0.7} />
  </svg>
);
const CollarNeckIcon = () => (
  <svg viewBox="0 0 24 28" fill="none">
    <Bodice />
    <path d="M7.5 3.6 L12 11 L16.5 3.6" fill="var(--bg-cream)" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M7.5 3.6 L10.3 5.4 M16.5 3.6 L13.7 5.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <EmbroideryFlower cx={12} cy={9} r={0.7} />
  </svg>
);

const StraightSleeveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v6l-4 12H8L4 10Z" fill="#FFFFFF" strokeLinejoin="round" />
  </svg>
);
const BellSleeveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v4L16 20H8L4 8Z" fill="#FFFFFF" strokeLinejoin="round" />
  </svg>
);
const RolledSleeveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v5H4z" fill="#FFFFFF" strokeLinejoin="round" />
    <path d="M6 9h12l-2 9H8Z" fill="#FFFFFF" strokeLinejoin="round" />
  </svg>
);
const CuffSleeveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v10l-3 6H7l-3-6Z" fill="#FFFFFF" strokeLinejoin="round" />
    <path d="M7 20h10" strokeLinecap="round" />
    <circle cx="10" cy="20.4" r="0.45" fill="var(--accent-bright)" stroke="none" />
    <circle cx="14" cy="20.4" r="0.45" fill="var(--accent-bright)" stroke="none" />
  </svg>
);

const StraightHemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3H18V21H6Z" fill="#FFFFFF" strokeLinejoin="round" />
  </svg>
);
const CutworkHemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3V17Q7.5 19.3 9 17T12 17T15 17T18 17V3Z" fill="#FFFFFF" strokeLinejoin="round" />
    <circle cx="9" cy="18.1" r="0.4" fill="var(--accent-bright)" stroke="none" />
    <circle cx="12" cy="18.1" r="0.4" fill="var(--accent-bright)" stroke="none" />
    <circle cx="15" cy="18.1" r="0.4" fill="var(--accent-bright)" stroke="none" />
  </svg>
);
const AsymmetricHemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3V16L18 21V3Z" fill="#FFFFFF" strokeLinejoin="round" />
  </svg>
);

const StraightPantIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 3h10l1 18h-4l-2-11-2 11H6Z" fill="#FFFFFF" strokeLinejoin="round" />
  </svg>
);
const TulipShalwarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3h12q1 9-3 10t-3-4q1 5-3 4t-3-10Z" fill="#FFFFFF" strokeLinejoin="round" />
  </svg>
);
const PalazzoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3h5v18H8l-2-18ZM13 3h5l-2 18h-3Z" fill="#FFFFFF" strokeLinejoin="round" />
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

/* Design ki photos aur details ab designData.js mein hain
   (getImage / DESIGN_DETAILS). Photo na mile to card mein hand-drawn icon
   dikhta hai. */

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

/* Detail page se wapas aane par wahi audience/tab dikhe (sirf is tab ke liye) */
const SAVED_AUDIENCE_KEY = 'apnatailor:explorer-audience';
const SAVED_TAB_KEY = 'apnatailor:explorer-tab';

const readSaved = (key) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const writeSaved = (key, value) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch (e) {
    /* storage band ho to koi masla nahi */
  }
};

function DesignCard({ item, audience, onOpen }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImage(audience, item.name);
  const showPhoto = imageUrl && !imgError;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      className="design-card"
      role="link"
      tabIndex={0}
      aria-label={`View ${item.name} details`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <span className="design-card-media">
        {showPhoto ? (
          <img
            src={imageUrl}
            alt={item.name}
            loading="lazy"
            onError={() => setImgError(true)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
            }}
          />
        ) : (
          <span className="design-card-icon">
            <item.Icon />
          </span>
        )}
      </span>
      <div className="design-card-body">
        <div className="design-card-label">{item.name}</div>
        <div className="design-card-desc">{item.desc}</div>
        <button
          type="button"
          className="design-card-details-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

export default function Design() {
  const navigate = useNavigate();

  const [audience, setAudience] = useState(() => {
    const saved = readSaved(SAVED_AUDIENCE_KEY);
    return saved && designLibrary[saved] ? saved : 'Women';
  });
  const [explorerTab, setExplorerTab] = useState(
    () => readSaved(SAVED_TAB_KEY) || 'Necklines'
  );
  const [showAll, setShowAll] = useState(false);

  const tabsForAudience = Object.keys(designLibrary[audience]);
  const activeTab = tabsForAudience.includes(explorerTab) ? explorerTab : tabsForAudience[0];
  const items = designLibrary[audience][activeTab] || [];
  const visibleItems = showAll ? items : items.slice(0, VISIBLE_LIMIT);

  const handleAudienceChange = (cat) => {
    const firstTab = Object.keys(designLibrary[cat])[0];
    setAudience(cat);
    setExplorerTab(firstTab);
    setShowAll(false);
    writeSaved(SAVED_AUDIENCE_KEY, cat);
    writeSaved(SAVED_TAB_KEY, firstTab);
  };

  const handleTabChange = (tab) => {
    setExplorerTab(tab);
    setShowAll(false);
    writeSaved(SAVED_TAB_KEY, tab);
  };

  const openDesign = (name) => navigate(designPath(audience, name));

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
            <DesignCard
              key={`${audience}-${item.name}`}
              item={item}
              audience={audience}
              onOpen={() => openDesign(item.name)}
            />
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
