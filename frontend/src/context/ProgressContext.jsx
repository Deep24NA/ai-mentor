import { createContext, useState, useEffect, useContext } from "react";
import { useHabits } from "./HabitContext";
import { sendMessage } from "../services/api";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const today = new Date().toDateString();
  const { completedTodayCount, habits } = useHabits();
  const totalHabits = habits.length;

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? Number(saved) : 1;
  });

  const [messagesToday, setMessagesToday] = useState(() => {
    const saved = localStorage.getItem("messagesToday");
    return saved ? Number(saved) : 0;
  });

  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem("lastActiveDate") || today;
  });

  const [lastStreakEvaluatedDate, setLastStreakEvaluatedDate] = useState(() => {
    return localStorage.getItem("lastStreakEvaluatedDate");
  });

  const [dailyReflection, setDailyReflection] = useState(() => {
    const saved = localStorage.getItem("dailyReflection");
    return saved && saved !== "null" ? saved : null;
  });

  const [lastReflectionDate, setLastReflectionDate] = useState(() => {
    return localStorage.getItem("lastReflectionDate");
  });

  const canGenerateReflection = lastReflectionDate !== today;

  const genrateDailyReflection = async () => {
  if (lastReflectionDate === today) return;

  const text = await sendMessage({
    message: "daily reflection",
    streak,
    messagesToday: 0,
    completedTodayCount,
    totalHabits,
  });

  if (typeof text !== "string") return;
  if (!text.trim()) return;

  setDailyReflection(text);
  setLastReflectionDate(today);
};



  // ✅ streak evaluation
  useEffect(() => {
    if (lastStreakEvaluatedDate === today) return;

    if (completedTodayCount > 0) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1);
    }

    setLastStreakEvaluatedDate(today);
  }, [completedTodayCount]);

  // ✅ daily reset
  useEffect(() => {
    if (lastActiveDate !== today) {
      setMessagesToday(0);
      setLastActiveDate(today);
    }
  }, [lastActiveDate, today]);

  // ✅ persist
  useEffect(() => {
    localStorage.setItem("streak", streak);
    localStorage.setItem("messagesToday", messagesToday);
    localStorage.setItem("lastActiveDate", lastActiveDate);
    localStorage.setItem("lastStreakEvaluatedDate", lastStreakEvaluatedDate);
    localStorage.setItem("lastReflectionDate", lastReflectionDate || "");

    if (dailyReflection) {
      localStorage.setItem("dailyReflection", dailyReflection);
    } else {
      localStorage.removeItem("dailyReflection");
    }
  }, [
    streak,
    messagesToday,
    lastActiveDate,
    lastStreakEvaluatedDate,
    dailyReflection,
    lastReflectionDate,
  ]);

  return (
    <ProgressContext.Provider
      value={{
        streak,
        messagesToday,
        dailyReflection,
        genrateDailyReflection,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
