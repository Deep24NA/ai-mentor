import ProgressCard from "../components/dashboard/ProgressCard"
import UserInfoCard from "../components/dashboard/UserInfoCard"
import HabitSummary from "../components/dashboard/HabitSummary"
import LevelProgressCard from "../components/dashboard/LevelProgressCard"
import { useProgress } from "../context/ProgressContext"

export default function DashBoard() {

  const { dailyReflection , genrateDailyReflection } = useProgress();

  // useEffect(() => {
  //   genrateDailyReflection();
  // }, [])
 
  return (
    <div className="max-w-6xl mx-auto w-full space-y-4 sm:space-y-6 pb-4 sm:pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2">
            <UserInfoCard/>
        </div>
        <div className="md:col-span-1">
            <LevelProgressCard />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <ProgressCard/>
        <HabitSummary />
      </div>
    </div>
  )
}
