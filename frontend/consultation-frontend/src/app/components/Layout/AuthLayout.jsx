import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return(
    <div className="flex min-h-screen bg-slate-50" >
        <SideBar />
        <main className="flex-1 overflow-auto p-6">
            <Outlet />
        </main>
    </div>
  )
}
