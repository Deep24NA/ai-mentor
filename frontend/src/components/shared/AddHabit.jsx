import React, { useState } from 'react'
import { useHabits } from '../../context/HabitContext'


export default function AddHabit() {
    const [title, setTitle] = useState("");
    const { addHabit } = useHabits();

    const handleAdd = () => {
        addHabit(title);
        setTitle("")
    }

    return (
        <div className="glass-card p-5 mb-6">
            <h3 className="text-sm font-medium mb-3 text-gray-200">Add a New Habit</h3>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="e.g. Meditate for 10 minutes..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder:text-gray-500"
                />

                <button
                    onClick={handleAdd}
                    disabled={!title.trim()}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                    Add Habit
                </button>
            </div>
        </div>
    )
}
