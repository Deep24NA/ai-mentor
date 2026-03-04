import { useHabits } from "../../context/HabitContext"
import { Target } from "lucide-react"

export default function HabitList() {
    const { habits, toggleHabit } = useHabits();

    if (habits.length === 0) {
        return (
            <div className="glass-card p-6 sm:p-8 text-center text-gray-400 flex flex-col items-center justify-center border-dashed border-2 border-white/10">
                <Target size={32} className="text-gray-600 mb-3" />
                <p className="text-sm font-medium text-gray-300">No habits yet</p>
                <p className="text-xs text-gray-500 mt-1">Let's start building consistency!</p>
            </div>
        );
    }
    return (
        <div className="glass-panel p-4 sm:p-5 rounded-2xl">
            <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-gray-200">Today's Focus</h3>

            <ul className="space-y-2 sm:space-y-3">
                {habits.map((habit) => (
                    <li key={habit._id} 
                        className={`flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                            habit.completedToday 
                            ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20" 
                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                        }`}
                        onClick={() => toggleHabit(habit._id)}
                    >
                        <div className="relative flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={habit.completedToday}
                                onChange={() => toggleHabit(habit._id)}
                                onClick={(e) => e.stopPropagation()}
                                className="peer appearance-none w-5 h-5 rounded border border-white/20 bg-black/20 checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] cursor-pointer transition-colors"
                            />
                            <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span
                            className={`flex-1 text-sm sm:text-base transition-colors ${
                                habit.completedToday ? "line-through text-gray-500" : "text-white"
                            }`}
                        >
                            {habit.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
