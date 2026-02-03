import type { FormControl } from "./formControl";

export interface AuthFormState {
    email: string;
    password: string;
}

export interface LoginFormState extends AuthFormState{
    
}

export interface RegisterFormState extends AuthFormState{
    confirm: string;
    lastName: string;
    firstName: string;
    country: string;
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

export const registerFormControls =  (countries: string[]): FormControl<RegisterFormState>[] => {
    return [
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
    },
    {
        name : "firstName",
        label : "First name",
        placeholder : "Enter your first name",
        type : "text",
        componentType : "input",
    },
    {
        name : "lastName",
        label : "Last name",
        placeholder : "Enter your last name",
        type : "text",
        componentType : "input",
    },
    {
        name : "country",
        label : "Country",
        placeholder : "Select category",
        options : countries,
        componentType : "select",
    },
];
} 