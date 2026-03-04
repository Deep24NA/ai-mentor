import { useState } from 'react'
import { useHabits } from '../../context/HabitContext'
import { Plus } from 'lucide-react'

export default function AddHabit() {
    const [title, setTitle] = useState("");
    const { addHabit } = useHabits();

    const handleAdd = () => {
        addHabit(title);
        setTitle("")
    }

    return (
        <div className="glass-card p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-medium mb-2.5 sm:mb-3 text-gray-200">Add a New Habit</h3>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <input
                    type="text"
                    placeholder="e.g. Meditate for 10 minutes..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-3.5 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder:text-gray-500"
                />

                <button
                    onClick={handleAdd}
                    disabled={!title.trim()}
                    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 text-white px-5 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20"
                >
                    <Plus size={16} />
                    <span>Add Habit</span>
                </button>
            </div>
        </div>
    )
}
