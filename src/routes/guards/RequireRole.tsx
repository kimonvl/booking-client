import { selectBootstrapStatus, selectCurrentUser } from "@/store/auth/auth.selector";
import { selectRoleDictionaryItem } from "@/store/dictionaries/dictionary.selector";
import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireRole({ roleId }: { roleId: number | undefined }) {
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const bootstrap = useAppSelector(selectBootstrapStatus);
  const partnerRole = useAppSelector((state) => selectRoleDictionaryItem(state, "PARTNER"))

  if (bootstrap !== "done") return null;

  if (!user) {
    const loginPath = location.pathname.startsWith("/partner")
      ? "/auth/partner/login"
      : "/auth/guest/login";
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (user.roleId !== roleId) {
    return <Navigate to={user.roleId === partnerRole?.id ? "/partner" : "/"} replace />;
  }

  return <Outlet />;
}
