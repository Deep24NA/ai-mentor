import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        usermessage : {
            type : String,
            required : true,
        },
        aiResponse : {
            type : String,
            required : true,
        },
        streak : Number,
        messagesToday : Number,
        completedTodayCount : Number,
        totalHabits : Number,
    },
    {timestamps : true},
)

const Chat = mongoose.model("Chat" , chatSchema);

export default Chat;