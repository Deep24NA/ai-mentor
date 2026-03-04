import AddHabit from "../components/shared/AddHabit"
import HabitList from "../components/shared/HabitList"


export default function Habit() {
  return (
    <div className="max-w-6xl mx-auto w-full space-y-4 sm:space-y-5 pb-4 sm:pb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Habits</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Build consistency, one day at a time.</p>
        </div>
        <AddHabit/>
        <HabitList/>
    </div>
  )
}
