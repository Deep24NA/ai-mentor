import { createContext, useState, useEffect, useContext } from "react";
import { useHabits } from "./HabitContext";


const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const today = new Date().toDateString();
  const {completedTodayCount} = useHabits;

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

  const [lastStreakEvaluatedDate , setLastStreakEvaluatedDate] = useState(() =>{
       return localStorage.getItem("lastStreakEvaluatedDate");
   })


 useEffect(() => {
  // already evaluated today → do nothing
  if (lastStreakEvaluatedDate === today) return;

  if (completedTodayCount > 0) {
    setStreak((prev) => prev + 1);
  } else {
    setStreak(1);
  }

  setLastStreakEvaluatedDate(today);
}, [today]);



  // ✅ Daily validation
  useEffect(() => {
    if (lastActiveDate !== today) {
      setMessagesToday(0);
      setLastActiveDate(today);
    }
  }, [lastActiveDate, today]);

  // ✅ Persist
  useEffect(() => {
    localStorage.setItem("streak", streak);
    localStorage.setItem("messagesToday", messagesToday);
    localStorage.setItem("lastActiveDate", lastActiveDate);
    localStorage.setItem("lastStreakEvaluatedDate" , lastStreakEvaluatedDate)
  }, [streak, messagesToday, lastActiveDate]);

  return (
    <ProgressContext.Provider
      value={{
        streak,
        setStreak,
        messagesToday,
        setMessagesToday,
        lastActiveDate,
        setLastActiveDate,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
