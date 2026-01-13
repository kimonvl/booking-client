import { selectCurrentUser } from "@/store/auth/auth.selector";
import type { UserRole } from "@/store/auth/auth.types";
import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireRole({ role }: { role: UserRole }) {
    const user = useAppSelector(selectCurrentUser);

    if (!user) return <Navigate to={"/"} />

    if (user.role !== role) {
        return <Navigate to={user.role === "PARTNER" ? "/partner" : "/"} replace />
    }

    return <Outlet />;
}
