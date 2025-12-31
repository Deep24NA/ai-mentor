import { mentorPrompt } from "../prompts/mentor.prompt.js";

export const getMentorResponse = async ({
  message,
  streak,
  messagesToday,
  completedTodayCount,
  totalHabits,
}) => {
  const prompt = mentorPrompt({
    message,
    streak,
    messagesToday,
    completedTodayCount,
    totalHabits,
  });

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tinyllama",
      prompt,
      stream: false,
      options: {
        num_predict: 80,      // limits length
        stop: ["\n\n", "User:"], // stops roleplay
      },
    }),

  });

const cleanResponse = (text) => {
  return text
    .replace(/^AI Mentor[:,]?\s*/i, "")
    .replace(/^Mentor[:,]?\s*/i, "")
    .replace(/^Sure[:,]?\s*/i, "")
    .replace(/\?.*$/g, "")   // 👈 remove questions
    .replace(/\s*(Have a great day|All the best).*$/i, "")
    .trim();
};



  const data = await response.json();
  return cleanResponse(data.response);


};
