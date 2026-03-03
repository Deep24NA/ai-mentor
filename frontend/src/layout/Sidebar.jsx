import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, MessageSquare, BrainCircuit, Activity, Settings, Target } from "lucide-react";
import { cn } from "../utils/cn";

export default function Sidebar({ isOpen }) {
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Mentor Chat", path: "/chat", icon: MessageSquare },
    { name: "Memory", path: "/memory", icon: BrainCircuit },
    { name: "Weekly Report", path: "/weekly-report", icon: Activity },
    { name: "Habits", path: "/habits", icon: Target },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 240, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-[var(--color-surface)]/40 backdrop-blur-md border-r border-white/5 h-full flex flex-col pt-6 z-40 overflow-hidden whitespace-nowrap"
        >
          <nav className="flex-1 px-4 space-y-2 text-sm font-medium">
            {links.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-white/10 text-white shadow-sm border border-white/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon size={18} className="shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Settings Link */}
          <div className="px-4 pb-6 mt-auto">
             <NavLink 
                to="/settings" 
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-white/10 text-white shadow-sm border border-white/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Settings size={18} className="shrink-0" />
                <span>Settings</span>
              </NavLink>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
