import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchHabits,
  createHabit,
  toggleHabit as toggleHabitApi,
} from "../services/habit.api";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const today = new Date().toDateString();

  const [habits, setHabits] = useState([]);

  // Fetch habits from backend once
  useEffect(() => {
    fetchHabits()
      .then(setHabits)
      .catch(console.error);
  }, []);

  // Add habit
  const addHabit = async (title) => {
    if (!title.trim()) return;
    const newHabit = await createHabit(title);
    setHabits((prev) => [...prev, newHabit]);
  };

  // Toggle habit (backend is source of truth)
  const toggleHabit = async (id) => {
    const updatedHabit = await toggleHabitApi(id);
    setHabits((prev) =>
      prev.map((habit) =>
        habit._id === id ? updatedHabit : habit
      )
    );
  };

  // ✅ TODAY LOGIC (DATE-BASED, CORRECT)
  const completedTodayCount = habits.filter(
    (habit) => habit.completedDates?.includes(today)
  ).length;

  const totalTodayHabits = habits.length;

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        toggleHabit,
        completedTodayCount,
        totalTodayHabits,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
