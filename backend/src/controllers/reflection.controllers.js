import Reflection from "../models/Reflection.model.js";
import User from "../models/User.model.js";
import { getMentorResponse } from "../services/gemini.service.js";

export const generateReflection = async (req, res) => {
  try {
    const { streak, completedTodayCount, totalHabits } = req.body;
    const today = new Date().toDateString();

    // Check if already Generated today
    const exisiting = await Reflection.findOne({
      userId: req.user._id,
      date: today,
    });

    if (exisiting) {
      return res.status(200).json({
        success: true,
        data: exisiting,
      });
    }

    // Build reflection prompt
    const prompt = `
    user stats:
    -Streak: ${streak}
    Completed today: ${completedTodayCount} / ${totalHabits}
    Generate a short, motivational daily reflection as a mentor.
    Keep it 2-3 sentences.
    `;

    // get ai response
    const aiReflection = await getMentorResponse({
      message: prompt,
      streak,
      messagesToday: 0,
      completedTodayCount,
      totalHabits,
    });

    if (
      !aiReflection ||
      typeof aiReflection !== "string" ||
      !aiReflection.split()
    ) {
      console.error("Invalid Ai reflection", aiReflection);
      return res.status(500).json({
        success: false,
        error: "Ai Failed to generate valid reflection",
      });
    }

    const saved = await Reflection.create({
      userId: req.user._id,
      date: today,
      streak,
      completedTodayCount,
      totalHabits,
      aiReflection: aiReflection.trim(),
    });

    // --- GAMIFICATION LOGIC ---
    // Award 20 XP for completing a reflection
    const user = await User.findById(req.user._id);
    if(user) {
        user.xp += 20;

        // Check if level up (Every 100 XP = 1 Level)
        const requiredXp = user.level * 100;
        if(user.xp >= requiredXp) {
            user.level += 1;
            // Optionally, reset XP or keep accumulating
        }

        if(streak > user.longestStreak) {
            user.longestStreak = streak;
        }

        await user.save();
    }

    res.status(201).json({
      success: true,
      data: saved,
      xpEarned: 20,
      newTotalXp: user ? user.xp : null,
      newLevel: user ? user.level : null
    });
  } catch (error) {
    console.error("GENERATE REFLECTION ERROR ", error);
    res.status(500).json({
      success: false,
      error: "Failed to create a Reflection",
    });
  }
};

// get reflection history
export const getReflectionHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const skip = (page - 1) * limit;

    const totalReflection = await Reflection.countDocuments({
      userId: req.user._id,
    });

    const reflection = await Reflection.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalReflection / limit),
      totalReflection,
      count: reflection.length,
      data: reflection,
    });
  } catch (error) {
    console.error("REFLECTION HISTORY ERRRO ", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch reflection history",
    });
  }
};

// get weekly summary
export const getWeeklySummary = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name");

    const reflections = await Reflection.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(7);

    if (!reflections) {
      return res.status(400).json({
        success: false,
        error: "Not enough reflection data for weekly summary",
      });
    }
    const reflectionText = reflections
      .map(
        (r, index) => `
      Day ${index + 1}:
        Date: ${r.date}
        Streak: ${r.streak}
        Completed: ${r.completedTodayCount}/ ${r.totalHabits}
        Reflection: ${r.aiReflection}
      `,
      )
      .join("\n");

const prompt = `
You are an analytical AI mentor evaluating the weekly progress of ${user ? user.name : 'the user'}.

Generate a COMPLETE weekly performance review for ${user ? user.name : 'them'}.

Rules:
- Maximum 350 words.
- 4 sections only.
- Each section 2–3 sentences.
- Do NOT exceed the word limit.
- Finish completely before ending.

Sections:
1. Overall Consistency (2-3 sentences)
2. Strengths (2-3 sentences)
3. Weaknesses (2-3 sentences)
4. Action Plan (2-3 sentences)

IMPORTANT: Ensure your response is fully complete and not cut off. Do not leave sentences or sections unfinished.

Data:
${reflectionText}
`;

    const weeklySummary = await getMentorResponse({
      message: prompt,
      userRawPrompt: true,
    });

    if (!weeklySummary || !weeklySummary.trim()) {
      return res.status(500).json({
        success: false,
        error: "Ai failed to generate weekly summary",
      });
    }

    res.status(200).json({
      success: true,
      summary: weeklySummary.trim(),
    });
  } catch (error) {
    console.error("WEEEKLY SUMMARY ERROR ", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate weekly summary",
    });
  }
};
