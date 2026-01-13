import type { ViewMode } from "@/pages/public/SearchPage";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import type { Dispatch, SetStateAction } from "react";

export interface ToggleFilterOption {
    value: ViewMode;
    label: string;
}

interface ToggleFilterProps {
    options: ToggleFilterOption[];
    value: ViewMode;
    setValue: Dispatch<SetStateAction<ViewMode>>
}

export default function ToggleFilter({ options, value, setValue }: ToggleFilterProps) {
    return (
        <div className="mt-1">
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={(v) => v && setValue(v as ViewMode)}
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
