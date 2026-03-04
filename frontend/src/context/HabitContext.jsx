import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchHabits,
  createHabit,
  toggleHabit as toggleHabitApi,
} from "../services/habit.api";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const today = new Date().toDateString();
  const { user, setUser } = useAuth(); // Connect to gamification global state
  const [habits, setHabits] = useState([]);

  // Fetch habits from backend once authenticated
  useEffect(() => {
    if (user) {
        fetchHabits()
          .then(data => {
              if (Array.isArray(data)) setHabits(data);
              else setHabits([]);
          })
          .catch(console.error);
    } else {
        setHabits([]); // Clear habits on logout
    }
  }, [user]);

  // Add habit
  const addHabit = async (title) => {
    if (!title || !title.trim()) return;
    try {
        const newHabit = await createHabit(title);
        if (newHabit && newHabit._id) {
            setHabits((prev) => [...prev, newHabit]);
        }
    } catch (e) {
        console.error("Failed to add habit", e);
    }
  };

  // Toggle habit (backend is source of truth)
  const toggleHabit = async (id) => {
    try {
        const data = await toggleHabitApi(id);
        
        // Check if the backend returned our new gamification payload format
        if (data && data.habit && data.habit._id) {
            setHabits((prev) =>
              prev.map((habit) =>
                habit._id === id ? data.habit : habit
              )
            );

            // Update global Auth User state with new XP and Level!
            if(setUser && data.newTotalXp !== null && data.newTotalXp !== undefined) {
                setUser(prevUser => ({
                    ...prevUser,
                    xp: data.newTotalXp,
                    level: data.newLevel
                }));
            }
        } else if (data && data._id) {
            // Fallback for older API format if not updated
            setHabits((prev) =>
              prev.map((habit) =>
                habit._id === id ? data : habit
              )
            );
        }
    } catch (e) {
        console.error("Failed to toggle habit", e);
    }
  };

  // ✅ TODAY LOGIC (DATE-BASED, CORRECT)
  const completedTodayCount = habits.filter(
    (habit) => habit && habit.completedDates?.includes(today)
  ).length;

  const totalTodayHabits = habits.length || 0;

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
