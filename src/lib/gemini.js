const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash-image';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export function hasGeminiKey() {
  return Boolean(API_KEY);
}

/* Pulls the first inline image part out of a generateContent response.
   Google's REST JSON has used both snake_case and camelCase for this field
   across model versions, so both are checked defensively. */
function extractImageDataUrl(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      const mime = inline.mimeType || inline.mime_type || 'image/png';
      return `data:${mime};base64,${inline.data}`;
    }
  }
  return null;
}

/**
 * Generates one outfit preview image from a text prompt.
 * Throws with a readable message on any failure (missing key, HTTP error,
 * no image in the response) so the caller can show it to the user.
 */
export async function generateOutfitImage(prompt) {
  if (!API_KEY) {
    throw new Error('Missing Gemini API key. Add VITE_GEMINI_API_KEY to .env.local and restart the dev server.');
  }

  const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
    }),
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const errBody = await res.json();
      detail = errBody?.error?.message || detail;
    } catch {
      /* response wasn't JSON - keep statusText */
    }
    throw new Error(`Gemini API error (${res.status}): ${detail}`);
  }

  const data = await res.json();
  const image = extractImageDataUrl(data);
  if (!image) {
    throw new Error('Gemini did not return an image for this prompt. Try describing the outfit differently.');
  }
  return image;
}
