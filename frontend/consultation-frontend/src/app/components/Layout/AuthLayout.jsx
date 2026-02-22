import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function AuthLayout() {
  return(
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" >
        <SideBar />
        <main className="flex-1 overflow-auto py-10 px-6">
            <Outlet />
        </main>
    </div>
  )
}
