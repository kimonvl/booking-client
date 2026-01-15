import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginStart, registerStart } from "@/store/auth/authSlice";
import { selectAccessToken, selectAuthStatus, selectBootstrapStatus, selectCurrentUser } from "@/store/auth/auth.selector";
import CommonForm from "@/components/common-form/CommonForm";
import { loginFormControls, registerFormControls, type LoginFormState, type RegisterFormState } from "@/types/form-config/AuthFormControlls";


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

  const [loginInput, setLoginInput] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [registerInput, setRegisterInput] = useState<RegisterFormState>({
    email: "",
    password: "",
    confirm: "",
  });

  const isRegister = mode === "register";
  const isPartner = role === "partner";
  const title = useMemo(() => {
    if (isRegister) return isPartner ? "Create partner account" : "Create account";
    return isPartner ? "Partner sign in" : "Sign in";
  }, [isRegister, isPartner]);

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
  if (authStatus !== "succeeded") return;
  if (!accessToken || !user) return;

  // // 1) if user was redirected to login from a protected route, go back there
  // const from = location.state?.from?.pathname;
  // if (from) {
  //   navigate(from, { replace: true });
  //   return;
  // }

  // 2) otherwise go to the correct home page based on actual user role from backend
  navigate(user.role === "PARTNER" ? "/partner" : "/", { replace: true });
}, [bootstrap, authStatus, accessToken, user, location.state, navigate]);


  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.email.trim() || !loginInput.password.trim()) {
      toast.error("Please fill email and password.");
      return;
    }
    dispatch(
      loginStart({
        email: loginInput.email.trim(),
        password: loginInput.password,
        role: isPartner ? "PARTNER" : "GUEST",
      })
    );
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerInput.email.trim() || !registerInput.password.trim()) {
      toast.error("Please fill email and password.");
      return;
    }
    if (registerInput.password !== registerInput.confirm) {
        toast.error("Passwords do not match.");
        return;
      }

      dispatch(
        registerStart({
          email: registerInput.email.trim(),
          password: registerInput.password,
          role: isPartner ? "PARTNER" : "GUEST",
        })
      );
  }

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
          {
            isRegister && <CommonForm<RegisterFormState> formControls={registerFormControls} formInput={registerInput} setFormInput={setRegisterInput} handleSubmit={handleRegisterSubmit} buttonName="Register" />
          }
          {
            !isRegister && <CommonForm<LoginFormState> formControls={loginFormControls} formInput={loginInput} setFormInput={setLoginInput} handleSubmit={handleLoginSubmit} buttonName="Log in" />
          }
          <Link to={switchUrl} className="block text-center text-sm text-[#0071c2] hover:underline">
            {switchText}
          </Link>

        </CardContent>
      </Card>
    </div>
  );
}
