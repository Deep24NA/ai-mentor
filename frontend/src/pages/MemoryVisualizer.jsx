import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BrainCircuit, TrendingUp, TrendingDown, Target, Loader2 } from "lucide-react";
import { fetchMemoryInsights } from '../services/reflection.api';

export default function MemoryVisualizer() {
    const [loading, setLoading] = useState(true);
    const [insights, setInsights] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadInsights = async () => {
            try {
                const res = await fetchMemoryInsights();
                if (res.success && res.data) {
                    setInsights(res.data);
                } else {
                    setError(res.error || "Failed to load memory insights.");
                }
            } catch (err) {
                setError("An error occurred while fetching your visualization.");
            } finally {
                setLoading(false);
            }
        };
        loadInsights();
    }, []);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto w-full flex flex-col items-center justify-center min-h-[50vh] text-gray-400 space-y-4 px-4">
                <Loader2 size={36} className="animate-spin text-[var(--color-primary)] sm:w-[40px] sm:h-[40px]" />
                <p className="font-medium animate-pulse text-sm sm:text-base text-center">Rendering your cognitive patterns...</p>
            </div>
        );
    }

    if (error || !insights) {
         return (
            <div className="max-w-6xl mx-auto w-full flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="relative mb-6 sm:mb-8">
                    <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-3xl rounded-full"></div>
                    <div className="relative p-5 sm:p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                        <BrainCircuit size={48} className="text-[var(--color-primary)] opacity-80 sm:w-[64px] sm:h-[64px]" />
                    </div>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Your Cognitive Map is Building</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    We haven't collected enough reflection data to visualize your patterns yet. 
                    Start chatting with your AI Mentor to begin building your memory database.
                </p>

                <a 
                    href="/chat" 
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[var(--color-primary)]/25 text-sm sm:text-base"
                >
                    Start First Reflection
                    <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                
                <p className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-[0.2em]">
                    Requires at least 1 reflection to begin analysis
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto w-full space-y-4 sm:space-y-6 pb-4 sm:pb-6">
            <div className="glass-card p-5 sm:p-6 border border-[var(--color-primary)]/20 bg-gradient-to-br from-white/5 to-[var(--color-primary)]/5">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className="p-1.5 sm:p-2 bg-[var(--color-primary)]/20 rounded-lg">
                        <BrainCircuit className="text-[var(--color-primary)]" size={20} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Memory Visualizer</h2>
                </div>
                <p className="text-gray-400 font-medium text-xs sm:text-base ml-[40px] sm:ml-[52px]">
                    See how your habits, emotions, and thoughts have evolved over time.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                {/* Left Column - Trends */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {/* Emotion Line Chart */}
                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/5">
                        <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-gray-200 flex items-center gap-2">
                            <TrendingUp size={14} className="sm:w-[16px] sm:h-[16px]" /> 7-Day Emotional Trend
                        </h3>
                        <div className="h-48 sm:h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={insights.emotionData || []} margin={{ top: 5, right: 10, bottom: 5, left: -25 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="focus" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3, fill: 'var(--color-primary)' }} />
                                    <Line type="monotone" dataKey="calm" stroke="var(--color-secondary)" strokeWidth={2.5} dot={{ r: 3, fill: 'var(--color-secondary)' }} />
                                    <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3, fill: '#ef4444' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-4 justify-center text-[10px] sm:text-xs text-gray-400">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span> Focus</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-secondary)]"></span> Calm</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Stress</span>
                        </div>
                    </div>

                    {/* Topics Bar Chart */}
                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/5">
                        <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-gray-200 flex items-center gap-2">
                            <Target size={14} className="sm:w-[16px] sm:h-[16px]" /> Most Discussed Topics
                        </h3>
                        <div className="h-40 sm:h-52 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={insights.topicsData || []} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                    <XAxis type="number" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis dataKey="name" type="category" stroke="#e5e7eb" fontSize={11} tickLine={false} axisLine={false} width={65} />
                                    <Tooltip 
                                        cursor={{fill: '#ffffff05'}}
                                        contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }}
                                    />
                                    <Bar dataKey="count" fill="var(--color-primary)" radius={[0, 4, 4, 0]} barSize={16} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column - Insights */}
                <div className="space-y-4 sm:space-y-6">
                    {/* Detected Improvements */}
                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
                        <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-green-400 flex items-center gap-2">
                            <TrendingUp size={14} className="sm:w-[16px] sm:h-[16px]" /> AI Detected Improvements
                        </h3>
                        <ul className="space-y-3 sm:space-y-4">
                            {insights.improvements?.map((item, idx) => (
                                <li key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-200 items-start">
                                    <span className="text-green-500 shrink-0 mt-0.5">✦</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Struggling Areas */}
                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
                        <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-red-400 flex items-center gap-2">
                            <TrendingDown size={14} className="sm:w-[16px] sm:h-[16px]" /> Subconscious Friction Points
                        </h3>
                        <ul className="space-y-3 sm:space-y-4">
                            {insights.struggles?.map((item, idx) => (
                                <li key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-200 items-start">
                                    <span className="text-red-500 shrink-0 mt-0.5">▪</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-red-500/10">
                            <a href="/chat" className="block w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded-lg transition-colors text-center">
                                Discuss with Mentor →
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
