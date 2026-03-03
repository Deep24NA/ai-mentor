import { createContext, useContext, useState } from "react";

const UserStatsContext = createContext();

export function UserStatsProvider({ children }) {
  const [stats, setStats] = useState({
    username: "Deep",
    streak: 5,
    level: 3,
    levelName: "Mentor",
    xp: 120,
    reflectionsThisWeek: 4,
    productivityIncrease: 12,
  });

  return (
    <UserStatsContext.Provider value={{ stats, setStats }}>
      {children}
    </UserStatsContext.Provider>
  );
}

export function useUserStats() {
  return useContext(UserStatsContext);
}
