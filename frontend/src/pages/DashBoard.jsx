import AppLayout from "../layout/AppLayout"
import ProgressCard from "../components/ProgressCard"
import UserInfoCard from "../components/UserInfoCard"
import HabitSummary from "../components/HabitSummary"
export default function DashBoard() {
 
  return (
    <AppLayout>
      <UserInfoCard/>
      <ProgressCard/>
      <HabitSummary />
    </AppLayout>
  )
}
