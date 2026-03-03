import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserStats } from "../context/UserStatsContext";
import { useAuth } from "../context/AuthContext";
import { Menu, User, Zap, LogOut, Settings, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onToggleSidebar }) {
  const { stats } = useUserStats();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 glass-panel z-50 flex items-center justify-between px-6 border-b border-white/5 shadow-sm">
      
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-semibold text-xl tracking-tight text-white flex items-center gap-2">
          <Zap className="text-[var(--color-primary)] shrink-0" size={24} />
          <span>AI <span className="text-gray-400 font-light">Mentor</span></span>
        </h1>
      </div>

      {/* Right side: Smart Greeting mini view & Profile Dropdown */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-sm font-medium text-gray-200">Hello, {user?.name || stats?.username} 👋</span>
            <span className="text-xs text-gray-400">Level {user?.level || stats?.level} • {user?.xp || stats?.xp} XP</span>
        </div>
        
        <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
        >
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg border-2 border-transparent hover:border-white/20 transition-all">
                <User size={18} className="text-white" />
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
            {dropdownOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-14 w-56 bg-[#121212] backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl py-2 z-[60] overflow-hidden"
                >
                    <div className="px-4 py-3 border-b border-white/5 mb-1 bg-black/20">
                        <p className="text-sm font-medium text-white">{user?.name || 'Guest'}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email || 'Not logged in'}</p>
                    </div>

                    <NavLink 
                        to="/settings" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <Settings size={16} /> Account Settings
                    </NavLink>
                    
                    <button 
                        onClick={() => {
                            setDropdownOpen(false);
                            logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors mt-1"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </header>
  );
}
