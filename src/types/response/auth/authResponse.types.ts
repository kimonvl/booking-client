import type { AuthUser } from "@/store/auth/auth.types";

export interface LoginResponse {
    user: AuthUser;
    accessToken: string;
}