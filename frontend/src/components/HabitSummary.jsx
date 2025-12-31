import { useHabits } from "../context/HabitContext"

export default function HabitSummary() {
    const { habits , completedTodayCount} = useHabits()

    if (habits.length === 0) {
        return (
            <div className="p-4 bg-white rounded shadow text-gray-600">
                <p className="font-medium">No habits yet</p>
                <p className="text-sm mt-1">
                    Start with one small habit to build consistency.
                </p>
            </div>
        )
    }

    const total = habits.length;

    return (
        <div className="bg-white p-4 rounded shadow mt-4">
            <p className="text-sm text-gray-600">Today’s Habits</p>
            <p className="text-xl font-semibold">
                {completedTodayCount} / {total} completed
            </p>

            <p className="text-xs text-gray-500 mt-1">
                Small steps count.
            </p>
        </div>
    )
}
