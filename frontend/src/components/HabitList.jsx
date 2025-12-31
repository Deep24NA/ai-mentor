import { useHabits } from "../context/HabitContext"

export default function HabitList() {
    const { habits, toggleHabit } = useHabits();

    if (habits === 0) {
        return (
            <p className="text-sm text-gray-500">
                No habits yet. Add one to get started.
            </p>
        );
    }
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-semibold mb-2">Today’s habits</h3>

            <ul className="space-y-2">
                {habits.map((habit) => (
                    <li key={habit._id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={habit.completedToday}
                            onChange={() => toggleHabit(habit._id)}
                        />
                        <span
                            className={
                                habit.completedToday ? "line-through text-gray-400" : ""
                            }
                        >
                            {habit.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
