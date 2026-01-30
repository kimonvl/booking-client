import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";
import CounterFilter from "../filters/CounterFilter";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";

interface GuestCountPopOverProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    adultCount: number;
    setAdultCount: (next: number) => void;
    pets: boolean;
    setPets: (v: boolean) => void;
}

export default function GuestCountPopOver({ open, setOpen, adultCount, setAdultCount, pets, setPets }: GuestCountPopOverProps) {
    const label = useMemo(() => {
        return pets ? `Adults ${adultCount} - pets` : `Adults ${adultCount}` 
    }, [adultCount, pets]);
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

            <PopoverContent
                className="w-auto p-4"
                align="start"
                onInteractOutside={() => setOpen(false)} // close on outside click
                onEscapeKeyDown={() => setOpen(false)}   // close on esc (shadcn handles it too)
                onPointerDownOutside={() => setOpen(false)}
            >
                <CounterFilter label="Adults" count={adultCount} setCount={setAdultCount} />
                <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="text-sm font-medium">Are you travelling with pets?</div>
                    <Switch
                        checked={pets}
                        onCheckedChange={setPets}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
