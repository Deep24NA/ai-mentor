import { Trophy, Flame, AlertCircle, ArrowRight, Activity, Brain, Target, Star } from "lucide-react";

export default function WeeklyIntelligence() {

    const intelligenceCard = {
        overallScore: 84,
        productivity: 88,
        stability: 72,
        learning: 92
    };

    return (
        <div className="max-w-4xl mx-auto w-full space-y-8">
            
            {/* Header section with Report Card Feel */}
            <div className="relative glass-card p-8 border border-[var(--color-primary)]/20 overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-full blur-[80px]"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold rounded-full mb-4 border border-[var(--color-primary)]/20">
                            <Activity size={14} /> Week of Oct 12 - Oct 18
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Weekly Intelligence <span className="text-[var(--color-secondary)]">Report</span></h2>
                        <p className="text-gray-400 font-medium">Your AI-generated behavioral analysis based on 5 reflection sessions.</p>
                    </div>

                    <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-full border-[6px] border-[var(--color-primary)] bg-black/40 shadow-[0_0_30px_rgba(139,92,246,0.2)] w-32 h-32 relative">
                        <span className="text-4xl font-black text-white">{intelligenceCard.overallScore}</span>
                        <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">Growth Index</span>
                    </div>
                </div>
            </div>

            {/* detailed scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-500/10 rounded-xl text-green-500"><Target size={20} /></div>
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Productivity</p>
                            <p className="text-lg font-bold text-white mt-0.5">Focus Heavy</p>
                        </div>
                    </div>
                    <span className="text-2xl font-black text-green-400">{intelligenceCard.productivity}</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500"><Brain size={20} /></div>
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Stability</p>
                            <p className="text-lg font-bold text-white mt-0.5">Moderate</p>
                        </div>
                    </div>
                    <span className="text-2xl font-black text-blue-400">{intelligenceCard.stability}</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500"><Star size={20} /></div>
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Learning</p>
                            <p className="text-lg font-bold text-white mt-0.5">Accelerated</p>
                        </div>
                    </div>
                    <span className="text-2xl font-black text-purple-400">{intelligenceCard.learning}</span>
                </div>
            </div>

            {/* Highlights Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 border-t-4 border-t-green-500 bg-gradient-to-b from-green-500/5 to-transparent">
                    <h3 className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2">
                        <Trophy size={18} /> BIGGEST WIN
                    </h3>
                    <p className="text-white font-medium text-lg leading-snug mb-2">You maintained deep work blocks for 3 consecutive days.</p>
                    <p className="text-sm text-gray-400">Your AI detected a 40% reduction in procrastination mentions compared to last week.</p>
                </div>

                <div className="glass-card p-6 border-t-4 border-t-red-500 bg-gradient-to-b from-red-500/5 to-transparent">
                    <h3 className="text-sm font-bold text-red-500 mb-4 flex items-center gap-2">
                        <AlertCircle size={18} /> MAJOR STRUGGLE
                    </h3>
                    <p className="text-white font-medium text-lg leading-snug mb-2">Evening energy crashes lead to skipped workout habits.</p>
                    <p className="text-sm text-gray-400">You repeatedly mentioned feeling "too drained" by 6 PM to complete your fitness goals.</p>
                </div>
            </div>

            {/* Action Plan */}
            <div className="glass-panel p-6 rounded-2xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-3xl"></div>
                
                <h3 className="text-sm font-bold text-[var(--color-primary)] mb-4 flex items-center gap-2">
                    <Flame size={18} /> NEXT WEEK'S FOCUS
                </h3>
                
                <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-4 p-4 glass-card bg-black/20 border-white/5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold shrink-0">1</div>
                        <div>
                            <h4 className="text-white font-medium mb-1">Shift workouts to the morning</h4>
                            <p className="text-sm text-gray-400">To combat the evening crashes, try 20 minutes of morning movement before checking notifications.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 glass-card bg-black/20 border-white/5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold shrink-0">2</div>
                        <div>
                            <h4 className="text-white font-medium mb-1">Maintain the Deep Work Streak</h4>
                            <p className="text-sm text-gray-400">You've found your groove with 90-minute focus blocks. Let's aim to hit that consistently next week.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end relative z-10">
                    <button className="flex items-center gap-2 text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 px-6 py-2.5 rounded-lg transition-colors">
                        Add Focus to Habits <ArrowRight size={16} />
                    </button>
                </div>
            </div>
            
        </div>
    );
}
