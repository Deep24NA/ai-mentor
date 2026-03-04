import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 768 : true
    );

    return (
        <div className="h-screen flex flex-col bg-[var(--color-background)] text-gray-100 overflow-hidden relative">
            {/* Background glowing orbs for subtle depth */}
            <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-[120px] pointer-events-none" />

            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                
                {/* Mobile Overlay - starts below navbar so it never covers it */}
                {isSidebarOpen && (
                    <div 
                        className="fixed top-14 sm:top-16 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <main className="flex-1 pt-3 px-3 sm:pt-4 sm:px-4 md:pt-6 md:px-6 overflow-y-auto [scrollbar-gutter:stable]">
                    <motion.div
                        key={typeof window !== 'undefined' ? window.location.pathname : ''}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>
        </div>
    );
}