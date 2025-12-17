import { getMentorResponse } from "../services/ai.service.js";

export const chatWithMentor = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await getMentorResponse(message);

    res.json({ reply });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI Mentor failed to respond" });
  }
};
