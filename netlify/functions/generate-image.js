import { InferenceClient } from '@huggingface/inference';

export async function handler(event) {
  const prompt = event.queryStringParameters?.prompt;

  if (!prompt) {
    return {
      statusCode: 400,
      body: 'Missing "prompt" query param',
    };
  }

  const token = process.env.HUGGINGFACE_API_TOKEN;

  if (!token) {
    console.error('HUGGINGFACE_API_TOKEN is missing');

    return {
      statusCode: 500,
      body: 'Missing HUGGINGFACE_API_TOKEN',
    };
  }

  try {
    console.log('Starting Hugging Face image generation...');
    console.log('Model: black-forest-labs/FLUX.1-schnell');
    console.log('Provider: nscale');

    // Provider is configured on the client
    const client = new InferenceClient({
      provider: 'nscale',
      apiKey: token,
    });

    const imageBlob = await client.textToImage(
      prompt,
      {
        model: 'black-forest-labs/FLUX.1-schnell',
      }
    );

    console.log('Image generated successfully');
    console.log('Content type:', imageBlob.type);

    const buffer = Buffer.from(
      await imageBlob.arrayBuffer()
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': imageBlob.type || 'image/png',
        'Cache-Control': 'no-store',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };

  } catch (error) {
    console.error('========== HUGGING FACE ERROR ==========');
    console.error('Name:', error?.name);
    console.error('Message:', error?.message);
    console.error('Status:', error?.status);
    console.error('Status Code:', error?.statusCode);
    console.error('Response:', error?.response);
    console.error('Cause:', error?.cause);
    console.error('Stack:', error?.stack);
    console.error('=========================================');

    return {
      statusCode: 502,
      body:
        'Image generation failed: ' +
        (error?.message || 'Unknown Hugging Face error'),
    };
  }
}