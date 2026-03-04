import Reflection from "../models/Reflection.model.js";
import User from "../models/User.model.js";
import { getMentorResponse } from "../services/gemini.service.js";

export const generateReflection = async (req, res) => {
  try {
    const { streak, completedTodayCount, totalHabits } = req.body;
    const today = new Date().toDateString();

    // Check if already Generated today
    const existing = await Reflection.findOne({
      userId: req.user._id,
      date: today,
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        data: existing,
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
      typeof aiReflection !== "string"
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
        while (user.xp >= user.level * 100) {
            user.level += 1;
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
    console.error("REFLECTION HISTORY ERROR ", error);
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

    if (!reflections || reflections.length === 0) {
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

Based on their reflections, generate a structured JSON report. Do NOT output markdown fencing. Output ONLY valid JSON matching this exact structure:

{
  "scores": {
    "overallScore": <number 0-100>,
    "productivity": <number 0-100>,
    "stability": <number 0-100>,
    "learning": <number 0-100>
  },
  "highlights": {
    "biggestWin": {
      "title": "<short sentence describing their best ongoing habit/win>",
      "description": "<one sentence elaborating on the win>"
    },
    "majorStruggle": {
      "title": "<short sentence describing their main friction point>",
      "description": "<one sentence elaborating on the struggle>"
    }
  },
  "actionPlan": [
    {
      "title": "<short action item 1>",
      "description": "<detailed sentence explaining how to achieve it>"
    },
    {
      "title": "<short action item 2>",
      "description": "<detailed sentence explaining how to achieve it>"
    }
  ]
}

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

    try {
      // Clean potential markdown fencing from Gemini response
      let cleanJson = weeklySummary.trim();
      if (cleanJson.startsWith('\`\`\`json')) {
         cleanJson = cleanJson.replace(/^\`\`\`json/,"").replace(/\`\`\`$/,"");
      }
      const parsedSummary = JSON.parse(cleanJson);
      res.status(200).json({
        success: true,
        summary: parsedSummary,
      });
    } catch (parseError) {
      console.error("JSON Parse Error for Weekly Summary:", weeklySummary);
      res.status(500).json({
         success: false,
         error: "AI returned invalid JSON format."
      });
    }
  } catch (error) {
    console.error("WEEEKLY SUMMARY ERROR ", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate weekly summary",
    });
  }
};

// get memory visualizer insights
export const getMemoryInsights = async (req, res) => {
  try {
    const reflections = await Reflection.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(14);
    if (!reflections || reflections.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Not enough reflection data to visualize",
      });
    }

    const reflectionText = reflections.map(r => `Date: ${r.date} | Reflection: ${r.aiReflection}`).join("\n");

    const prompt = `
You are an advanced AI data analyzer. I am providing you with up to 14 days of a user's daily reflections.
Analyze their sentiment, emotions, and frequently mentioned topics.
Return ONLY valid JSON matching this exact structure (No markdown code blocks, no other text):

{
  "emotionData": [
    { "day": "Mon", "focus": <0-100>, "calm": <0-100>, "stress": <0-100> },
    { "day": "Tue", "focus": <0-100>, "calm": <0-100>, "stress": <0-100> },
    { "day": "Wed", "focus": <0-100>, "calm": <0-100>, "stress": <0-100> },
    { "day": "Thu", "focus": <0-100>, "calm": <0-100>, "stress": <0-100> },
    { "day": "Fri", "focus": <0-100>, "calm": <0-100>, "stress": <0-100> },
    { "day": "Sat", "focus": <0-100>, "calm": <0-100>, "stress": <0-100> },
    { "day": "Sun", "focus": <0-100>, "calm": <0-100>, "stress": <0-100> }
  ],
  "topicsData": [
    { "name": "<Topic 1>", "count": <integer 1-20> },
    { "name": "<Topic 2>", "count": <integer> },
    { "name": "<Topic 3>", "count": <integer> },
    { "name": "<Topic 4>", "count": <integer> },
    { "name": "<Topic 5>", "count": <integer> }
  ],
  "improvements": [
    "<insightful sentence 1>",
    "<insightful sentence 2>",
    "<insightful sentence 3>"
  ],
  "struggles": [
    "<insightful sentence 1>",
    "<insightful sentence 2>"
  ]
}

Extrapolate the 7 "emotionData" days to represent a general recent 7-day trend based on the overall sentiment. 
The "topicsData" counts should reflect how often general themes (e.g., Productivity, Anxiety, Focus, Fitness) appeared or were implied.

Data:
${reflectionText}
`;

    const rawResponse = await getMentorResponse({
      message: prompt,
      userRawPrompt: true,
    });

    try {
      let cleanJson = rawResponse.trim();
      if (cleanJson.startsWith('\`\`\`json')) {
         cleanJson = cleanJson.replace(/^\`\`\`json/,"").replace(/\`\`\`$/,"");
      }
      const parsedInsights = JSON.parse(cleanJson);
      res.status(200).json({ success: true, data: parsedInsights });
    } catch (parseError) {
      console.error("JSON Parse Error for Memory Insights:", rawResponse);
      res.status(500).json({ success: false, error: "AI returned invalid JSON format."});
    }

  } catch (error) {
    console.error("MEMORY INSIGHTS ERROR ", error);
    res.status(500).json({ success: false, error: "Failed to generate memory insights" });
  }
};
