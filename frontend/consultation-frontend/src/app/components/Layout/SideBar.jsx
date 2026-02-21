import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function SideBar() {
  return (
    <aside className="w-56 min-h-screen bg-slate-800 text-slate-100 flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-700">
        <span className="font-semibold text-lg">Consultation</span>
      </div>
      <nav className="p-3 flex flex-col gap-1">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-slate-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
