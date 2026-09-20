export async function generateOutfitImage(prompt, seed, retries = 3) {
  const url = `/api/generate-image?prompt=${encodeURIComponent(prompt)}&seed=${seed}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url);

    if (res.ok) {
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    }

    if (res.status === 429 && attempt < retries) {
      const waitTime = 2000 * (attempt + 1); // 2s, 4s, 6s...
      await new Promise((r) => setTimeout(r, waitTime));
      continue;
    }

    throw new Error(`Image generation failed (${res.status}). Please try again.`);
  }
}