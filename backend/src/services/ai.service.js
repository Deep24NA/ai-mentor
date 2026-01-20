import { mentorPrompt } from "../prompts/mentor.prompt.js";

export const getMentorResponse = async ({ message }) => {
  const prompt = mentorPrompt({ message });

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "tinyllama",
      prompt,
      stream: false,
      options: {
        num_predict: 80,
        stop: ["User:", "Answer:"],
      },
    }),
  });

  const cleanResponse = (text) =>
    text
      .replace(/^AI Mentor[:,]?\s*/i, "")
      .replace(/^Sure[:,]?\s*/i, "")
      .replace(/["']/g, "")
      .split(".")[0]
      .trim();

  const data = await response.json();
  const cleaned = cleanResponse(data.response || "");

  if (!cleaned || cleaned.length < 10) {
    return "Start with one small focused task.";
  }

  return cleaned;
};
