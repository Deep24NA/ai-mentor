import { GEMINI_CONFIG } from "../config/gemini.js";
import { mentorPrompt } from "../prompts/mentor.prompt.js";

export const getMentorResponse = async ({ message  , userRawPrompt = false}) => {
  try {
    const url = `${GEMINI_CONFIG.baseUrl}/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;
    const promptText = userRawPrompt ? message : mentorPrompt({ message });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: promptText }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 3000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();

    const parts = data.candidates?.[0]?.content?.parts;

    if (!parts || !Array.isArray(parts)) {
      return "Keep going! (AI returned empty response)";
    }

    const fullText = parts
      .map(part => part.text || "")
      .join("")
      .trim();

    return fullText || "Keep going! (AI returned empty response)";

  } catch (error) {
    console.error("AI Service Error:", error.message);
    return "I'm having trouble connecting, but don't let that stop your streak!";
  }
};