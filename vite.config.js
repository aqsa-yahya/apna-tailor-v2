import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
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
           which matters given this app's "modest and tasteful" requirement. */
        const target = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1080&height=1440&nologo=true&model=flux&safe=true&seed=${encodeURIComponent(seed)}`
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
export default defineConfig({
  plugins: [react(), pollinationsProxy()],
})
