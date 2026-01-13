import { selectAccessToken, selectBootstrapStatus } from "@/store/auth/auth.selector";
import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function RequireAuth() {
    const location = useLocation();
    const accessToken = useAppSelector(selectAccessToken);
    const bootstrap = useAppSelector(selectBootstrapStatus);

    if (bootstrap !== "done") {
        return null;
    }

    if (!accessToken) {
        return <Navigate to={"/auth/guest/login"} replace state={{ from: location }} />
    }
    return <Outlet />;
}
