import dotenv from "dotenv";
import connectDB from "./config/db.js";
import habitRouter from "./routes/habit.routes.js"
// import Habit from "./models/Habit.modle.js"
// Load environment variables immediately before importing application code
dotenv.config({ path: "./.env" }); // 👈 FORCE path

// console.log("ENV CHECK:", process.env.OPENAI_API_KEY);

// Import app dynamically after dotenv has run so env vars are available to modules
const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 5000;

connectDB();

// const testHabit = async () =>{
//   await Habit.create({title: "Test Habit"});
//   console.log("habit Saved")
// }

// testHabit()

app.use("/api/habits" , habitRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
