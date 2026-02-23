import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { setSidebarOpen } from "../../store/slices/uiSlice";
import SideBar from "./SideBar";

export default function AuthLayout() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setSidebarOpen(window.innerWidth >= 768));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SideBar />
      <main className="flex-1 overflow-auto py-10 px-6 relative">
        <button
          type="button"
          onClick={() => dispatch(setSidebarOpen(true))}
          className={`md:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition-colors ${sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <Outlet />
      </main>
    </div>
  );
}
