import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type Props = {
    value?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    open: boolean;
    setOpen: (v: boolean) => void;
};

export default function DateRangePickerPopOver({ value, onChange, open, setOpen }: Props) {

    const label = React.useMemo(() => {
        if (value?.from && value?.to) {
            return `${format(value.from, "EEE, MMM d")} — ${format(value.to, "EEE, MMM d")}`;
        }
        if (value?.from) {
            return `${format(value.from, "EEE, MMM d")} — Check-out`;
        }
        return "Check-in — Check-out";
    }, [value]);

    // Close on ESC (reliable, regardless of popover implementation)
    React.useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "h-14 w-full justify-start text-left font-normal bg-white",
                        "text-black hover:text-black",          // ✅ force text visible
                        "border-0 shadow-none hover:bg-white"   // ✅ keep it looking like input
                    )}
                    onClick={() => setOpen(true)}
                >
                    <CalendarIcon className="mr-3 h-4 w-4 text-black" />
                    <span className="truncate">{label}</span>
                </Button>
            </PopoverTrigger>


            {/* Prevent popover from closing when clicking inside the calendar */}
            <PopoverContent
                className="w-auto p-4"
                align="start"
                onInteractOutside={() => setOpen(false)} // close on outside click
                onEscapeKeyDown={() => setOpen(false)}   // close on esc (shadcn handles it too)
                onPointerDownOutside={() => setOpen(false)}
            >
                <Calendar
                    mode="range"
                    numberOfMonths={2}
                    selected={value}
                    defaultMonth={value?.from}
                    onSelect={(next, selectedDay) => {
                        // react-day-picker passes the clicked day as the 2nd arg in newer versions
                        // but if your version doesn't, we can derive from `next`.
                        const clicked = selectedDay ?? next?.from;

                        // If a full range is already selected, start a new range from the clicked day
                        if (value?.from && value?.to && clicked) {
                            const fresh: DateRange = { from: clicked, to: undefined };
                            onChange?.(fresh);
                            return;
                        }

                        // Normal behavior (first click sets from, second sets to)
                        onChange?.(next ?? undefined);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
