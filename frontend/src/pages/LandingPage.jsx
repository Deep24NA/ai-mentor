import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center relative overflow-hidden text-gray-100 font-sans">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[var(--color-primary)]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-[var(--color-secondary)]/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Navigation Dummy for Landing */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <h1 className="text-xl font-semibold tracking-tight text-white flex gap-2 items-center">
            <Sparkles className="text-[var(--color-primary)]" size={20} /> AI <span className="text-gray-400">Mentor</span>
        </h1>
        {user ? (
            <Link to="/dashboard" className="text-sm font-medium hover:text-white text-gray-400 transition-colors">
                Dashboard
            </Link>
        ) : (
            <div className="flex gap-4 items-center">
                <Link to="/login" className="text-sm font-medium hover:text-white text-gray-400 transition-colors">
                    Login
                </Link>
                <Link to="/register" className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                    Sign Up
                </Link>
            </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.main 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center max-w-3xl px-6"
      >
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)]"
        >
          <Sparkles size={16} /> Welcome to the Future of Self-Growth
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Your Personal <br />  
          <span className="text-gradient">AI Mentor</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light">
          Track habits, reflect daily, and unlock your true potential using intelligent analytics and guided mentorship entirely powered by AI.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {user ? (
            <Link 
                to="/dashboard" 
                className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
                Enter Dashboard <ArrowRight size={20} />
            </Link>
          ) : (
            <Link 
                to="/login" 
                className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
                Get Started <ArrowRight size={20} />
            </Link>
          )}
        </motion.div>
      </motion.main>
    </div>
  );
}
