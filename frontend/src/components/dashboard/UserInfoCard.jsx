import React from 'react'
import { useAuth } from "../../context/AuthContext"

export default function UserInfoCard() {
    const { user } = useAuth();
    const hour = new Date().getHours();
    const greeting =
        hour < 12 ? "Good Morning" :
            hour < 18 ? "Good Afternoon" :
                "Good Evening";

    return (
        <div className="glass-card p-8 border border-[var(--color-primary)]/20 bg-gradient-to-br from-white/5 to-[var(--color-primary)]/5 mb-6 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[80px]"></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{greeting}, {user?.name?.split(' ')[0] || 'Guest'} <span className="inline-block hover:animate-pulse">👋</span></h2>
                <p className="text-gray-400 font-medium text-lg">
                    Let’s take today one step at a time.
                </p>
            </div>
        </div>
    )
}
