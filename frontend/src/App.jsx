import Chat from "./pages/Chat";
import DashBoard from "./pages/DashBoard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Habit from "./pages/Habit";
import { ProgressProvider } from "./context/ProgressContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HabitProvider } from "./context/HabitContext";

export default function App() {
  return (
    <BrowserRouter>
      <HabitProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/habits" element={<Habit />} />
          </Routes>
        </ProgressProvider>
      </HabitProvider>
    </BrowserRouter>
  );
}
