export type UserRole = "GUEST" | "PARTNER" | "ADMIN";
export type BootstrapStatus = "idle" | "loading" | "done";

export interface AuthUser {
  id: string;
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface RegisterErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
}

export interface RegisterFailed {
  registerErrors: RegisterErrors;
  error: string;
}

export interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  registerErrors: RegisterErrors | null;
  registerCompleted: boolean;
  bootstrap: BootstrapStatus;
}
