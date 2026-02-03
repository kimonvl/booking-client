export interface LoginRequest {
    email: string;
    password: string;
    role: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    lastName: string,
    firstName: string,
    country: string,
    role: string;
}
