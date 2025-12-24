import AppLayout from "../layout/AppLayout"
import AddHabit from "../components/AddHabit"
import HabitList from "../components/HabitList"


export default function Habit() {
  return (
    <AppLayout>
        <h2 className="text-xl font-semibold mb-4">Habits</h2>
        <AddHabit/>
        <HabitList/>
    </AppLayout>
    
  )
}
