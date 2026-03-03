import AppLayout from "../layout/AppLayout"
import AddHabit from "../components/shared/AddHabit"
import HabitList from "../components/shared/HabitList"


export default function Habit() {
  return (
    <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Habits</h2>
        <AddHabit/>
        <HabitList/>
    </div>
  )
}
