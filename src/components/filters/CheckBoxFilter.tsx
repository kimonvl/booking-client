import type { Dispatch, SetStateAction } from "react";
import { Checkbox } from "../ui/checkbox";

export interface CheckBoxOption {
    key: string;
    label: string;
    count: number;
    selected: boolean;
}

interface CheckBoxFilterProps {
    checkBoxTitle: string;
    checkBoxOptions: CheckBoxOption[];
    setCheckBoxOptions: Dispatch<SetStateAction<CheckBoxOption[]>>
}

export default function CheckBoxFilter({ checkBoxTitle, checkBoxOptions, setCheckBoxOptions }: CheckBoxFilterProps) {
    return (
        <div>
            <div className="font-semibold">{checkBoxTitle}</div>
            <div className="mt-3 space-y-3">
                {checkBoxOptions.map((option) => (
                    <label
                        key={option.label}
                        className="flex items-center justify-between gap-3 text-sm cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={option.selected}
                                onCheckedChange={(v) =>
                                    setCheckBoxOptions((prev) => (
                                        prev.map((o) => {
                                            return o.key === option.key ? {...o, selected: Boolean(v)} : o;
                                        })
                                    ))
                                }
                            />
                            <span>{option.label}</span>
                        </div>
                        <span className="text-muted-foreground tabular-nums">{option.count}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
