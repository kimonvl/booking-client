import { selectBootstrapStatus, selectCurrentUser } from "@/store/auth/auth.selector";
import type { UserRole } from "@/store/auth/auth.types";
import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireRole({ role }: { role: UserRole }) {
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const bootstrap = useAppSelector(selectBootstrapStatus);

  if (bootstrap !== "done") return null;

  if (!user) {
    const loginPath = location.pathname.startsWith("/partner")
      ? "/auth/partner/login"
      : "/auth/guest/login";
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (user.role !== role) {
    return <Navigate to={user.role === "PARTNER" ? "/partner" : "/"} replace />;
  }

  return <Outlet />;
}
