import React from 'react';
import { trendingDesigns, inspirationSites } from './trendingDesigns';
import './TrendingStyles.css';

export default function TrendingStyles() {
  return (
    <div className="trending-page-container">
      <div className="trending-header">
        <h2 className="section-title-serif">Trending Styles</h2>
        <p>Browse designs other users love. Download any card to show your tailor.</p>
      </div>

      <div className="trending-grid">
        {trendingDesigns.map((design) => (
          <div key={design.id} className="trending-card">
            <img src={design.image} alt={design.name} className="trending-card-img" />
            <div className="trending-card-body">
              <h3>{design.name}</h3>
              <ul className="trending-spec-list">
                <li><span>Fabric</span><strong>{design.fabric}</strong></li>
                <li><span>Neckline</span><strong>{design.neckline}</strong></li>
                <li><span>Sleeves</span><strong>{design.sleeves}</strong></li>
                <li><span>Daman</span><strong>{design.daman}</strong></li>
                <li><span>Color</span><strong>{design.color}</strong></li>
              </ul>
              <a
                href={design.image}
                download={`${design.name.replace(/\s+/g, '-')}.jpg`}
                className="trending-download-btn"
              >
                ↓ Download Design Card
              </a>
            </div>
          </div>
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
