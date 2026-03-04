import { useHabits } from "../../context/HabitContext"

export default function HabitSummary() {
    const { habits , completedTodayCount} = useHabits()

    if (habits.length === 0) {
        return (
            <div className="glass-card p-5 sm:p-6 text-gray-400 border border-white/5 flex flex-col justify-center h-full">
                <p className="font-medium text-white text-sm sm:text-base">No habits yet</p>
                <p className="text-xs sm:text-sm mt-1">
                    Start with one small habit to build consistency.
                </p>
            </div>
        )
    }

    const total = habits.length;

    return (
        <div className="glass-card p-5 sm:p-6 border border-white/5 flex flex-col justify-center h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[var(--color-secondary)]/20 transition-colors duration-500"></div>
            <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">Today's Habits</p>
            <p className="text-2xl sm:text-3xl font-bold mt-1.5 sm:mt-2 text-white">
                <span className="text-[var(--color-secondary)]">{completedTodayCount}</span> <span className="text-gray-500 text-lg sm:text-xl font-medium">/ {total}</span>
            </p>

            <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3 flex items-center gap-1">
                Small steps count.
            </p>
        </div>
    )
}
