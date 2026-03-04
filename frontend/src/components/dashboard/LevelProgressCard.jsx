import { useAuth } from "../../context/AuthContext";
import { Star, Award, TrendingUp } from "lucide-react";

export default function LevelProgressCard() {
    const { user } = useAuth();

    if (!user) return null;

    const currentXp = user.xp || 0;
    const currentLevel = user.level || 1;
    const requiredXp = currentLevel * 100;
    const progressPercentage = Math.min(100, Math.max(0, (currentXp / requiredXp) * 100));

    return (
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-[var(--color-primary)]/20 relative overflow-hidden group h-full">
            {/* Background Glow */}
            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-[60px] group-hover:bg-yellow-500/20 transition-all duration-500"></div>
            
            <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                <h3 className="text-xs sm:text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Award size={16} className="text-yellow-500 sm:w-[18px] sm:h-[18px]" /> Rank & Progression
                </h3>
                <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-md bg-white/10 text-[var(--color-primary)] border border-white/5 uppercase tracking-wider shadow-sm">
                    Level {user.level}
                </span>
            </div>

            <div className="relative z-10">
                <div className="flex items-end justify-between mb-2">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-white">{user.level}</span>
                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Lvl</span>
                    </div>
                    <div className="text-right">
                        <span className="text-lg sm:text-xl font-bold text-white">{user.xp}</span>
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide"> / {requiredXp} XP</span>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="h-2.5 sm:h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-[var(--color-primary)] to-yellow-500 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${progressPercentage}%` }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-4 gap-2">
                    <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                        <Star size={11} className="text-yellow-500 sm:w-[12px] sm:h-[12px]" /> +20 XP per reflection
                    </p>
                    <p className="text-[10px] sm:text-xs text-[var(--color-secondary)] font-medium flex items-center gap-1">
                        <TrendingUp size={11} className="sm:w-[12px] sm:h-[12px]" /> {requiredXp - user.xp} XP to go
                    </p>
                </div>
            </div>
        </div>
    );
}
