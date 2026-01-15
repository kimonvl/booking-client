import type { KeyboardEvent } from "react";

export type FormComponentType = "input" | "select";

export interface FormControl<TFormState> {
    name: keyof TFormState;
    label: string;
    componentType: FormComponentType;

    type?: string;
    placeholder?: string;
    options?: string[];

    onKeyDown?: (
        e: KeyboardEvent<HTMLInputElement>,
        formInput: TFormState,
        setFormInput: React.Dispatch<React.SetStateAction<TFormState>>
    ) => void;
}