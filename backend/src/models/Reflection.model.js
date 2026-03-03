import mongoose from "mongoose";

const reflectionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        streak: Number,
        completedTodayCount: Number,
        totalHabits: Number,
        aiReflection: {
            type: String,
            required: true,
        },
    },
    {timestamps : true},
)

const Reflection = mongoose.model("Reflection" , reflectionSchema);
export default Reflection;