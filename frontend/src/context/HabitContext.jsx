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
    if (!title.trim()) return;
    const newHabit = await createHabit(title);
    setHabits((prev) => [...prev, newHabit]);
  };

  // Toggle habit (backend is source of truth)
  const toggleHabit = async (id) => {
    const data = await toggleHabitApi(id);
    
    // Check if the backend returned our new gamification payload format
    if (data.habit) {
        setHabits((prev) =>
          prev.map((habit) =>
            habit._id === id ? data.habit : habit
          )
        );

        // Update global Auth User state with new XP and Level!
        if(setUser && data.newTotalXp !== null) {
            setUser(prevUser => ({
                ...prevUser,
                xp: data.newTotalXp,
                level: data.newLevel
            }));
        }
    } else {
        // Fallback for older API format if not updated
        setHabits((prev) =>
          prev.map((habit) =>
            habit._id === id ? data : habit
          )
        );
    }
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
