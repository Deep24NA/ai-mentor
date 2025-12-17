import { mentorPrompt } from "../prompts/mentor.prompt.js";

export const getMentorResponse = async (message) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tinyllama",
      prompt: mentorPrompt(message),
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response;
};
