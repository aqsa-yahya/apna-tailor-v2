/* ==========================================================================
   downloadDesignCard.js
   Design ki photo (left) + saari details (right) ko ek hi PNG image mein
   bana kar download karwata hai. Koi extra library nahi chahiye.
   ========================================================================== */

import { slugify } from './designData';

const CREAM = '#F6F4EF';
const GREEN = '#12403B';
const GOLD = '#C98B3C';
const GOLD_DARK = '#A9702A';
const TEXT = '#1B2B28';
const MUTED = '#5C6B66';
const LINE = '#D5DBD5';
const TIP_BG = '#E8EFEA';
const TAG_BG = '#E1E9E4';

const SERIF = '"Playfair Display", Georgia, "Times New Roman", serif';
const SANS = 'Inter, "Segoe UI", Arial, sans-serif';

const RIGHT_W = 720;
const MIN_H = 1000;
const SCALE = 2; // 2x taake image sharp aaye

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load image: ${src}`));
    img.src = src;
  });
}

/* Text ko maxWidth ke hisaab se lines mein todta hai */
function wrap(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* Image ko box mein cover karke draw karta hai */
function drawCover(ctx, img, x, y, w, h) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (img.naturalWidth - sw) / 2;
  const sy = (img.naturalHeight - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/* Right panel. draw=false par sirf naap leta hai (height nikalne ke liye)
   aur end y return karta hai. */
function layoutRight(ctx, x0, design, rows, tip, draw) {
  const PAD = 56;
  const x = x0 + PAD;
  const innerW = RIGHT_W - PAD * 2;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  let y = 56;

  // Brand
  ctx.font = `700 34px ${SERIF}`;
  if (draw) {
    ctx.fillStyle = GREEN;
    ctx.fillText('apna', x, y);
    const w = ctx.measureText('apna').width;
    ctx.fillStyle = GOLD;
    ctx.fillText('tailor.', x + w, y);
  }
  y += 74;

  // Tag pill: "Women · Neckline"
  const tag = `${design.audience} · ${design.category}`;
  ctx.font = `600 18px ${SANS}`;
  const tagW = ctx.measureText(tag).width + 32;
  if (draw) {
    ctx.fillStyle = TAG_BG;
    roundRect(ctx, x, y, tagW, 36, 18);
    ctx.fill();
    ctx.fillStyle = GREEN;
    ctx.fillText(tag, x + 16, y + 9);
  }
  y += 64;

  // Title
  ctx.font = `700 56px ${SERIF}`;
  wrap(ctx, design.name, innerW).forEach((line) => {
    if (draw) {
      ctx.fillStyle = GREEN;
      ctx.fillText(line, x, y);
    }
    y += 66;
  });
  y += 4;

  // Summary
  ctx.font = `400 22px ${SANS}`;
  wrap(ctx, design.summary, innerW).forEach((line) => {
    if (draw) {
      ctx.fillStyle = MUTED;
      ctx.fillText(line, x, y);
    }
    y += 32;
  });
  y += 20;

  // Divider
  if (draw) {
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + innerW, y);
    ctx.stroke();
  }
  y += 26;

  // Detail rows
  const LABEL_W = 190;
  rows.forEach(([label, value]) => {
    ctx.font = `600 22px ${SANS}`;
    const lines = wrap(ctx, value, innerW - LABEL_W);
    if (draw) {
      ctx.font = `500 20px ${SANS}`;
      ctx.fillStyle = MUTED;
      ctx.fillText(label, x, y + 2);
      ctx.font = `600 22px ${SANS}`;
      ctx.fillStyle = TEXT;
      lines.forEach((l, i) => ctx.fillText(l, x + LABEL_W, y + i * 32));
    }
    y += lines.length * 32 + 12;
    if (draw) {
      ctx.strokeStyle = LINE;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + innerW, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    y += 16;
  });

  // "Tell your darzi" box
  y += 14;
  const BOX_PAD = 26;
  ctx.font = `400 21px ${SANS}`;
  const tipLines = wrap(ctx, tip, innerW - BOX_PAD * 2);
  const boxH = BOX_PAD * 2 + 34 + tipLines.length * 32;
  if (draw) {
    ctx.fillStyle = TIP_BG;
    roundRect(ctx, x, y, innerW, boxH, 16);
    ctx.fill();
    ctx.font = `700 20px ${SANS}`;
    ctx.fillStyle = GOLD_DARK;
    ctx.fillText('Tell your darzi', x + BOX_PAD, y + BOX_PAD);
    ctx.font = `400 21px ${SANS}`;
    ctx.fillStyle = TEXT;
    tipLines.forEach((l, i) => ctx.fillText(l, x + BOX_PAD, y + BOX_PAD + 34 + i * 32));
  }
  y += boxH;

  return y;
}

export async function downloadDesignCard(design, rows, tip) {
  // Fonts load hone ka wait (taake card mein wahi fonts aayein jo site par hain)
  if (document.fonts) {
    try {
      await Promise.all([
        document.fonts.load(`700 56px "Playfair Display"`),
        document.fonts.load(`600 22px Inter`),
      ]);
      await document.fonts.ready;
    } catch (e) {
      /* fonts na milen to fallback fonts chal jayenge */
    }
  }

  let img = null;
  try {
    img = await loadImage(design.imageUrl);
  } catch (e) {
    img = null; // photo na mile to bhi card ban jayega
  }

  // Pehle right panel naap kar total height nikalo
  const measureCtx = document.createElement('canvas').getContext('2d');
  const contentEnd = layoutRight(measureCtx, 0, design, rows, tip, false);
  const H = Math.max(MIN_H, Math.ceil(contentEnd + 110));

  // Left panel ki width image ke shape ke hisaab se, taake poori image aaye
  let leftW = 820;
  if (img) {
    const ratio = img.naturalWidth / img.naturalHeight;
    leftW = Math.min(1000, Math.max(640, Math.round(H * ratio)));
  }
  const W = leftW + RIGHT_W;

  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);
  ctx.imageSmoothingQuality = 'high';

  // Background
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);

  // Left: photo
  if (img) {
    drawCover(ctx, img, 0, 0, leftW, H);
  } else {
    ctx.fillStyle = TAG_BG;
    ctx.fillRect(0, 0, leftW, H);
    ctx.fillStyle = MUTED;
    ctx.font = `500 26px ${SANS}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Photo not available', leftW / 2, H / 2);
  }

  // Right: details
  layoutRight(ctx, leftW, design, rows, tip, true);

  // Footer
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `500 18px ${SANS}`;
  ctx.fillStyle = MUTED;
  ctx.fillText('Design card by ApnaTailor - show this to your tailor', leftW + 56, H - 62);

  // Download
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Could not create the image file');

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `apnatailor-${slugify(design.audience)}-${design.slug}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
