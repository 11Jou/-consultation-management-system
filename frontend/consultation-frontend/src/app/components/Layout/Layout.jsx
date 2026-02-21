import { Outlet, useLocation } from "react-router-dom";
import AuthLayout from "./AuthLayout.jsx";

export default function Layout() {
    const isAuthLayout = useLocation().pathname.includes("/dashboard");

    if (isAuthLayout) {
        return <AuthLayout />
    }
    return <Outlet />
}