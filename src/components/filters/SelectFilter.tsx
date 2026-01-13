import { ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Dispatch, SetStateAction } from "react";

export interface SelectFilterOption<TValue> {
    value: TValue;
    label: string;
}

interface SelectFilterProps<TValue> {
    options: SelectFilterOption<TValue>[];
    value: string;
    setValue: Dispatch<SetStateAction<TValue>>;
    placeholder: string;
}

export default function SelectFilter<TValue extends string>({ options, value, setValue, placeholder }: SelectFilterProps<TValue>) {
    return (
        <Select value={value} onValueChange={(v) => v && setValue(v as TValue)}>
            <SelectTrigger>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {
                    options.map((option) => (
                        <SelectItem value={option.value}>{option.label}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>

    )
}
