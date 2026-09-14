import React, { useRef, useState } from 'react';
import { generateOutfitImage } from '../lib/imageGen';
import { toPng } from 'html-to-image';
import './DesignBuilder.css';

const FABRICS = ['Lawn', 'Cotton', 'Chiffon', 'Silk', 'Khaddar', 'Linen', 'Net'];
const NECKLINES = ['Round Neck', 'V Neck', 'Boat Neck', 'Mandarin Neck', 'Keyhole Neck', 'Square Neck', 'Sweetheart Neck', 'Collar Neck'];
const SLEEVES = ['Straight Sleeve', 'Bell Sleeve', 'Rolled Sleeve', 'Cuffed 3/4 Sleeve', 'Embroidered 3/4', 'Full Sleeve'];
const DAMANS = ['Straight Hem', 'Straight with Border', 'Cutwork Hem', 'Asymmetric Hem'];
const TROUSERS = ['Straight Pant', 'Tulip Shalwar', 'Palazzo', 'Cigarette Pant'];

const COLOR_SWATCHES = [
  { name: 'Ivory', hex: '#F3EAD9' },
  { name: 'Sage Green', hex: '#A8C3B8' },
  { name: 'Mustard', hex: '#D9A441' },
  { name: 'Teal', hex: '#12403B' },
  { name: 'Maroon', hex: '#7A2331' },
  { name: 'Black', hex: '#1C1C1C' },
  { name: 'Powder Blue', hex: '#AEC6D8' },
  { name: 'Blush Pink', hex: '#E7C3C0' },
];

const STEPS = [
  { key: 'fabric', label: 'Fabric & Color', num: 1 },
  { key: 'neckline', label: 'Neckline Style', num: 2 },
  { key: 'sleeves', label: 'Sleeve Design', num: 3 },
  { key: 'daman', label: 'Daman & Hemline', num: 4 },
  { key: 'trouser', label: 'Trouser / Pajama Cut', num: 5 },
];

const DEFAULT_SPEC = {
  fabric: 'Lawn',
  colorName: 'Sage Green',
  colorHex: '#A8C3B8',
  neckline: 'V Neck',
  sleeves: 'Embroidered 3/4',
  daman: 'Straight with Border',
  trouser: 'Straight Pant',
};

const DEFAULT_NOTES = [
  { label: 'Piping required on neck', checked: true },
  { label: '3-inch slit on sleeves', checked: false },
  { label: 'Embroidered border on daman', checked: false },
  { label: 'Use same thread color', checked: true },
];

/* Before the first generation, the step panel is locked and its default
   spec values haven't been deliberately chosen yet - so the prompt must be
   driven purely by what the user typed (previously the default color name
   was always baked into the prompt and would silently fight the user's own
   description, e.g. typing "white dress" while the default swatch was still
   "Sage Green" produced a green/mixed result). Once unlocked, the user has
   actively chosen the spec, so it's folded in as real intent.

   IMPORTANT: earlier wording here ("anatomically correct body... natural
   proportions") was an attempt to reduce extra-limb artifacts, but it was
   found to push the model toward bare-skin/anatomy-reference renders
   instead - including one fully undressed result. A follow-up fix put a
   long "fully covers her from neck to ankle..." clothing description FIRST
   in the prompt, which fixed the nudity but then caused the model to
   ignore the actual selected color/neckline/trouser (it rendered a plain
   white gown regardless of spec) - diffusion models weight earlier prompt
   tokens more heavily, so that preamble was drowning out the real garment
   details. The fix: put the user's actual selected style FIRST (what they
   care about and what should dominate), keep the safety requirement short
   and at the end (still effective, just no longer competing for priority).
   Don't move the safety tail back to the front without re-verifying both
   coverage AND spec-adherence in the actual output.

   FACE QUALITY: a headless mannequin/dress-form composition was tried
   to sidestep face artifacts entirely, but the user explicitly wants a
   real-looking woman modeling the outfit (not a faceless mannequin) -
   that was a worse trade-off than occasional face imperfections, so
   this reverted to a human model with reinforced face-quality wording
   (symmetrical features, detailed eyes, no distortion) and a higher
   960x1280 -> 1080x1440 render resolution (more pixels for the face,
   which is a small fraction of a full-body shot). This won't be
   perfect on every single generation - it's a free, non-upscaled model
   - but was clearly reliable across repeated tests. If a specific
   generation still comes out wrong, regenerating (new seed) is the
   fix, same as any AI image tool. */
function buildPrompt(description, spec, view, useSpec) {
  const subject = useSpec
    ? `A woman wearing a ${spec.colorName} ${spec.fabric} shalwar kameez with a ${spec.neckline}, ${spec.sleeves} sleeves, a ${spec.daman} hemline, and ${spec.trouser} trousers.${description ? ` ${description}.` : ''}`
    : `A woman wearing: ${description}.`;
  const style = `Professional fashion catalog photo, ${view}, full body shot, standing pose, solo, only one person in frame, bright soft even studio lighting on a warm neutral background, sharp focus, symmetrical natural human face, natural minimal everyday makeup, clean even skin tone, no makeup smudges or asymmetric shadows on the face, detailed eyes and eyebrows, relaxed natural expression, no facial distortion or blur, professional portrait-quality face rendering, photorealistic, high resolution, 8k quality.`;
  const safety = 'Fully clothed with no bare skin except hands, feet and face, modest, family-friendly, no swimwear, no lingerie.';
  return `${subject} ${style} ${safety}`.trim();
}

export default function DesignBuilder() {
  const [description, setDescription] = useState('');
  const [spec, setSpec] = useState(DEFAULT_SPEC);
  const [images, setImages] = useState({ front: null, back: null });
  const [view, setView] = useState('front');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const [unlocked, setUnlocked] = useState(false);
  const [triggerSource, setTriggerSource] = useState(null); // 'top' | 'card' - which button's label shows "Generating…"
  const cardRef = useRef(null);

  const updateSpec = (key, value) => setSpec((prev) => ({ ...prev, [key]: value }));

  const handleGenerate = async (source) => {
    if (loading) return;
    setLoading(true);
    setTriggerSource(source);
    setErrorMsg('');
    const seed = Date.now() % 2147483647;
    try {
      const front = await generateOutfitImage(buildPrompt(description, spec, 'front view, facing camera', unlocked), seed);
      const back = await generateOutfitImage(buildPrompt(description, spec, 'back view, facing away from camera', unlocked), seed + 1);
      setImages({ front, back });
      setView('front');
      setUnlocked(true);
      setDescription('');
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong while generating your design.');
    } finally {
      setLoading(false);
    }
  };

  const toggleNote = (idx) => {
    setNotes((prev) => prev.map((n, i) => (i === idx ? { ...n, checked: !n.checked } : n)));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'apnatailor-design-card.png';
    link.href = dataUrl;
    link.click();
  };

  const activeImage = images[view];

  return (
    <div className="builder-page">
      <div className="builder-intro">
        <span className="builder-eyebrow">Try Our</span>
        <h1>Stitching Studio</h1>
        <p>Design your outfit step-by-step using our interactive builder and get a professional design card.</p>
      </div>

      <div className="ai-generator-bar">
        <span className="ai-generator-badge">✨ Real-Time AI Stitching Studio Generator</span>
        <div className="ai-generator-row">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your design (e.g. Ivory Lawn suit with pink embroidery on neck and sleeves)..."
          />
          <button onClick={() => handleGenerate('top')} disabled={loading || !description.trim()}>
            {loading && triggerSource === 'top' ? 'Generating…' : 'Generate with AI'}
          </button>
        </div>
        {errorMsg && <p className="ai-generator-error">{errorMsg}</p>}
      </div>

      <div className="studio-grid">
        {/* Steps column */}
        <div className={`studio-panel steps-panel ${!unlocked ? 'locked' : ''}`}>
          {!unlocked && (
            <div className="steps-lock-hint">
              <span className="steps-lock-icon">🔒</span>
              Generate a design above first to unlock customization
            </div>
          )}
          {STEPS.map((step) => (
            <div className="step-block" key={step.key}>
              <div className="step-heading">
                <span className="step-num">{step.num}</span>
                <span>{step.label}</span>
              </div>

              {step.key === 'fabric' ? (
                <>
                  <select value={spec.fabric} disabled={!unlocked} onChange={(e) => updateSpec('fabric', e.target.value)}>
                    {FABRICS.map((f) => <option key={f}>{f}</option>)}
                  </select>
                  <div className="color-swatch-row">
                    {COLOR_SWATCHES.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        disabled={!unlocked}
                        aria-label={c.name}
                        className={`color-swatch ${spec.colorHex === c.hex ? 'active' : ''}`}
                        style={{ background: c.hex }}
                        onClick={() => setSpec((prev) => ({ ...prev, colorHex: c.hex, colorName: c.name }))}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <select
                  value={spec[step.key]}
                  disabled={!unlocked}
                  onChange={(e) => updateSpec(step.key, e.target.value)}
                >
                  {(step.key === 'neckline' ? NECKLINES
                    : step.key === 'sleeves' ? SLEEVES
                    : step.key === 'daman' ? DAMANS
                    : TROUSERS
                  ).map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              )}
            </div>
          ))}

          <button className="card-generate-btn" onClick={() => handleGenerate('card')} disabled={!unlocked || loading || !!description.trim()}>
            {loading && triggerSource === 'card' ? 'Generating…' : '✨ Generate with AI'}
          </button>
          {unlocked && description.trim() && (
            <p className="card-generate-hint">Clear the description above to regenerate using your selected styles.</p>
          )}
        </div>

        {/* Preview column */}
        <div className="studio-panel preview-panel">
          <div className="preview-frame">
            {activeImage && !loading && (
              <img src={activeImage} alt={`Generated ${view} view design`} />
            )}
            {loading && (
              <div className="preview-state preview-state-overlay">
                <span className="preview-spinner" />
                <p>Generating your {view} view…</p>
              </div>
            )}
            {!activeImage && !loading && (
              <div className="preview-state">
                <p>Describe your design above and click <strong>Generate with AI</strong> to see it here.</p>
              </div>
            )}
          </div>
          <div className="view-toggle-row">
            <button
              className={view === 'front' ? 'active' : ''}
              onClick={() => setView('front')}
              disabled={!images.front}
            >
              Front View
            </button>
            <button
              className={view === 'back' ? 'active' : ''}
              onClick={() => setView('back')}
              disabled={!images.back}
            >
              Back View
            </button>
          </div>
        </div>

        {/* Design card column */}
        <div className="studio-panel card-panel">
          <div className="design-card-export" ref={cardRef}>
            <h3>Downloadable Design Card</h3>

            <div className="card-thumb">
              {images.front && images.back ? (
                <>
                  <div className="card-thumb-half">
                    <img src={images.front} alt="Front view" />
                    <span className="card-thumb-label">Front</span>
                  </div>
                  <div className="card-thumb-half">
                    <img src={images.back} alt="Back view" />
                    <span className="card-thumb-label">Back</span>
                  </div>
                </>
              ) : activeImage ? (
                <img src={activeImage} alt="Design thumbnail" />
              ) : (
                <div className="card-thumb-empty">No design generated yet</div>
              )}
            </div>

            <ul className="card-spec-list">
              <li><span>Fabric</span><strong>{spec.fabric}</strong></li>
              <li>
                <span>Color</span>
                <strong className="card-color-value">
                  <span className="card-color-dot" style={{ background: spec.colorHex }} />
                  {spec.colorHex}
                </strong>
              </li>
              <li><span>Neckline</span><strong>{spec.neckline}</strong></li>
              <li><span>Sleeves</span><strong>{spec.sleeves}</strong></li>
              <li><span>Daman</span><strong>{spec.daman}</strong></li>
              <li><span>Trouser</span><strong>{spec.trouser}</strong></li>
            </ul>

            <div className="card-notes">
              <h4>Notes for Tailor</h4>
              {notes.map((note, i) => (
                <label className="card-note-item" key={note.label}>
                  <input type="checkbox" checked={note.checked} onChange={() => toggleNote(i)} />
                  {note.label}
                </label>
              ))}
            </div>
          </div>

          <button className="download-card-btn" onClick={handleDownload} disabled={!activeImage}>
            &darr; Download Design Card
          </button>
        </div>
      </div>
    </div>
  );
}
