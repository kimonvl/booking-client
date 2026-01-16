import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { bootstrapStart } from "@/store/auth/authSlice";
import { selectBootstrapStatus } from "@/store/auth/auth.selector";

export default function AppBootstrapGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const bootstrap = useAppSelector(selectBootstrapStatus);

  // Protect against StrictMode double effect + any remounts
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    dispatch(bootstrapStart());
  }, [dispatch]);

  if (bootstrap !== "done") return null; // or a spinner
  return <>{children}</>;
}
