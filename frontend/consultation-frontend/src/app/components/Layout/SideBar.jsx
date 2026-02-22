import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const navItems = [
  { to: "/dashboard/patients", label: "Patients" },
  { to: "/dashboard/consultations", label: "Consultations" },
];

export default function SideBar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
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
              `px-3 py-2 rounded-lg transition-colors ${isActive
                ? "bg-slate-600 text-white"
                : "text-slate-300 hover:bg-white hover:text-slate-800"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto p-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-white hover:text-slate-800 transition-colors cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
