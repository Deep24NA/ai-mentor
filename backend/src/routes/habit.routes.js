import express from "express";
import Habit from "../models/Habit.model.js";
import User from "../models/User.model.js";
import { protect as authMiddleware } from "../middleware/auth.middleware.js";

const router =  express.Router();

// Apply auth middleware to all habit routes
router.use(authMiddleware);

// Get All habit

router.get("/" , async (req , res) =>{
    const habit = await Habit.find({ userId: req.user.id }).sort({createdAt : 1});
    res.json(habit);
});

// create habit
router.post("/" , async (req , res) =>{
    const habit = await Habit.create({
        userId: req.user.id,
        title: req.body.title,
        frequency: "daily"
      });
    res.json(habit);
})


// toggle habit
router.patch("/:id/toggle", async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  const today = new Date().toDateString();

  // SAFETY: init array for old docs
  if (!habit.completedDates) {
    habit.completedDates = [];
  }

  // 🔁 ACTUAL TOGGLE
  habit.completedToday = !habit.completedToday;

  let xpGained = 0;
  let user = await User.findById(req.user.id);

  if (habit.completedToday) {
    habit.lastCompletedDate = today;

    if (!habit.completedDates.includes(today)) {
      habit.completedDates.push(today);
      
      // Award 5 XP for completing a habit
      if(user) {
          user.xp += 5;
          const requiredXp = user.level * 100;
          if(user.xp >= requiredXp) {
              user.level += 1;
          }
          await user.save();
          xpGained = 5;
      }
    }
  } else {
    habit.lastCompletedDate = null;
    habit.completedDates = habit.completedDates.filter(
      (date) => date !== today
    );
     // Optional: Deduct XP if unchecked
     if(user && user.xp > 0) {
        user.xp = Math.max(0, user.xp - 5);
        await user.save();
        xpGained = -5;
    }
  }

  await habit.save();
  
  // Return the habit along with the new user gamification state
  res.json({
      habit,
      xpGained,
      newTotalXp: user ? user.xp : null,
      newLevel: user ? user.level : null
  });
});


export default router;