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
  gender: 'Women',
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
   fix, same as any AI image tool.

   GENDER BUG: this used to hardcode "A woman wearing..." unconditionally
   - so typing "design for a man" in the free-text box still rendered a
   woman, because the literal word "woman" led the prompt and diffusion
   models weight earlier tokens most heavily (same lesson as the safety-
   tail fix above). First fix: an explicit Gender toggle plus keyword
   detection (man/woman/boy/girl...) in the free text. Then real user
   feedback: "I shouldn't have to say man/woman OR touch a toggle - other
   AI tools just understand the prompt." Other tools manage this by NOT
   wrapping your words in a template at all - they hand the model your
   own description and let its own training-data associations (a
   sherwani reads as menswear, a lehnga as womenswear) do the work.
   This app forces a template because the STRUCTURED spec panel (steps
   2-5) is built entirely from women's-fashion terms (sweetheart neck,
   bell sleeve, palazzo...) and needs an explicit subject to stay
   coherent - so once useSpec is true, gender must be a real, resolved
   choice (spec.gender, defaulting Women). But the free-text-only path
   (before that panel is unlocked) has no such constraint, so it now
   only forces a gender when the description itself gives a real signal
   - either an explicit word (man/woman/groom/bride...) or a garment
   term that's unambiguously one gender in Pakistani fashion (sherwani,
   lehnga...) - and otherwise passes the description through with no
   imposed "A man/woman" wrapper at all, exactly like handing the words
   straight to any other image model and letting it read "kurta" or
   "suit" however it was trained to. The garment-term list only covers
   the common, unambiguous cases; it isn't meant to be exhaustive. */
function detectGenderKeyword(description) {
  if (!description) return null;
  if (/\b(man|men|boy|boys|male|groom|husband|gentleman)\b/i.test(description)) return 'Men';
  if (/\b(woman|women|girl|girls|female|bride|lady)\b/i.test(description)) return 'Women';
  if (/\b(sherwani|waistcoat|achkan|pathani suit|nehru jacket)\b/i.test(description)) return 'Men';
  if (/\b(lehenga|lehnga|saree|sari|anarkali|gharara|choli)\b/i.test(description)) return 'Women';
  return null;
}

function buildPrompt(description, spec, view, useSpec) {
  // useSpec: the structured panel always has a concrete gender (defaults
  // Women, or whatever was picked after unlocking). Free-text only:
  // stay unresolved (null) unless the description itself says so, so
  // the raw words - "sherwani", "lehnga", "groom" - reach the model
  // exactly as typed and its own training associations do the work,
  // same as typing into any other AI image tool with no gender toggle.
  const gender = useSpec ? spec.gender : detectGenderKeyword(description);
  const genderSubject = gender === 'Men' ? 'A man' : gender === 'Women' ? 'A woman' : null;
  const garmentTerm = gender === 'Men' ? 'kurta shalwar' : 'shalwar kameez';
  const subject = useSpec
    ? `${genderSubject} wearing a ${spec.colorName} ${spec.fabric} ${garmentTerm} with a ${spec.neckline}, ${spec.sleeves} sleeves, a ${spec.daman} hemline, and ${spec.trouser} trousers.${description ? ` ${description}.` : ''}`
    : (genderSubject ? `${genderSubject} wearing: ${description}.` : `${description}.`);
  const faceStyle = gender === 'Women'
    ? 'symmetrical natural human face, natural minimal everyday makeup, clean even skin tone, no makeup smudges or asymmetric shadows on the face, detailed eyes and eyebrows, relaxed natural expression, no facial distortion or blur, professional portrait-quality face rendering'
    : 'symmetrical natural human face, natural skin texture, no facial distortion or blur, relaxed natural expression, professional portrait-quality face rendering';
  /* Framing: switched the image backend from Pollinations (free tier
     silently used a fast/low-detail LCM model, hard-capped at ~665x886 -
     see vite.config.js's pollinationsProxy comments for that whole
     investigation) to Hugging Face's FLUX.1-schnell, a real Flux model
     at 768x1024. Kept the three-quarter (head-to-knee, not head-to-feet)
     framing from the Pollinations era anyway - giving the face more of
     the frame only helps, never hurts, and the daman/trouser cut is
     already spelled out as text on the design card (Fabric/Color/
     Neckline/Sleeves/Daman/Trouser list), so nothing the tailor needs is
     actually missing from the photo, just not shown twice. */
  const style = `Professional fashion catalog photo, ${view}, three-quarter length shot from the head to the knee (not full body, not showing the feet), tightly framed with minimal empty space around the subject, person fills most of the frame, standing pose, solo, only one person in frame, bright soft even studio lighting on a warm neutral background, sharp focus, ${faceStyle}, photorealistic, high resolution, 8k quality.`;
  const safety = 'Fully clothed with no bare skin except hands, feet and face, modest, family-friendly, no swimwear, no lingerie.';
  return `${subject} ${style} ${safety}`.trim();
}

export default function DesignBuilder() {
  const [description, setDescription] = useState('');
  const [lastDescription, setLastDescription] = useState(''); // preserved after the input clears, so "Regenerate" can retry the exact same description with a fresh random attempt
  const [spec, setSpec] = useState(DEFAULT_SPEC);
  const [images, setImages] = useState({ front: null, back: null });
  const [view, setView] = useState('front');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const [unlocked, setUnlocked] = useState(false);
  const [triggerSource, setTriggerSource] = useState(null); // 'top' | 'card' | 'regenerate' - which button's label shows "Generating…"
  const cardRef = useRef(null);

  const updateSpec = (key, value) => setSpec((prev) => ({ ...prev, [key]: value }));

  /* activeDescription lets the Regenerate button reuse the description
     from the last successful generation even though the visible input
     was cleared after that generation - see lastDescription above. The
     free Pollinations backend (see buildPrompt's comments) has real,
     hard ceilings - fixed low resolution, a fast/low-detail model with
     no way to request more steps - that no prompt wording can lift.
     Given that, "generate, then regenerate a few times until a result
     looks good" is the actual, honest workflow on this free tier - each
     attempt uses a fresh random seed, so a bad face/mismatched back view
     isn't final, just one random draw. */
  const handleGenerate = async (source, activeDescription = description) => {
    if (loading) return;
    setLoading(true);
    setTriggerSource(source);
    setErrorMsg('');
    const seed = Date.now() % 2147483647;
    /* No gender control exists anywhere in the UI (removed per user
       feedback - it should "just understand," like any other AI tool).
       The only moment gender is ever inferable is this first, free-text
       generation (buildPrompt's own detectGenderKeyword reads the raw
       description). Once unlocked, later spec-driven regenerations
       carry no description text (it's required empty to enable that
       button) - so whatever was inferred here is captured into spec.gender
       now and silently carried forward, instead of quietly resetting to
       the DEFAULT_SPEC's 'Women' on every subsequent regenerate. */
    if (!unlocked) {
      const inferred = detectGenderKeyword(activeDescription);
      if (inferred) setSpec((prev) => ({ ...prev, gender: inferred }));
    }
    try {
      const front = await generateOutfitImage(buildPrompt(activeDescription, spec, 'front view, facing camera', unlocked), seed);
      const back = await generateOutfitImage(buildPrompt(activeDescription, spec, 'back view, facing away from camera', unlocked), seed + 1);
      setImages({ front, back });
      setView('front');
      setUnlocked(true);
      setLastDescription(activeDescription);
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
          {unlocked && (
            <button
              className="regenerate-btn"
              onClick={() => handleGenerate('regenerate', lastDescription)}
              disabled={loading}
            >
              {loading && triggerSource === 'regenerate' ? 'Generating…' : '↻ Regenerate'}
            </button>
          )}
          {unlocked && (
            <p className="regenerate-hint">Face or details not quite right? Each attempt is a fresh try - regenerate until it looks right.</p>
          )}
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
