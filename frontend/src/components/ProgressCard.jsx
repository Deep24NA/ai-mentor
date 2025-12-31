import React from 'react'
import { useProgress } from "../context/ProgressContext"

export default function ProgressCard() {
    const {streak , dailyReflection} = useProgress()
  return (
      <div className="p-4 bg-white rounded shadow space-y-2">
      <div className="text-sm">🔥 Streak: {streak} days</div>

      {dailyReflection ? (
        <p className="italic text-gray-700">
          {dailyReflection}
        </p>
      ) : (
        <p className="italic text-gray-400">
          Reflection will appear after today’s activity.
        </p>
      )}
    </div>
  )
}

