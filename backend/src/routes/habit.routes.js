import express from "express";
import Habit from "../models/Habit.model.js";

const router =  express.Router();

// Get All habit

router.get("/" , async (req , res) =>{
    const habit = await Habit.find().sort({createdAt : 1});
    res.json(habit);
});

// create habit
router.post("/" , async (req , res) =>{
    const habit = await Habit.create({
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

  if (habit.completedToday) {
    habit.lastCompletedDate = today;

    if (!habit.completedDates.includes(today)) {
      habit.completedDates.push(today);
    }
  } else {
    habit.lastCompletedDate = null;
    habit.completedDates = habit.completedDates.filter(
      (date) => date !== today
    );
  }

  await habit.save();
  res.json(habit);
});


export default router;