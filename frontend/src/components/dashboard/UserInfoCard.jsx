import { useAuth } from "../../context/AuthContext";
import { useHabits } from "../../context/HabitContext";
import { useProgress } from "../../context/ProgressContext";
import { Flame, BookOpen, CheckCircle2 } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function getSmartSubtitle({ completedTodayCount, totalTodayHabits, streak, reflectionsThisWeek }) {
  if (totalTodayHabits === 0) return "Start by adding your first habit below.";
  if (completedTodayCount === 0) return "Your habits are waiting — let's get the first one done.";
  if (completedTodayCount === totalTodayHabits) return `All ${totalTodayHabits} habits done today. You're on fire! 🎯`;
  const remaining = totalTodayHabits - completedTodayCount;
  if (streak >= 7) return `${streak}-day streak and counting — ${remaining} habit${remaining > 1 ? 's' : ''} left today.`;
  if (reflectionsThisWeek >= 4) return `${reflectionsThisWeek} reflections this week. Deep work pays off.`;
  return `${completedTodayCount} of ${totalTodayHabits} habits done. ${remaining} more to go today.`;
}

export default function UserInfoCard() {
  const { user } = useAuth();
  const { completedTodayCount, totalTodayHabits } = useHabits();
  const { streak, reflectionsThisWeek } = useProgress();

  const greeting = getGreeting();
  const firstName = user?.name?.split(' ')[0] || 'there';
  const subtitle = getSmartSubtitle({ completedTodayCount, totalTodayHabits, streak, reflectionsThisWeek });

  return (
    <div className="glass-card p-5 sm:p-8 border border-[var(--color-primary)]/20 bg-gradient-to-br from-white/5 to-[var(--color-primary)]/5 relative overflow-hidden h-full">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[80px]" />
      
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
          {greeting}, {firstName} <span className="inline-block hover:animate-pulse">👋</span>
        </h2>
        <p className="text-gray-400 font-medium text-sm sm:text-base mb-5 sm:mb-6">{subtitle}</p>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5">
            <div className="p-1 sm:p-1.5 bg-orange-500/20 rounded-lg shrink-0">
              <Flame size={14} className="text-orange-400 sm:w-[15px] sm:h-[15px]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium leading-none mb-0.5">Streak</p>
              <p className="text-white font-bold text-xs sm:text-sm">{streak} days</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5">
            <div className="p-1 sm:p-1.5 bg-green-500/20 rounded-lg shrink-0">
              <CheckCircle2 size={14} className="text-green-400 sm:w-[15px] sm:h-[15px]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium leading-none mb-0.5">Today</p>
              <p className="text-white font-bold text-xs sm:text-sm">
                {completedTodayCount}<span className="text-gray-500 font-normal text-[10px] sm:text-xs">/{totalTodayHabits}</span>
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5">
            <div className="p-1 sm:p-1.5 bg-[var(--color-secondary)]/20 rounded-lg shrink-0">
              <BookOpen size={14} className="text-[var(--color-secondary)] sm:w-[15px] sm:h-[15px]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium leading-none mb-0.5">Reflections</p>
              <p className="text-white font-bold text-xs sm:text-sm">{reflectionsThisWeek} <span className="text-gray-500 font-normal text-[10px] sm:text-xs">this wk</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
