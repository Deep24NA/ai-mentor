import { useState, useEffect } from "react";
import { Trophy, Flame, AlertCircle, ArrowRight, Activity, Brain, Target, Star, Loader2, Check } from "lucide-react";
import { fetchWeeklySummary } from "../services/reflection.api";
import { useHabits } from "../context/HabitContext";

export default function WeeklyIntelligence() {
    const { addHabit } = useHabits();
    const [loading, setLoading] = useState(true);
    const [addingHabits, setAddingHabits] = useState(false);
    const [added, setAdded] = useState(false);
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSummary = async () => {
            try {
                const res = await fetchWeeklySummary();
                if (res.success && res.summary) {
                    setReport(res.summary);
                } else {
                    setError(res.error || "Failed to load summary.");
                }
            } catch (err) {
                setError("An error occurred while fetching your intelligence report.");
            } finally {
                setLoading(false);
            }
        };
        loadSummary();
    }, []);

    const handleAddHabits = async () => {
        if (!report?.actionPlan || addingHabits || added) return;
        
        setAddingHabits(true);
        try {
            for (const item of report.actionPlan) {
                await addHabit(item.title);
            }
            setAdded(true);
            setTimeout(() => setAdded(false), 3000);
        } catch (err) {
            console.error("Failed to add habits:", err);
        } finally {
            setAddingHabits(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center min-h-[50vh] text-gray-400 space-y-4 px-4">
                <Loader2 size={36} className="animate-spin text-[var(--color-primary)] sm:w-[40px] sm:h-[40px]" />
                <p className="font-medium animate-pulse text-sm sm:text-base text-center">Synthesizing your weekly behavioral patterns...</p>
            </div>
        );
    }

    if (error || !report) {
         return (
            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                 <div className="relative mb-6 sm:mb-8">
                    <div className="absolute inset-0 bg-[var(--color-secondary)]/20 blur-3xl rounded-full"></div>
                    <div className="relative p-5 sm:p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                        <Activity size={48} className="text-[var(--color-secondary)] opacity-80 sm:w-[64px] sm:h-[64px]" />
                    </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Analysis in Progress</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Your weekly intelligence report is synthesized from your daily reflections. 
                    Complete more habits and share your thoughts with your mentor to unlock this week's report.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
                    <a 
                        href="/chat" 
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all border border-white/10 text-sm"
                    >
                        Talk to Mentor
                    </a>
                    <a 
                        href="/habits" 
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-medium rounded-xl transition-all text-sm shadow-lg shadow-[var(--color-primary)]/20"
                    >
                        Check Habits
                        <ArrowRight size={16} />
                    </a>
                </div>

                <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl w-full">
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[var(--color-primary)] font-bold text-lg sm:text-xl mb-0.5 sm:mb-1">Step 1</div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Log your daily habits</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5">
                         <div className="text-[var(--color-secondary)] font-bold text-lg sm:text-xl mb-0.5 sm:mb-1">Step 2</div>
                         <p className="text-[10px] sm:text-xs text-gray-500">Reflect with AI Mentor</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5">
                         <div className="text-green-500 font-bold text-lg sm:text-xl mb-0.5 sm:mb-1">Step 3</div>
                         <p className="text-[10px] sm:text-xs text-gray-500">Unlock Weekly Insights</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto w-full space-y-4 sm:space-y-6 md:space-y-8 pb-4 sm:pb-6">
            
            {/* Header section with Report Card Feel */}
            <div className="relative glass-card p-5 sm:p-8 border border-[var(--color-primary)]/20 overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-full blur-[80px]"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] sm:text-xs font-semibold rounded-full mb-3 sm:mb-4 border border-[var(--color-primary)]/20">
                            <Activity size={12} className="sm:w-[14px] sm:h-[14px]" /> Weekly Analysis Report
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1 sm:mb-2">Weekly Intelligence <span className="text-[var(--color-secondary)]">Report</span></h2>
                        <p className="text-gray-400 font-medium text-xs sm:text-base">Your AI-generated behavioral analysis based on your recent reflections.</p>
                    </div>

                    <div className="shrink-0 flex flex-col items-center justify-center p-4 sm:p-6 rounded-full border-4 sm:border-[6px] border-[var(--color-primary)] bg-black/40 shadow-[0_0_30px_rgba(139,92,246,0.2)] w-24 h-24 sm:w-32 sm:h-32 relative">
                        <span className="text-3xl sm:text-4xl font-black text-white">{report.scores?.overallScore || 0}</span>
                        <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5 sm:mt-1">Growth Index</span>
                    </div>
                </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="p-2 sm:p-2.5 bg-green-500/10 rounded-xl text-green-500"><Target size={18} className="sm:w-[20px] sm:h-[20px]" /></div>
                        <div>
                            <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">Productivity</p>
                            <p className="text-base sm:text-lg font-bold text-white mt-0.5">{report.scores?.productivity >= 80 ? 'Heavy' : report.scores?.productivity >= 50 ? 'Moderate' : 'Needs Focus'}</p>
                        </div>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-green-400">{report.scores?.productivity || 0}</span>
                </div>

                <div className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="p-2 sm:p-2.5 bg-blue-500/10 rounded-xl text-blue-500"><Brain size={18} className="sm:w-[20px] sm:h-[20px]" /></div>
                        <div>
                            <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">Stability</p>
                            <p className="text-base sm:text-lg font-bold text-white mt-0.5">{report.scores?.stability >= 80 ? 'High' : report.scores?.stability >= 50 ? 'Moderate' : 'Low'}</p>
                        </div>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-blue-400">{report.scores?.stability || 0}</span>
                </div>

                <div className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="p-2 sm:p-2.5 bg-purple-500/10 rounded-xl text-purple-500"><Star size={18} className="sm:w-[20px] sm:h-[20px]" /></div>
                        <div>
                            <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">Learning</p>
                            <p className="text-base sm:text-lg font-bold text-white mt-0.5">{report.scores?.learning >= 80 ? 'Accelerated' : report.scores?.learning >= 50 ? 'Steady' : 'Slow'}</p>
                        </div>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-purple-400">{report.scores?.learning || 0}</span>
                </div>
            </div>

            {/* Highlights Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="glass-card p-5 sm:p-6 border-t-4 border-t-green-500 bg-gradient-to-b from-green-500/5 to-transparent">
                    <h3 className="text-xs sm:text-sm font-bold text-green-400 mb-3 sm:mb-4 flex items-center gap-2">
                        <Trophy size={16} className="sm:w-[18px] sm:h-[18px]" /> BIGGEST WIN
                    </h3>
                    <p className="text-white font-medium text-base sm:text-lg leading-snug mb-1.5 sm:mb-2">{report.highlights?.biggestWin?.title || "Consistent Effort"}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{report.highlights?.biggestWin?.description || "You showed positive signs of growth this week."}</p>
                </div>

                <div className="glass-card p-5 sm:p-6 border-t-4 border-t-red-500 bg-gradient-to-b from-red-500/5 to-transparent">
                    <h3 className="text-xs sm:text-sm font-bold text-red-500 mb-3 sm:mb-4 flex items-center gap-2">
                        <AlertCircle size={16} className="sm:w-[18px] sm:h-[18px]" /> MAJOR STRUGGLE
                    </h3>
                    <p className="text-white font-medium text-base sm:text-lg leading-snug mb-1.5 sm:mb-2">{report.highlights?.majorStruggle?.title || "Finding Balance"}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{report.highlights?.majorStruggle?.description || "Some areas require more focus next week."}</p>
                </div>
            </div>

            {/* Action Plan */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-3xl"></div>
                
                <h3 className="text-xs sm:text-sm font-bold text-[var(--color-primary)] mb-3 sm:mb-4 flex items-center gap-2">
                    <Flame size={16} className="sm:w-[18px] sm:h-[18px]" /> NEXT WEEK'S FOCUS
                </h3>
                
                <div className="space-y-3 sm:space-y-4 relative z-10">
                    {report.actionPlan?.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 glass-card bg-black/20 border-white/5 rounded-xl">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] text-sm sm:text-base font-bold shrink-0">{idx + 1}</div>
                            <div className="min-w-0">
                                <h4 className="text-white font-medium text-sm sm:text-base mb-0.5 sm:mb-1">{item.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 sm:mt-6 flex justify-end relative z-10">
                    <button 
                        onClick={handleAddHabits}
                        disabled={addingHabits || added}
                        className={`flex items-center gap-2 text-xs sm:text-sm font-semibold text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-300 ${
                            added 
                            ? "bg-green-500 shadow-lg shadow-green-500/20 cursor-default" 
                            : "bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 shadow-lg shadow-[var(--color-primary)]/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        }`}
                    >
                        {addingHabits ? (
                            <>
                                <Loader2 size={14} className="animate-spin sm:w-[16px] sm:h-[16px]" />
                                Adding...
                            </>
                        ) : added ? (
                            <>
                                <Check size={14} className="sm:w-[16px] sm:h-[16px]" />
                                Added to Habits!
                            </>
                        ) : (
                            <>
                                Add Focus to Habits <ArrowRight size={14} className="sm:w-[16px] sm:h-[16px]" />
                            </>
                        )}
                    </button>
                </div>
            </div>
            
        </div>
    );
}
