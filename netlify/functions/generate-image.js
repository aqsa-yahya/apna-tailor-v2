import { InferenceClient } from '@huggingface/inference';

/*
  Netlify serverless function for Hugging Face image generation.

  HUGGINGFACE_API_TOKEN must be configured in Netlify Environment Variables.
  NEVER commit the actual token to the repository.

  The token needs the "Inference Providers" permission.
*/

export async function handler(event) {
  const prompt = event.queryStringParameters?.prompt;
  const seed =
    event.queryStringParameters?.seed || String(Date.now());

  if (!prompt) {
    return {
      statusCode: 400,
      body: 'Missing "prompt" query param',
    };
  }

  const token = process.env.HUGGINGFACE_API_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      body:
        'Missing HUGGINGFACE_API_TOKEN - set it in Netlify Environment Variables, then redeploy',
    };
  }

  try {
    const client = new InferenceClient(token);

    const blob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      provider: 'nscale',
      inputs: prompt,
      parameters: {
        width: 768,
        height: 1024,
        seed: Number(seed) % 2147483647,
      },
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    return {
      statusCode: 200,
      headers: {
        'Content-Type': blob.type || 'image/png',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error('Hugging Face image function error:', {
      name: err?.name,
      message: err?.message,
      status: err?.status,
      statusCode: err?.statusCode,
      response: err?.response,
      cause: err?.cause,
      stack: err?.stack,
    });

    return {
      statusCode: 502,
      body:
        'Image proxy error: ' +
        (err?.message || 'Unknown error'),
    };
  }
}