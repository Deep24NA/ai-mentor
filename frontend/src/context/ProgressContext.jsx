import { createContext, useState, useEffect, useContext } from "react";
import { useHabits } from "./HabitContext";
import { useAuth } from "./AuthContext";
import { generateReflection as generateReflectionApi, fetchReflectionHistory } from "../services/reflection.api";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const today = new Date().toDateString();
  const { completedTodayCount, totalTodayHabits } = useHabits();
  const { user, updateUser } = useAuth();

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

  // Reflections this week count (for smart greeting)
  const [reflectionsThisWeek, setReflectionsThisWeek] = useState(0);

  // Fetch reflection count for this week on mount
  useEffect(() => {
    if (!user) return;
    fetchReflectionHistory(1, 7)
      .then(res => {
        if (res?.success) setReflectionsThisWeek(res.count || 0);
      })
      .catch(() => {});
  }, [user]);

  const generateDailyReflection = async () => {
    if (lastReflectionDate === today) return;
    if (completedTodayCount === 0) return;

    try {
      const result = await generateReflectionApi({
        streak: user?.longestStreak || streak,
        completedTodayCount,
        totalHabits: totalTodayHabits,
      });

      if (result.success && result.data) {
        setDailyReflection(result.data.aiReflection);
        setLastReflectionDate(today);
        setReflectionsThisWeek(prev => prev + 1);

        if (result.newTotalXp !== undefined && result.newTotalXp !== null) {
          updateUser({
            xp: result.newTotalXp,
            level: result.newLevel,
            longestStreak: Math.max(user?.longestStreak || 0, streak),
          });
        }
      }
    } catch (error) {
      console.error("Failed to generate reflection:", error);
      const text = completedTodayCount === totalTodayHabits
        ? "You showed up fully today — consistency is forming."
        : "Progress matters more than perfection; keep going.";
      setDailyReflection(text);
      setLastReflectionDate(today);
    }
  };

  useEffect(() => {
    generateDailyReflection();
  }, [completedTodayCount]);

  // Streak evaluation
  useEffect(() => {
    if (lastStreakEvaluatedDate === today) return;
    if (completedTodayCount > 0) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1);
    }
    setLastStreakEvaluatedDate(today);
  }, [completedTodayCount]);

  // Daily reset
  useEffect(() => {
    if (lastActiveDate !== today) {
      setMessagesToday(0);
      setLastActiveDate(today);
    }
  }, [lastActiveDate, today]);

  // Persist to localStorage
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
  }, [streak, messagesToday, lastActiveDate, lastStreakEvaluatedDate, dailyReflection, lastReflectionDate]);

  return (
    <ProgressContext.Provider
      value={{
        streak,
        messagesToday,
        dailyReflection,
        reflectionsThisWeek,
        generateDailyReflection,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);


// import { createContext, useState, useEffect, useContext } from "react";
// import { useHabits } from "./HabitContext";
// import { useAuth } from "./AuthContext";
// import { generateReflection as generateReflectionApi } from "../services/reflection.api";

// const ProgressContext = createContext();

// export const ProgressProvider = ({ children }) => {
//   const today = new Date().toDateString();
//   const { completedTodayCount, totalHabits } = useHabits();
//   const { user, setUser } = useAuth();

//   // console.log(totalHabits);
//   // console.log(completedTodayCount)

//   const [streak, setStreak] = useState(() => {
//     const saved = localStorage.getItem("streak");
//     return saved ? Number(saved) : 1;
//   });

//   const [messagesToday, setMessagesToday] = useState(() => {
//     const saved = localStorage.getItem("messagesToday");
//     return saved ? Number(saved) : 0;
//   });

//   const [lastActiveDate, setLastActiveDate] = useState(() => {
//     return localStorage.getItem("lastActiveDate") || today;
//   });

//   const [lastStreakEvaluatedDate, setLastStreakEvaluatedDate] = useState(() => {
//     return localStorage.getItem("lastStreakEvaluatedDate");
//   });

//   const [dailyReflection, setDailyReflection] = useState(() => {
//     const saved = localStorage.getItem("dailyReflection");
//     return saved && saved !== "null" ? saved : null;
//   });

//   const [lastReflectionDate, setLastReflectionDate] = useState(() => {
//     return localStorage.getItem("lastReflectionDate");
//   });

//   // const canGenerateReflection = lastReflectionDate !== today;

//   const generateDailyReflection = async () => {
//     if (lastReflectionDate === today) return;
//     if (completedTodayCount === 0) return;

//     try {
//         const result = await generateReflectionApi({
//             streak: user?.longestStreak || streak, // Try DB streak first
//             completedTodayCount,
//             totalHabits
//         });

//         if (result.success && result.data) {
//             setDailyReflection(result.data.aiReflection);
//             setLastReflectionDate(today);

//             // Update Auth Context User with new XP if provided
//             if(setUser && result.newTotalXp !== undefined && result.newTotalXp !== null) {
//                 setUser(prev => ({
//                     ...prev,
//                     xp: result.newTotalXp,
//                     level: result.newLevel,
//                     longestStreak: Math.max(prev?.longestStreak || 0, streak)
//                 }));
//             }
//         }
//     } catch (error) {
//         console.error("Failed to generate real reflection:", error);
        
//         // Fallback for UI resilience if server is down
//         let text = "";
//         if(completedTodayCount === totalHabits) {
//             text = "You showed up fully today — consistency is forming.";
//         } else {
//             text = "Progress matters more than perfection; keep going.";
//         }
//         setDailyReflection(text);
//         setLastReflectionDate(today);
//     }
//   };


//   useEffect(() => {
//     generateDailyReflection()
//   },[completedTodayCount])


//   // ✅ streak evaluation
//   useEffect(() => {
//     if (lastStreakEvaluatedDate === today) return;

//     if (completedTodayCount > 0) {
//       setStreak((prev) => prev + 1);
//     } else {
//       setStreak(1);
//     }

//     setLastStreakEvaluatedDate(today);
//   }, [completedTodayCount]);

//   // ✅ daily reset
//   useEffect(() => {
//     if (lastActiveDate !== today) {
//       setMessagesToday(0);
//       setLastActiveDate(today);
//     }
//   }, [lastActiveDate, today]);

//   // ✅ persist
//   useEffect(() => {
//     localStorage.setItem("streak", streak);
//     localStorage.setItem("messagesToday", messagesToday);
//     localStorage.setItem("lastActiveDate", lastActiveDate);
//     localStorage.setItem("lastStreakEvaluatedDate", lastStreakEvaluatedDate);
//     localStorage.setItem("lastReflectionDate", lastReflectionDate || "");

//     if (dailyReflection) {
//       localStorage.setItem("dailyReflection", dailyReflection);
//     } else {
//       localStorage.removeItem("dailyReflection");
//     }
//   }, [
//     streak,
//     messagesToday,
//     lastActiveDate,
//     lastStreakEvaluatedDate,
//     dailyReflection,
//     lastReflectionDate,
//   ]);

//   return (
//     <ProgressContext.Provider
//       value={{
//         streak,
//         messagesToday,
//         dailyReflection,
//         generateDailyReflection,
//       }}
//     >
//       {children}
//     </ProgressContext.Provider>
//   );
// };

// export const useProgress = () => useContext(ProgressContext);
