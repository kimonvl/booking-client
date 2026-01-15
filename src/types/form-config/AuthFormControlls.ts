import type { FormControl } from "./formControl";

export interface AuthFormState {
    email: string;
    password: string;
}

export interface LoginFormState extends AuthFormState{
    
}

export interface RegisterFormState extends AuthFormState{
    confirm: string;
}

export const loginFormControls: FormControl<LoginFormState>[] = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        type : "email",
        componentType : "input",
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        type : "password",
        componentType : "input",
    }
];

export const registerFormControls: FormControl<RegisterFormState>[] = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        type : "email",
        componentType : "input",
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        type : "password",
        componentType : "input",
    },
    {
        name : "confirm",
        label : "Confirm Password",
        placeholder : "Enter your password",
        type : "password",
        componentType : "input",
    }
];