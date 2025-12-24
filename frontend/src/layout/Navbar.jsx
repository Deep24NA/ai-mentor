import { NavLink } from "react-router-dom";

export default function Navbar({ onToggleSidebar }) {
  const linkClass =
    "text-sm text-gray-600 hover:text-black px-2";

  return (
    <header className="h-12 bg-white border-b flex items-center justify-between px-4">
      
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-lg text-gray-700"
        >
          ☰
        </button>

        <h1 className="font-semibold text-lg">AI Mentor</h1>
      </div>

      {/* Right side links */}
      <nav className="flex items-center gap-4">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>

        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>

        <NavLink to="/chat" className={linkClass}>
          Chat
        </NavLink>
      </nav>
    </header>
  );
}
