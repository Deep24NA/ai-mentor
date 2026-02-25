import { GEMINI_CONFIG } from "../config/gemini.js";
import { mentorPrompt } from "../prompts/mentor.prompt.js";

export const getMentorResponse = async ({ message }) => {
  try {
    // 1. Prepare the URL and Prompt
    const url = `${GEMINI_CONFIG.baseUrl}/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;
    const promptText = mentorPrompt({ message });

    // 2. Send Request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: promptText }] 
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500 // <--- 500 tokens allows for a nice long paragraph
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // 3. Get the text directly (NO SPLITTING!)
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return text ? text.trim() : "Keep going! (AI returned empty response)";

  } catch (error) {
    console.error("AI Service Error:", error.message);
    return "I'm having trouble connecting, but don't let that stop your streak!";
  }
};