import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findDesign, buildRows, TAILOR_TIPS } from './designData';
import { downloadDesignCard } from './downloadDesignCard';
import './DesignDetail.css';

export default function DesignDetail() {
  const { audience, slug } = useParams();
  const navigate = useNavigate();
  const design = useMemo(() => findDesign(audience, slug), [audience, slug]);

  const [imgError, setImgError] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  // Naya design khulte hi page upar se shuru ho
  useEffect(() => {
    window.scrollTo(0, 0);
    setImgError(false);
    setDownloadError('');
  }, [audience, slug]);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (!design) {
    return (
      <div className="detail-page">
        <div className="detail-missing">
          <h1>Design not found</h1>
          <p>We could not find that design. Head back and pick another one.</p>
          <button type="button" className="detail-download" onClick={goBack}>
            Back to designs
          </button>
        </div>
      </div>
    );
  }

  const rows = buildRows(design);
  const tip = TAILOR_TIPS[design.category] || TAILOR_TIPS.default;

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError('');
    try {
      await downloadDesignCard(design, rows, tip);
    } catch (err) {
      console.error(err);
      setDownloadError('Could not create the design card. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="detail-page">
      <button type="button" className="detail-back" onClick={goBack}>
        &larr; Back to designs
      </button>

      <div className="detail-layout">
        {/* Left: complete image */}
        <div className="detail-media">
          {imgError ? (
            <div className="detail-media-fallback">Photo not available</div>
          ) : (
            <img
              src={design.imageUrl}
              alt={`${design.name} - ${design.audience}`}
              className="detail-img"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Right: details */}
        <div className="detail-info">
          <span className="detail-tag">
            {design.audience} &middot; {design.category}
          </span>
          <h1 className="detail-title">{design.name}</h1>
          <p className="detail-summary">{design.summary}</p>

          <ul className="detail-rows">
            {rows.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>

          <div className="detail-tip">
            <h3>Tell your darzi</h3>
            <p>{tip}</p>
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className="detail-download"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? 'Preparing card...' : 'Download Design Card'}
            </button>
            <Link to="/design-builder" className="detail-secondary">
              Customize this look &rarr;
            </Link>
          </div>

          {downloadError && (
            <p className="detail-error" role="alert">
              {downloadError}
            </p>
          )}

          <p className="detail-hint">
            Downloads as one image with the photo and all details. Fabric and
            occasion are suggestions, your tailor can adjust them.
          </p>
        </div>
      </div>
    </div>
  );
}
