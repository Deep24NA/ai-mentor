import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import DashBoard from "./pages/DashBoard";
import MemoryVisualizer from "./pages/MemoryVisualizer";
import WeeklyIntelligence from "./pages/WeeklyIntelligence";
import Habit from "./pages/Habit";
import { ProgressProvider } from "./context/ProgressContext";
import { HabitProvider } from "./context/HabitContext";
import { UserStatsProvider } from "./context/UserStatsContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserStatsProvider>
          <HabitProvider>
            <ProgressProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected / App Routes with Sidebar & Navbar Layout */}
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/habits" element={<Habit />} />
                <Route path="/memory" element={<MemoryVisualizer />} />
                <Route path="/weekly-report" element={<WeeklyIntelligence />} />
                
                {/* Dummy links based on sidebar layout */}
                <Route path="/settings" element={<div className="text-white p-4">Settings Page Building...</div>} />
              </Route>
            </Routes>
          </ProgressProvider>
        </HabitProvider>
      </UserStatsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
