import mongoose, { Schema } from "mongoose";

const habitSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            require: true,
            trim: true,
        },

        completedToday : {
            type: Boolean,
            default: false,
        },

        lastCompletedDate : {
            type: String,
            default: null,
        },

        completedDates: {
            type: [String],
            default: []
        },
        frequency: {
            type: String,
            enum: ["daily"],
            default: "daily", 
        }
    },
    {
        timestamps: true,
    }
);

const Habit = mongoose.model("Habit" , habitSchema);


export default Habit;