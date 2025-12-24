import React from 'react'
import { useProgress } from "../context/ProgressContext"

export default function ProgressCard() {
    const {streak , messagesToday} = useProgress()
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Streak</p>
          <p className="text-2xl font-bold">🔥 {streak}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-2xl font-bold">💬 {messagesToday}</p>
        </div>
      </div>
    </div>
  )
}

