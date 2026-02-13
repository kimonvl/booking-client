import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginStart, registerStart, resetRegisterCompleted } from "@/store/auth/authSlice";
import { selectAccessToken, selectAuthStatus, selectBootstrapStatus, selectCurrentUser, selectRegisterCompleted, selectRegisterErrors } from "@/store/auth/auth.selector";
import CommonForm from "@/components/common-form/CommonForm";
import { loginFormControls, registerFormControls, type LoginFormState, type RegisterFormState } from "@/types/form-config/AuthFormControlls";
import { selectCountryNames } from "@/store/dictionaries/dictionary.selector";


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
  const countries = useAppSelector(selectCountryNames);
  const registerFieldErrors = useAppSelector(selectRegisterErrors);
  const isRegisterCompleted = useAppSelector(selectRegisterCompleted);

  useEffect(() => {
    if (isRegisterCompleted) {
      navigate(`/auth/${role}/login`);
      dispatch(resetRegisterCompleted());
    }
  }, [isRegisterCompleted])

  useEffect(() => {
    if (user && user.role == "PARTNER") {
      navigate("/partner", { replace: true });
    }
    if (user && user.role == "GUEST") {
      navigate("/", { replace: true });
    }
  }, [user])

  const [loginInput, setLoginInput] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [registerInput, setRegisterInput] = useState<RegisterFormState>({
    email: "",
    password: "",
    confirm: "",
    lastName: "",
    firstName: "",
    country: "",
  });

  const isRegister = mode === "register";
  const isPartner = role === "partner";
  const title = useMemo(() => {
    if (isRegister) return isPartner ? "Create partner account" : "Create account";
    return isPartner ? "Partner sign in" : "Sign in";
  }, [isRegister, isPartner]);

  useEffect(() => {
    if (bootstrap !== "done") return;
    if (authStatus !== "succeeded") return;
    if (!accessToken || !user) return;

    const sp = new URLSearchParams(location.search);
    const fromQuery = sp.get("from");

    const from = location.state?.from?.pathname ?? fromQuery ?? undefined;


    // ✅ Special case:
    // If user was on home page (or no "from") and logs in as PARTNER -> go to partner dashboard
    const isHome =
      !from || from === "/" || from.startsWith("/?") || from.startsWith("/#");

    if (user.role === "PARTNER" && isHome) {
      navigate("/partner", { replace: true });
      return;
    }

    // ✅ Normal case: always go back to where user was
    if (from) {
      navigate(from, { replace: true });
      return;
    }

    // Fallback if no from and not partner-home
    navigate("/", { replace: true });
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
    if (!validateRegister())
      return;

    dispatch(
      registerStart({
        email: registerInput.email.trim(),
        password: registerInput.password,
        lastName: registerInput.lastName,
        firstName: registerInput.firstName,
        country: registerInput.country,
        role: isPartner ? "PARTNER" : "GUEST",
      })
    );
  }

  const validateRegister = () => {
    if (!registerInput.email.trim() || !registerInput.password.trim()) {
      toast.error("Please fill email and password.");
      return false;
    }
    if (registerInput.password !== registerInput.confirm) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!registerInput.firstName.trim()) {
      toast.error("Please fill first name.");
      return false;
    }
    if (!registerInput.lastName.trim()) {
      toast.error("Please fill last name.");
      return false;
    }
    if (!registerInput.country.trim()) {
      toast.error("Please select your country.");
      return false;
    }
    return true;
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
              to={`/auth/guest/${mode}${location.search}`}
              state={location.state}
              className={[
                "px-3 py-1 rounded-full border",
                !isPartner ? "bg-blue-50 border-blue-600 text-blue-600" : "border-gray-300",
              ].join(" ")}
            >
              Guest
            </Link>

            <Link
              to={`/auth/partner/${mode}${location.search}`}
              state={location.state}
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
            isRegister && <CommonForm<RegisterFormState> 
                            formControls={registerFormControls(countries)} 
                            formInput={registerInput} 
                            setFormInput={setRegisterInput} 
                            handleSubmit={handleRegisterSubmit} 
                            buttonName="Register"
                            fieldErrors={registerFieldErrors ?? {}}
                             />
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
