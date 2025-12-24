import { useHabits } from "../context/HabitContext"

export default function HabitSummary() {
    const { habits } = useHabits()

    if (habits.length === 0) {
        return (
            <p className="text-sm text-gray-500 mt-2">
                No habits yet. Add some from the Habits page.
            </p>
        )
    }

    const completed = habits.filter(h => h.completedToday).length;
    const total = habits.length;

    return (
        <div className="bg-white p-4 rounded shadow mt-4">
            <p className="text-sm text-gray-600">Today’s Habits</p>
            <p className="text-xl font-semibold">
                {completed} / {total} completed
            </p>

            <p className="text-xs text-gray-500 mt-1">
                Small steps count.
            </p>
        </div>
    )
}
