import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { trendingDesigns, inspirationSites } from './trendingDesigns';
import './TrendingStyles.css';

function TrendingCard({ design }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    setError(false);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = `${design.name.replace(/\s+/g, '-')}-design-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Design card export failed:', err);
      setError(true);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="trending-card">
      <div className="trending-card-export" ref={cardRef}>
        <img src={design.image} alt={design.name} className="trending-card-img" crossOrigin="anonymous" />
        <div className="trending-card-body">
          <h3>{design.name}</h3>
          <ul className="trending-spec-list">
            <li><span>Fabric</span><strong>{design.fabric}</strong></li>
            <li><span>Neckline</span><strong>{design.neckline}</strong></li>
            <li><span>Sleeves</span><strong>{design.sleeves}</strong></li>
            <li><span>Daman</span><strong>{design.daman}</strong></li>
            <li><span>Color</span><strong>{design.color}</strong></li>
          </ul>
        </div>
      </div>
      <button className="trending-download-btn" onClick={handleDownload} disabled={downloading}>
        {downloading ? 'Preparing…' : '↓ Download Design Card'}
      </button>
      {error && <p className="trending-download-error">Couldn&apos;t prepare the card - please try again.</p>}
    </div>
  );
}

export default function TrendingStyles() {
  return (
    <div className="trending-page-container">
      <div className="trending-header">
        <h2 className="section-title-serif">Trending Styles</h2>
        <p>Browse designs other users love. Download any card to show your tailor.</p>
      </div>

      <div className="trending-grid">
        {trendingDesigns.map((design) => (
          <TrendingCard key={design.id} design={design} />
        ))}
      </div>

      {/* Honest, legal way to give users "more free designs" - we link
          out to real free galleries instead of copying their content. */}
      <div className="inspiration-section">
        <h3 className="inspiration-title">Explore More Free Design Inspiration</h3>
        <p className="inspiration-subtitle">
          These outside sites offer thousands of free embroidery, lace and
          outfit designs you can browse for more ideas.
        </p>
        <div className="inspiration-links">
          {inspirationSites.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inspiration-card"
            >
              <h4>{site.name}</h4>
              <p>{site.note}</p>
              <span className="inspiration-visit">Visit site &rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
