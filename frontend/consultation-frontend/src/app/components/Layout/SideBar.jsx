import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useSelector } from "react-redux";
import { setSidebarOpen } from "../../store/slices/uiSlice";

const navItems = [
  { to: "/dashboard/patients", label: "Patients" },
  { to: "/dashboard/consultations", label: "Consultations" },
];

export default function SideBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCloseSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth < 768) {
      dispatch(setSidebarOpen(false));
    }
  };

  return (
    <>
      {/* Backdrop — always in the DOM so the opacity transition plays on close */}
      <div
        aria-hidden="true"
        onClick={handleCloseSidebar}
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-200 md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`
          w-56 min-h-screen bg-slate-800 text-slate-100 flex flex-col shrink-0
          fixed md:relative inset-y-0 left-0 z-40
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <span className="font-semibold text-lg">Consultation</span>
          <button
            type="button"
            onClick={handleCloseSidebar}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
      <nav className="p-3 flex flex-col gap-1">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={handleNavLinkClick}
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
    </>
  );
}
