
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateLogos(companyName: string): Promise<string[]> {
  try {
    const prompt = `
      Create 4 professional, high-resolution logo designs for an oil and energy company named "${companyName}".
      The logos must be in a modern, clean, and minimalist vector style, suitable for corporate branding.
      Each logo should be on a solid, neutral background (like white, off-white, or very light gray).
      The design should be square (1:1 aspect ratio).

      Incorporate one or more of these core concepts:
      - An abstract oil drop or a stylized flame.
      - A representation of energy, motion, or global reach (e.g., dynamic lines, orbits).
      - Industrial or technological elements like stylized gears or refinery silhouettes.
      - The initial letters "P" and "O" from "Prista Oil" integrated into a unique mark.

      Design Guidelines:
      - Font: Use a strong, clean, and modern sans-serif typeface for the company name.
      - Color Palette: Professional corporate colors. Predominantly use blues, dark grays, or greens, with a single accent color like yellow, orange, or cyan.
      - Composition: The logo mark and the company name should be well-balanced.
      - DO NOT include any text other than the company name "${companyName}". No slogans or extra words.
      - Ensure the final output is just the logo itself, without any surrounding text, annotations, or descriptions.
    `;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 4,
        aspectRatio: '1:1',
        outputMimeType: 'image/png',
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("No images were generated.");
    }

    const imagePromises = response.generatedImages.map(async (image) => {
        const base64ImageBytes: string = image.image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    });

    return Promise.all(imagePromises);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate logos from the AI service.");
  }
}
