import { createContext, useContext, useState , useEffect  } from "react";
import { useAuth } from "./AuthContext";


const UserStatsContext = createContext();

export function UserStatsProvider({ children }) {
  const { user } = useAuth(); 
  const [stats, setStats] = useState({
    username: "Guest",
    streak: 0,
    level: 1,
    levelName: "Novice",
    xp: 0,
    reflectionsThisWeek: 0,
    productivityIncrease: 0,
  });

  useEffect(() => {
    if(user) {
      setStats( prevStats => ({
        ...prevStats,
        username: user.name,
        streak: user.longestStreak || prevStats.streak,
        level: user.level || prevStats.level,
        xp: user.xp || prevStats.xp,
      }))
    }
  }, [user])

  const fetchDashboardStats = async () => {
     // TODO : connect to backend endpoint to get reflection & habit stats
  }
  

  return (
    <UserStatsContext.Provider value={{ stats, setStats ,fetchDashboardStats }}>
      {children}
    </UserStatsContext.Provider>
  );
}

export function useUserStats() {
  return useContext(UserStatsContext);
}
