export type UserRole = "GUEST" | "PARTNER" | "ADMIN";
export type BootstrapStatus = "idle" | "loading" | "done";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface RegisterRequest {
    email: string;
    password: string;
    role: string;
}

export interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  bootstrap: BootstrapStatus;
}
