import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginStart, registerStart } from "@/store/auth/authSlice";
import { selectAccessToken, selectAuthStatus, selectBootstrapStatus, selectCurrentUser } from "@/store/auth/auth.selector";


type UrlRole = "guest" | "partner";
type UrlMode = "login" | "register";

function normalizeRole(v?: string): UrlRole {
  return v === "partner" ? "partner" : "guest";
}
function normalizeMode(v?: string): UrlMode {
  return v === "register" ? "register" : "login";
}

export default function AuthPage() {
  const { role: roleParam, mode: modeParam } = useParams();
  const role = normalizeRole(roleParam);
  const mode = normalizeMode(modeParam);
  type LocationState = {
    from?: { pathname: string };
  };

  const location = useLocation() as ReturnType<typeof useLocation> & { state: LocationState };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectCurrentUser);
  const accessToken = useAppSelector(selectAccessToken);
  const bootstrap = useAppSelector(selectBootstrapStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isRegister = mode === "register";
  const isPartner = role === "partner";
  const title = useMemo(() => {
    if (isRegister) return isPartner ? "Create partner account" : "Create account";
    return isPartner ? "Partner sign in" : "Sign in";
  }, [isRegister, isPartner]);

  const submitLabel = isRegister ? "Create account" : "Sign in";

  //   // If authenticated -> redirect based on role
  //   useEffect(() => {
  //     if (!auth.accessToken) return;

  //     // If you fetch /auth/me after login/register, you can rely on `me?.role`.
  //     // If not available yet, fallback to URL role for redirect.
  //     const target =
  //       (me?.role === "PARTNER" || role === "partner") ? "/partner" : "/";

  //     // Small delay to avoid navigation during render cycles
  //     const t = setTimeout(() => navigate(target, { replace: true }), 0);
  //     return () => clearTimeout(t);
  //   }, [auth.accessToken, me?.role, role, navigate]);

  //   useEffect(() => {
  //     if (auth.status === "failed" && auth.error) {
  //       toast.error(auth.error);
  //     }
  //   }, [auth.status, auth.error]);
  useEffect(() => {
    if (bootstrap !== "done") return;
    if (!accessToken || !user) return;

    // if user originally tried to access /partner/... send them there
    const from = (location.state as any)?.from?.pathname as string | undefined;
    if (from) {
      navigate(from, { replace: true });
      return;
    }

    // otherwise go to role home
    navigate(user.role === "PARTNER" ? "/partner" : "/", { replace: true });
  }, [bootstrap, accessToken, user, navigate, location.state]);

  useEffect(() => {
    if (authStatus !== "succeeded") return;
    if (!accessToken) return;

    const roleFromState = user?.role; // depends on what you store: "PARTNER" | "GUEST"
    const isPartnerUser = roleFromState === "PARTNER" || role === "partner";

    navigate(isPartnerUser ? "/partner" : "/", { replace: true });
  }, [authStatus, accessToken, user?.role, role, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill email and password.");
      return;
    }

    if (isRegister) {
      if (password !== confirm) {
        toast.error("Passwords do not match.");
        return;
      }

      dispatch(
        registerStart({
          email: email.trim(),
          password,
          role: isPartner ? "PARTNER" : "GUEST",
        })
      );
      return;
    }

    dispatch(
      loginStart({
        email: email.trim(),
        password,
        // we keep role for UI/redirect; not necessarily sent to backend
        role: isPartner ? "PARTNER" : "GUEST",
      })
    );
    navigate("/partner");
  };

  const switchUrl = isRegister
    ? `/auth/${role}/login`
    : `/auth/${role}/register`;

  const switchText = isRegister
    ? "Already have an account? Sign in"
    : "No account? Create one";

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-[480px]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">{title}</CardTitle>

          <div className="text-sm text-muted-foreground">
            {isPartner ? "For property partners" : "For travelers"}
          </div>

          <div className="flex gap-2 text-sm">
            <Link
              to={`/auth/guest/${mode}`}
              className={[
                "px-3 py-1 rounded-full border",
                !isPartner ? "bg-blue-50 border-blue-600 text-blue-600" : "border-gray-300",
              ].join(" ")}
            >
              Guest
            </Link>
            <Link
              to={`/auth/partner/${mode}`}
              className={[
                "px-3 py-1 rounded-full border",
                isPartner ? "bg-blue-50 border-blue-600 text-blue-600" : "border-gray-300",
              ].join(" ")}
            >
              Partner
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={isRegister ? "new-password" : "current-password"}
              />
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-[#0071c2] hover:bg-[#005fa3]"
              disabled={authStatus === "loading"}
            >
              {authStatus === "loading" ? "Please wait..." : submitLabel}
            </Button>

            <Link to={switchUrl} className="block text-center text-sm text-[#0071c2] hover:underline">
              {switchText}
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
