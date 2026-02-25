import { getMentorResponse } from "../services/gemini.service.js";
import Chat from "../models/Chat.model.js";

export const chatWithMentor = async (req, res) => {
  try {
    const {
      message,
      streak,
      messagesToday,
      completedTodayCount,
      totalHabits,
    } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // get last 5 conversation
    const previousChats = await Chat.find({userId: req.user._id})
    .sort({createdAt : -1})
    .limit(5);

    // Build conversation context
    const conversationHistory = previousChats
    .reverse()
    .map(chat => 
      `User: ${chat.usermessage}\nMentor: ${chat.aiResponse}`
    )
    .join("\n\n");

    const fullPrompt = `
    Previous Converstion:
    ${conversationHistory}

    Current Message:
    User: ${message}
    `;

    // get AI reply
    const reply = await getMentorResponse({
      message: fullPrompt,
      streak,
      messagesToday,
      completedTodayCount,
      totalHabits,
    });
    
    // save to DB 
    const savedChat = await Chat.create({
      userId : req.user._id,
      usermessage : message,
      aiResponse : reply,
      streak,
      messagesToday,
      completedTodayCount,
      totalHabits,

    });

  // send message
  res.status(200).json({
    success : true,
    data : savedChat,
  })
    
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI Mentor failed to respond" });
  }
};


// get the last 20 chats to load in forntend

export const getChatHistory = async (req , res) =>{
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const totalChats = await Chat.countDocuments({
      userId : req.user._id,
    });


    const chats = await Chat.find({userId : req.user._id})
    .sort({createdAt : -1})
    .skip(skip)
    .limit(limit);

    // console.log("Chats are : ", chats);

    res.status(200).json({
      success: true,
      page,
      totalPages : Math.ceil(totalChats/ limit),
      totalChats,
      count : chats.length,
      data : chats,
    });
  } catch (error) {
    console.error("HISTORY ERROR" , error);
    res.status(500).json({error : "Failed to fetch chat history"});
  }
}