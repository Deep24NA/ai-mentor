import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BrainCircuit, TrendingUp, TrendingDown, Target } from "lucide-react";

export default function MemoryVisualizer() {

    // Dummy data for AI Mentor Visualization
    const emotionData = [
        { day: 'Mon', focus: 60, calm: 40, stress: 80 },
        { day: 'Tue', focus: 75, calm: 50, stress: 60 },
        { day: 'Wed', focus: 85, calm: 70, stress: 40 },
        { day: 'Thu', focus: 65, calm: 60, stress: 55 },
        { day: 'Fri', focus: 90, calm: 80, stress: 30 },
        { day: 'Sat', focus: 40, calm: 90, stress: 20 },
        { day: 'Sun', focus: 70, calm: 75, stress: 45 },
    ];

    const topicsData = [
        { name: 'Productivity', count: 12 },
        { name: 'Career Growth', count: 8 },
        { name: 'Fitness', count: 6 },
        { name: 'Anxiety', count: 4 },
        { name: 'Learning', count: 9 },
    ];

    const improvements = [
        "Consistent morning routines (+15% focus)",
        "Better handling of career stress",
        "More mindful breaks during deep work"
    ];

    const struggles = [
        "Late night phone usage",
        "Skipping planned workouts on Thursdays"
    ];

    return (
        <div className="max-w-6xl mx-auto w-full space-y-6">
            <div className="glass-card p-6 border border-[var(--color-primary)]/20 bg-gradient-to-br from-white/5 to-[var(--color-primary)]/5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[var(--color-primary)]/20 rounded-lg">
                        <BrainCircuit className="text-[var(--color-primary)]" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Memory Visualizer</h2>
                </div>
                <p className="text-gray-400 font-medium ml-[52px]">
                    See how your habits, emotions, and thoughts have evolved over time based on your reflections.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Trends */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Emotion Line Chart */}
                    <div className="glass-panel p-5 rounded-2xl border border-white/5">
                        <h3 className="text-sm font-medium mb-4 text-gray-200 flex items-center gap-2">
                            <TrendingUp size={16} /> 7-Day Emotional Trend
                        </h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={emotionData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#ffffff20', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="focus" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-primary)' }} />
                                    <Line type="monotone" dataKey="calm" stroke="var(--color-secondary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-secondary)' }} />
                                    <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex gap-4 mt-4 justify-center text-xs text-gray-400">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span> Focus</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-secondary)]"></span> Calm</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Stress</span>
                        </div>
                    </div>

                    {/* Topics Bar Chart */}
                    <div className="glass-panel p-5 rounded-2xl border border-white/5">
                        <h3 className="text-sm font-medium mb-4 text-gray-200 flex items-center gap-2">
                            <Target size={16} /> Most Discussed Topics
                        </h3>
                        <div className="h-52 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topicsData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                    <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis dataKey="name" type="category" stroke="#e5e7eb" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        cursor={{fill: '#ffffff05'}}
                                        contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#ffffff20', borderRadius: '12px' }}
                                    />
                                    <Bar dataKey="count" fill="var(--color-primary)" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column - Insights */}
                <div className="space-y-6">
                    {/* Detected Improvements */}
                    <div className="glass-panel p-5 rounded-2xl border border-green-500/20 bg-green-500/5 h-full">
                        <h3 className="text-sm font-medium mb-4 text-green-400 flex items-center gap-2">
                            <TrendingUp size={16} /> AI Detected Improvements
                        </h3>
                        <ul className="space-y-4">
                            {improvements.map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-gray-200 items-start">
                                    <span className="text-green-500 shrink-0 mt-0.5">✦</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Struggling Areas */}
                    <div className="glass-panel p-5 rounded-2xl border border-red-500/20 bg-red-500/5 h-full">
                        <h3 className="text-sm font-medium mb-4 text-red-400 flex items-center gap-2">
                            <TrendingDown size={16} /> Subconscious Friction Points
                        </h3>
                        <ul className="space-y-4">
                            {struggles.map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-gray-200 items-start">
                                    <span className="text-red-500 shrink-0 mt-0.5">▪</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t border-red-500/10">
                            <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded-lg transition-colors">
                                Discuss with Mentor →
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
