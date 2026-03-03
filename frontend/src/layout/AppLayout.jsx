import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="h-screen flex flex-col bg-[var(--color-background)] text-gray-100 overflow-hidden relative">
            {/* Background glowing orbs for subtle depth (Glassmorphism effect underneath) */}
            <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-[120px] pointer-events-none" />

            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex flex-1 overflow-hidden z-10 relative">
                <Sidebar isOpen={isSidebarOpen} />
                
                {/* Main Content Area */}
                <main className="flex-1 p-6 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="h-full"
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>
        </div>
    );
}