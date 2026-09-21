import { InferenceClient } from "@huggingface/inference";

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
    console.error("HUGGINGFACE_API_TOKEN is missing");

    return {
      statusCode: 500,
      body: "Missing HUGGINGFACE_API_TOKEN",
    };
  }

  try {
    console.log("Starting Hugging Face image generation...");
    console.log("Provider: nscale");
    console.log("Model: black-forest-labs/FLUX.1-schnell");

    const client = new InferenceClient(token);

    const imageBlob = await client.textToImage({
      provider: "nscale",
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
      parameters: {
        num_inference_steps: 5,
      },
    });

    console.log("Image generated successfully");
    console.log("Content type:", imageBlob.type);

    const buffer = Buffer.from(await imageBlob.arrayBuffer());

    return {
      statusCode: 200,
      headers: {
        "Content-Type": imageBlob.type || "image/png",
        "Cache-Control": "no-store",
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    // Asli status aur body httpResponse ke andar hote hain
    const status = error?.httpResponse?.status;
    const body = error?.httpResponse?.body;

    console.error("========== HUGGING FACE ERROR ==========");
    console.error("Name:", error?.name);
    console.error("Message:", error?.message);
    console.error("HTTP status:", status);
    console.error("HTTP body:", JSON.stringify(body));
    console.error("Request URL:", error?.httpRequest?.url);
    console.error("=========================================");

    return {
      statusCode: 502,
      body:
        `Image generation failed (HTTP ${status ?? "unknown"}): ` +
        (typeof body === "string"
          ? body
          : JSON.stringify(body ?? error?.message ?? "Unknown Hugging Face error")),
    };
  }
}