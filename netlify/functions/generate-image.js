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
    console.log("Starting Nscale image generation...");

    const response = await fetch(
      "https://router.huggingface.co/nscale/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "black-forest-labs/FLUX.1-schnell",
          prompt: prompt,
          response_format: "b64_json",
        }),
      }
    );

    console.log("Nscale status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Nscale error:", errorText);

      return {
        statusCode: response.status,
        body: `Nscale error: ${errorText}`,
      };
    }

    const result = await response.json();

    console.log("Image generated successfully");

    const base64Image = result.data?.[0]?.b64_json;

    if (!base64Image) {
      console.error("No image returned:", result);

      return {
        statusCode: 502,
        body: "Nscale returned no image",
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
      body: base64Image,
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("========== NSCALE ERROR ==========");
    console.error("Message:", error?.message);
    console.error("Stack:", error?.stack);
    console.error("==================================");

    return {
      statusCode: 502,
      body: "Image generation failed: " + (error?.message || "Unknown error"),
    };
  }
}