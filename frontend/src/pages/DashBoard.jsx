import AppLayout from "../layout/AppLayout"
import ProgressCard from "../components/dashboard/ProgressCard"
import UserInfoCard from "../components/dashboard/UserInfoCard"
import HabitSummary from "../components/dashboard/HabitSummary"
import LevelProgressCard from "../components/dashboard/LevelProgressCard"
import { useProgress } from "../context/ProgressContext"
import { useEffect } from "react"

export default function DashBoard() {

  const { dailyReflection , genrateDailyReflection } = useProgress();

  // useEffect(() => {
  //   genrateDailyReflection();
  // }, [])
 
  return (
    <div className="max-w-5xl mx-auto w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <UserInfoCard/>
        </div>
        <div className="md:col-span-1">
            <LevelProgressCard />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressCard/>
        <HabitSummary />
      </div>
    </div>
  )
}
