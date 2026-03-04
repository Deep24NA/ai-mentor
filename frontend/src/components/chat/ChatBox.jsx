import { useState, useEffect, useRef } from "react";
import { sendMessage, fetchChatHistory } from "../../services/api";
import Message from "./Message";
import { useProgress } from "../../context/ProgressContext";
import { useHabits } from "../../context/HabitContext";
import { Sparkles, Send } from "lucide-react";

const CATEGORIES = ["General", "Productivity", "Career", "Fitness", "Learning", "Personal"];
const PERSONALITIES = ["Friendly Assistant", "Strict Coach", "Socratic Guide", "Calm Therapist", "Tech Guru", "Hyper Motivator"];

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("chat");
  const [category, setCategory] = useState("General");
  const [personality, setPersonality] = useState("Friendly Assistant");

  const { streak, messagesToday } = useProgress();
  const { completedTodayCount, habits } = useHabits();
  const messagesEndRef = useRef(null);

  useEffect(() => {
     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const loadHistory = async () => {
        const history = await fetchChatHistory();
        if (history && history.length > 0) {
            const formattedMessages = history.reverse().reduce((acc, chat) => {
                acc.push({ text: chat.usermessage, sender: "user" });
                acc.push({ text: chat.aiResponse, sender: "mentor" });
                return acc;
            }, []);
            setMessages(formattedMessages);
        }
    };
    loadHistory();
  }, []);

  const getSmartPrompts = () => {
    if (mode === 'reflection') {
        return [
            "What did I improve this week?",
            "What was my biggest hurdle?",
            "How can I better focus tomorrow?"
        ];
    }
    const prompts = {
        "Productivity": ["How can I stop procrastinating?", "Help me plan my day"],
        "Career": ["Review my recent progress", "How to prepare for an interview?"],
        "Fitness": ["Give me a quick workout plan", "How to stay consistent?"],
        "Learning": ["How to memorize faster?", "Best way to learn a new skill?"],
        "Personal": ["How to handle stress better?", "What should I focus on?"]
    };
    return prompts[category] || ["Analyze my last reflection", "Give me some motivation", "Help me build a new habit"];
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    const reply = await sendMessage({
      message: currentInput,
      mode,
      category,
      personality,
      streak,
      messagesToday,
      completedTodayCount,
      totalHabits: habits.length,
    });

    setMessages((prev) => [
      ...prev,
      { text: reply, sender: "mentor" },
    ]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl glass-panel overflow-hidden border border-white/10 shadow-lg relative">
      <div className="absolute top-[0%] left-[0%] w-[300px] h-[300px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header with Mode & Categories */}
      <div className="border-b border-white/5 py-2.5 sm:py-3 px-3 sm:px-4 shrink-0 bg-white/5 backdrop-blur-md z-10 w-full flex flex-col gap-2 sm:gap-3">
        {/* Top row: Mode toggle + Persona */}
        <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
             {/* Mode Toggle */}
             <div className="flex bg-black/40 p-0.5 sm:p-1 rounded-lg border border-white/5 shrink-0">
                <button 
                    onClick={() => setMode('chat')}
                    className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${mode === 'chat' ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                    Chat
                </button>
                <button 
                    onClick={() => setMode('reflection')}
                    className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${mode === 'reflection' ? 'bg-[var(--color-secondary)] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                    Reflection
                </button>
            </div>

            {/* AI Personality Selector */}
            <select
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="bg-black/40 border border-white/10 text-gray-300 text-xs sm:text-sm rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] block py-1.5 px-2 sm:px-3 appearance-none hover:bg-black/60 cursor-pointer shadow-sm transition-colors"
                title="Select AI Persona"
            >
                {PERSONALITIES.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
        </div>

        {/* Categories - scrollable */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-0.5">
            {CATEGORIES.map(cat => (
                <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border transition-colors whitespace-nowrap ${category === cat ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Messages Area */}
      <div
        className={`flex-1 p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 overflow-y-auto z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent ${messages.length > 6 ? "max-h-full" : ""}`}
      >
        {messages.length === 0 && (
            <div className="m-auto text-center flex flex-col items-center justify-center opacity-50">
                <div className="text-3xl sm:text-4xl mb-2">{mode === 'reflection' ? '🧘' : '🧠'}</div>
                <p className="text-gray-400 font-medium text-sm sm:text-base">
                    {mode === 'reflection' ? "Ready to reflect on your progress?" : `Let's discuss ${category.toLowerCase()}`}
                </p>
            </div>
        )}
        {messages.map((msg, idx) => (
          <Message key={idx} text={msg.text} sender={msg.sender} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 self-start glass-card px-3 sm:px-4 py-2 border-none">
            <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-bounce"></span>
            </span>
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer / Input Area */}
      <div className="p-3 sm:p-4 border-t border-white/5 bg-white/5 backdrop-blur-md z-10 shrink-0 flex flex-col gap-2 sm:gap-3">
        {/* Smart Prompts */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
            <Sparkles size={14} className="text-[var(--color-primary)] shrink-0 self-center sm:w-[16px] sm:h-[16px]" />
            {getSmartPrompts().map((prompt, i) => (
                <button 
                    key={i}
                    onClick={() => setInput(prompt)}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 glass-card text-[10px] sm:text-xs text-gray-300 hover:text-white hover:border-[var(--color-primary)]/50 whitespace-nowrap transition-colors"
                >
                    {prompt}
                </button>
            ))}
        </div>

        <div className="flex gap-2">
            <input
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-transparent transition-all placeholder:text-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={mode === 'reflection' ? "Type your reflection..." : `Ask about ${category.toLowerCase()}...`}
            />
            <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className={`text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${mode === 'reflection' ? 'bg-gradient-to-tr from-[var(--color-secondary)] to-blue-500' : 'bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)]'}`}
            >
            <span className="hidden sm:inline">Send</span>
            <Send size={16} className="sm:hidden" />
            </button>
        </div>
      </div>
    </div>
  );
}
