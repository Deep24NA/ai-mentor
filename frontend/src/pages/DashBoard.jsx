import AppLayout from "../layout/AppLayout"
import ProgressCard from "../components/ProgressCard"
import UserInfoCard from "../components/UserInfoCard"
import HabitSummary from "../components/HabitSummary"
import { useProgress } from "../context/ProgressContext"
import { useEffect } from "react"

export default function DashBoard() {

  const { dailyReflection , genrateDailyReflection } = useProgress();

  // useEffect(() => {
  //   genrateDailyReflection();
  // }, [])
 
  return (
    <AppLayout>
      <UserInfoCard/>
      <ProgressCard/>
      <HabitSummary />
    </AppLayout>
  )
}
