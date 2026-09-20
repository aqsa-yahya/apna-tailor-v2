import { InferenceClient } from '@huggingface/inference';

/* The Netlify equivalent of the local-dev-only proxy in vite.config.js
   (huggingFaceProxy) - that one only runs inside "npm run dev" and has
   no effect on the deployed site (a Vite production build is static
   files with no Node server attached). This function is what actually
   makes "Generate with AI" work on the live site: Netlify runs it as a
   real serverless function, and netlify.toml redirects the same
   /api/generate-image path the client already calls (src/lib/imageGen.js
   was never touched) to this function, so no client code needed to
   change.

   HUGGINGFACE_API_TOKEN must be set in Netlify's dashboard - Site
   settings > Environment variables - NEVER committed to the repo. Needs
   a token with the "Inference Providers" permission (not a generic
   "Read" token), from https://huggingface.co/settings/tokens. */
export async function handler(event) {
  const prompt = event.queryStringParameters?.prompt;
  const seed = event.queryStringParameters?.seed || String(Date.now());

  if (!prompt) {
    return { statusCode: 400, body: 'Missing "prompt" query param' };
  }

  const token = process.env.HUGGINGFACE_API_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      body: 'Missing HUGGINGFACE_API_TOKEN - set it in Netlify Site settings > Environment variables, then redeploy',
    };
  }

  try {
    const client = new InferenceClient(token);
    /* provider is pinned to "nscale" on purpose - leaving it unset lets
       the client auto-pick "the first provider available... sorted by
       the user's order in hf.co/settings/inference-providers", which is
       PER-ACCOUNT. On this project's own accounts that always resolved
       to nscale and worked; on Aqsa's account it resolved to fal-ai
       instead, which failed with "Authentication is required to access
       this application" - fal-ai needs its own separate authorization
       linked on huggingface.co/settings/inference-providers, distinct
       from the token itself having "Inference Providers" permission.
       Pinning nscale removes that account-dependent guesswork entirely. */
    const blob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      provider: 'nscale',
      inputs: prompt,
      parameters: { width: 768, height: 1024, seed: Number(seed) % 2147483647 },
    });
    const buffer = Buffer.from(await blob.arrayBuffer());
    return {
      statusCode: 200,
      headers: { 'Content-Type': blob.type || 'image/png' },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error('Hugging Face image function error:', err.message);
    return { statusCode: 502, body: 'Image proxy error: ' + err.message };
  }
}
