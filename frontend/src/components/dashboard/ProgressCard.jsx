import { useProgress } from "../../context/ProgressContext"

export default function ProgressCard() {
    const {streak , dailyReflection} = useProgress()
  return (
    <div className="glass-card p-5 sm:p-6 border border-white/5 relative overflow-hidden group h-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-500"></div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="bg-orange-500/20 p-1.5 sm:p-2 rounded-lg">
                <span className="text-orange-500 text-base sm:text-lg">🔥</span>
            </div>
            <div>
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase">Current Streak</p>
                <div className="text-lg sm:text-xl font-bold text-white">{streak} <span className="text-xs sm:text-sm text-gray-500 font-medium">days</span></div>
            </div>
        </div>

      <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/5">
      {dailyReflection ? (
        <p className="italic text-gray-200 text-xs sm:text-sm leading-relaxed">
          "{dailyReflection}"
        </p>
      ) : (
        <p className="italic text-gray-500 text-xs sm:text-sm">
          Reflection will appear after today's activity.
        </p>
      )}
      </div>
    </div>
  )
}
