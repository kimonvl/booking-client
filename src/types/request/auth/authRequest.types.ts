export interface LoginRequest {
    email: string;
    password: string;
    roleId: number | undefined;
}

export interface RegisterRequest {
    email: string;
    password: string;
    lastName: string,
    firstName: string,
    country: string,
    roleId: number | undefined;
}
