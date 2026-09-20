import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { execFile } from 'node:child_process'

/* Pollinations.ai's authenticated gen.pollinations.ai endpoint requires
   account pollen balance, which this account doesn't have yet (402
   Insufficient balance). Using the free/anonymous image.pollinations.ai
   endpoint instead - no key or balance required. A plain server-to-server
   request also avoids the "Missing Turnstile token" browser bot-check.

   Node's own fetch() to this host was found to fail consistently on this
   machine (UND_ERR_CONNECT_TIMEOUT, 100% of attempts, retries included),
   while `curl` to the exact same URL succeeds every time - pointing to
   something on this machine (likely antivirus/firewall) specifically
   blocking node.exe's outbound connections rather than Node code or
   Pollinations being at fault. Shelling out to curl sidesteps that. */
function curlOnce(url) {
  return new Promise((resolve, reject) => {
    execFile(
      'curl',
      [
        '-s', '-w', '\n%{http_code}',
        '--max-time', '30',
        '--retry', '3', '--retry-delay', '1', '--retry-all-errors',
        url,
      ],
      { encoding: 'buffer', maxBuffer: 20 * 1024 * 1024 },
      (err, stdout) => {
        if (err) return reject(err)
        // The trailing "\n<status>" appended by -w is ASCII, safe to
        // split off the end of the buffer without corrupting binary data.
        const text = stdout.toString('latin1')
        const nl = text.lastIndexOf('\n')
        const status = parseInt(text.slice(nl + 1), 10)
        const body = stdout.subarray(0, nl)
        resolve({ status, body })
      }
    )
  })
}

/* curl's own --retry handles transient HTTP/connection errors within one
   process invocation; this outer loop is a second safety net for the rarer
   case where the curl process itself fails to complete (observed once in
   testing on this machine's flaky connection, succeeding again moments
   later with the identical command). */
async function curlFetch(url, attempts = 2) {
  let lastErr
  for (let i = 0; i < attempts; i++) {
    try {
      return await curlOnce(url)
    } catch (err) {
      lastErr = err
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
  throw lastErr
}

/* Switched from Pollinations (pollinationsProxy below, kept for
   reference) to Hugging Face's free Inference Providers running
   black-forest-labs/FLUX.1-schnell - a genuine Flux model, unlike
   Pollinations' free tier which silently substitutes a fast/low-detail
   LCM model no matter what you ask for (see pollinationsProxy's
   comments for that whole investigation).

   Hand-rolling this as a raw HTTP call (the way pollinationsProxy talks
   to Pollinations) was tried first and abandoned: Hugging Face's old
   api-inference.huggingface.co host is gone entirely (DNS doesn't even
   resolve), and its replacement - router.huggingface.co - routes each
   model to a DIFFERENT backend provider (nscale, fal-ai, wavespeed...),
   each with its own URL shape and request/response format (confirmed by
   reading each provider's source in huggingface.js). Guessing at the
   right one per model is fragile and would break the moment HF's
   routing changes. The official @huggingface/inference client handles
   all of that provider routing internally and is what HF itself
   documents - use it instead of reverse-engineering the wire format.

   Unlike Pollinations, Node's own fetch() (which this client uses
   internally) was directly verified to work fine against
   huggingface.co/router.huggingface.co on this machine - no curl
   workaround needed here (the earlier fetch() failures were specific to
   image.pollinations.ai, not a blanket problem on this machine).

   Requires a free Hugging Face account + an access token with the
   "Inference Providers" permission (NOT a generic "Read" token) from
   https://huggingface.co/settings/tokens, set as HUGGINGFACE_API_TOKEN
   in .env.local (no VITE_ prefix - it must stay server-side only, never
   bundled into client JS where any site visitor could read it out of
   devtools/network requests). */
function huggingFaceProxy(token) {
  return {
    name: 'huggingface-image-proxy',
    configureServer(server) {
      let client = null
      server.middlewares.use('/api/generate-image', async (req, res) => {
        const url = new URL(req.url, 'http://localhost')
        const prompt = url.searchParams.get('prompt')
        const seed = url.searchParams.get('seed') || String(Date.now())
        if (!prompt) {
          res.statusCode = 400
          res.end('Missing "prompt" query param')
          return
        }
        if (!token) {
          res.statusCode = 500
          res.end('Missing HUGGINGFACE_API_TOKEN - add a token with "Inference Providers" permission from https://huggingface.co/settings/tokens to .env.local and restart the dev server')
          return
        }
        try {
          if (!client) {
            const { InferenceClient } = await import('@huggingface/inference')
            client = new InferenceClient(token)
          }
          // provider pinned to 'nscale' - see the matching comment in
          // netlify/functions/generate-image.js for why 'auto' is unsafe
          // (it resolves differently per Hugging Face account).
          const blob = await client.textToImage({
            model: 'black-forest-labs/FLUX.1-schnell',
            provider: 'nscale',
            inputs: prompt,
            parameters: { width: 768, height: 1024, seed: Number(seed) % 2147483647 },
          })
          const buffer = Buffer.from(await blob.arrayBuffer())
          res.statusCode = 200
          res.setHeader('Content-Type', blob.type || 'image/png')
          res.end(buffer)
        } catch (err) {
          console.error('Hugging Face image proxy error:', err.message)
          res.statusCode = 502
          res.end('Image proxy error: ' + err.message)
        }
      })
    },
  }
}

function pollinationsProxy() {
  return {
    name: 'pollinations-image-proxy',
    configureServer(server) {
      server.middlewares.use('/api/generate-image', async (req, res) => {
        const url = new URL(req.url, 'http://localhost')
        const prompt = url.searchParams.get('prompt')
        const seed = url.searchParams.get('seed') || String(Date.now())
        if (!prompt) {
          res.statusCode = 400
          res.end('Missing "prompt" query param')
          return
        }
        /* `enhance=true` (lets Pollinations' AI rewrite the prompt) was
           tried and reverted - it discarded the actual requested fabric/
           color/style entirely and, once, produced an undressed back view.
           `safe=true` is kept on instead as a real safety net: Pollinations
           errors out rather than silently returning inappropriate content,
           which matters given this app's "modest and tasteful" requirement.

           RESOLUTION: verified directly against the API (bypassing this
           app entirely) that the free/anonymous tier hard-caps output at
           665x886 - requesting 1080x1440, 960x1280 or 768x1024 all come
           back as the exact same 665x886 image, byte-for-byte identical.
           Every earlier "raise the resolution for a clearer face" change
           was therefore doing nothing beyond ~665x886; asking for more
           just wastes request time. Requesting the real ceiling directly
           is honest about what's actually available on this free tier.

           MODEL: `model=flux` is silently ignored on the free/anonymous
           tier - the response header `x-model-used` always comes back
           `sana` regardless, and a 429 from that path revealed the real
           upstream backend: a community model called
           "lykon/dreamshaper-8-lcm". The "-lcm" (Latent Consistency
           Model) suffix means it deliberately generates in very few
           inference steps for speed, trading fine detail (faces/eyes
           especially) for fast, free generation - not a bug in this
           app's prompt, a real ceiling of the free backend. Requesting
           `model=sana` explicitly (instead of a `flux` that was never
           actually honored) is just being honest about that.

           NEGATIVE PROMPT: Pollinations supports a `negative_prompt`
           param (undocumented in this app until now, found by reading
           the full error payload of a 429 response) that measurably
           sharpened faces in direct side-by-side testing. */
        const negativePrompt = 'blurry eyes, blurry face, out of focus face, distorted face, low quality face, deformed eyes, asymmetric eyes, extra limbs, extra fingers'
        const target = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=665&height=886&nologo=true&model=sana&safe=true&seed=${encodeURIComponent(seed)}&negative_prompt=${encodeURIComponent(negativePrompt)}`
        try {
          const { status, body } = await curlFetch(target)
          if (status !== 200) {
            console.error('Pollinations upstream error:', status, body.toString('utf8').slice(0, 300))
          }
          res.statusCode = status
          res.setHeader('Content-Type', 'image/jpeg')
          res.end(body)
        } catch (err) {
          console.error('Image proxy error:', err.message)
          res.statusCode = 502
          res.end('Image proxy error: ' + err.message)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /* loadEnv (not `process.env` directly) is how Vite reads .env.local
     inside the config file itself - the third argument '' means "load
     every var regardless of prefix", so a deliberately non-VITE_-
     prefixed secret like HUGGINGFACE_API_TOKEN is readable here without
     ever being exposed to client code (only VITE_-prefixed vars get
     bundled into import.meta.env for the browser). */
  const env = loadEnv(mode, process.cwd(), '')

  return {
    /* Netlify serves the site from its own domain root (yoursite.netlify.app/
       or a custom domain), not a subpath like GitHub Pages project sites
       do - so base stays "/" for both dev and production. (This was
       "/apna-tailor/" in build mode during an earlier GitHub Pages plan;
       switched back to "/" when the deployment target moved to Netlify,
       see netlify.toml and netlify/functions/generate-image.js.) App.jsx
       reads this same value as the Router's `basename`, so the two never
       drift apart - see the note there for why that pairing matters. */
    base: '/',
    plugins: [react(), huggingFaceProxy(env.HUGGINGFACE_API_TOKEN)],
  }
})
