import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


export default function AppLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <div className="h-screen flex flex-col">
            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} />

                <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}