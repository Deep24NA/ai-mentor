import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  if (!isOpen) return null;

  const linkClass =
    "block px-3 py-2 rounded text-sm hover:bg-gray-700 hover:text-white";

  return (
    <aside className="w-56 bg-gray-800 text-gray-200 p-3">
      <nav className="space-y-1">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/habits" className={linkClass}>
          Habits
        </NavLink>

        <NavLink to="/chat" className={linkClass}>
          Mentor Chat
        </NavLink>
      </nav>
    </aside>
  );
}
