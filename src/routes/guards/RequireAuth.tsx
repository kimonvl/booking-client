import { selectAccessToken, selectBootstrapStatus } from "@/store/auth/auth.selector";
import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const location = useLocation();
  const accessToken = useAppSelector(selectAccessToken);
  const bootstrap = useAppSelector(selectBootstrapStatus);

  if (bootstrap !== "done") return null;

  if (!accessToken) {
    const loginPath = location.pathname.startsWith("/partner")
      ? "/auth/partner/login"
      : "/auth/guest/login";

    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
