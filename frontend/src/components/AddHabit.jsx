import React, { useState } from 'react'
import { useHabits } from '../context/HabitContext'


export default function AddHabit() {
    const [title, setTitle] = useState("");
    const { addHabit } = useHabits();

    const handleAdd = () => {
        addHabit(title);
        setTitle("")
    }

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-sm font-semibold mb-2">Add a habit</h3>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="e.g. Study Mathematics"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-sm"
                />

                <button
                    onClick={handleAdd}
                    className="bg-black text-white px-3 py-1 rounded text-sm"
                >
                    Add
                </button>
            </div>
        </div>
    )
}
