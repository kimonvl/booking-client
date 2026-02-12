import { Input } from '../ui/input';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { FormControl } from '@/types/form-config/formControl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface FormFieldsProps<TFormState> {
    formControls: FormControl<TFormState>[];
    formInput: TFormState;
    setFormInput: React.Dispatch<React.SetStateAction<TFormState>>;
    fieldErrors?: Partial<Record<keyof TFormState, string>>;
}

function FormFields<TFormState>({
    formControls,
    formInput,
    setFormInput,
    fieldErrors
}: FormFieldsProps<TFormState>) {

    const renderComponentByType = (controlItem: FormControl<TFormState>) => {
        const itemValue = formInput[controlItem.name] as string;

        const defaultOnchange = (e: ChangeEvent<HTMLInputElement>, controlItem: FormControl<TFormState>) => setFormInput({ ...formInput, [controlItem.name]: e.target.value })

        switch (controlItem.componentType) {
            case "input":
                return (
                    <Input
                        className="w-full"
                        id={controlItem.name as string}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        value={itemValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => defaultOnchange(e, controlItem)}
                        {...(controlItem.onKeyDown && {
                            onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => controlItem.onKeyDown!(e, formInput, setFormInput)
                        })}
                    />
                );
                break;
            case "select":
                return (
                    <Select
                        value={itemValue}
                        onValueChange={(val) =>
                            setFormInput({ ...formInput, [controlItem.name]: val })
                        }
                    >
                        <SelectTrigger className="w-full bg-neutral-800 border border-neutral-600 text-white">
                            <SelectValue placeholder={controlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 text-white border border-neutral-600">
                            {controlItem.options?.map((opt) => (
                                <SelectItem key={opt} value={opt} className="text-white cursor-pointer">
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            default:
                return (
                    <Input
                        id={controlItem.name as string}
                        type={controlItem.name as string}
                        placeholder={controlItem.placeholder}
                        value={itemValue}
                        onChange={(e) => setFormInput({ ...formInput, [controlItem.name]: e.target.value })}
                    />
                )
                break;
        }
    }

    return (
        <div>
            {formControls.map((controlItem) => {
                const error = fieldErrors?.[controlItem.name];

                return (
                    <div className="grid gap-1" key={controlItem.name as string}>


                        <Label htmlFor={controlItem.name as string}>
                            {controlItem.label}
                        </Label>
                        {/* ✅ Error ABOVE the input */}
                        {error && (
                            <div className="text-xs text-red-500 font-medium">
                                {error}
                            </div>
                        )}
                        {renderComponentByType(controlItem)}
                    </div>
                );
            })}
        </div>
    )
}

export default FormFields
