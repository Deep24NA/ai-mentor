import { useAuth } from "../../context/AuthContext";
import { Star, Award, TrendingUp } from "lucide-react";

export default function LevelProgressCard() {
    const { user } = useAuth();

    if (!user) return null; // Wait for user to load

    // Gamification math based on backend logic (100 XP per level)
    const requiredXp = user.level * 100;
    const progressPercentage = (user.xp / requiredXp) * 100;

    return (
        <div className="glass-panel p-6 rounded-2xl border border-[var(--color-primary)]/20 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-[60px] group-hover:bg-yellow-500/20 transition-all duration-500"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Award size={18} className="text-yellow-500" /> Rank & Progression
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/10 text-[var(--color-primary)] border border-white/5 uppercase tracking-wider shadow-sm">
                    Level {user.level} Mentor
                </span>
            </div>

            <div className="relative z-10">
                <div className="flex items-end justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">{user.level}</span>
                        <span className="text-sm text-gray-500 font-medium">Lvl</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-bold text-white">{user.xp}</span>
                        <span className="text-xs text-gray-500 font-medium tracking-wide"> / {requiredXp} XP</span>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-[var(--color-primary)] to-yellow-500 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${progressPercentage}%` }}
                    >
                        {/* Shimmer effect on bar */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Star size={12} className="text-yellow-500" /> +20 XP for next reflection
                    </p>
                    <p className="text-xs text-[var(--color-secondary)] font-medium flex items-center gap-1">
                        <TrendingUp size={12} /> {requiredXp - user.xp} XP to Level {user.level + 1}
                    </p>
                </div>
            </div>
        </div>
    );
}
