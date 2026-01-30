import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export interface ToggleFilterOption {
    value: string;
    label: string;
}

interface ToggleFilterProps {
    options: ToggleFilterOption[];
    value: string;
    setValue: (v: string) => void;
}

export default function ToggleFilter({ options, value, setValue }: ToggleFilterProps) {
    return (
        <div className="mt-1">
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={(v) => v && setValue(v)}
                className="border rounded-full p-1"
            >
                {
                    options.map((option) => (
                        <ToggleGroupItem value={option.value} className="rounded-full px-4">
                            {option.label}
                        </ToggleGroupItem>
                    ))
                }
            </ToggleGroup>
        </div>
    )
}
