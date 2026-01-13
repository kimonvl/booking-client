import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import HelpCard from "./HelpCard";
import { Lightbulb } from "lucide-react";
import type { PetsAllowedType, TimeType } from "../AddAppartmentPage";

interface RulesScreenProps {
    smokingAllowed: boolean;
    setSmokingAllowed: (value: boolean) => void;
    partiesAllowed: boolean;
    setPartiesAllowed: (value: boolean) => void;
    petsAllowed: PetsAllowedType;
    setPetsAllowed: (value: PetsAllowedType) => void;
    checkInFrom: TimeType;
    setCheckInFrom: (value: TimeType) => void;
    checkInUntil: TimeType;
    setCheckInUntil: (value: TimeType) => void;
    checkOutFrom: TimeType;
    setCheckOutFrom: (value: TimeType) => void;
    checkOutUntil: TimeType;
    setCheckOutUntil: (value: TimeType) => void;
}

export default function RulesScreen({
    smokingAllowed,
    setSmokingAllowed,
    partiesAllowed,
    setPartiesAllowed,
    petsAllowed,
    setPetsAllowed,
    checkInFrom,
    setCheckInFrom,
    checkInUntil,
    setCheckInUntil,
    checkOutFrom,
    setCheckOutFrom,
    checkOutUntil,
    setCheckOutUntil
}: RulesScreenProps) {
    const times: TimeType[] = [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 ml-2 mr-2 mt-1">
            <div>
                <h1 className="text-4xl font-bold text-[#1a1a1a]">House rules</h1>

                <div className="mt-8">
                    <Card className="rounded-md">
                        <CardContent className="p-6">
                            {/* Switches */}
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium">Smoking allowed</div>
                                    <Switch
                                        checked={smokingAllowed}
                                        onCheckedChange={setSmokingAllowed}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium">
                                        Parties/events allowed
                                    </div>
                                    <Switch
                                        checked={partiesAllowed}
                                        onCheckedChange={setPartiesAllowed}
                                    />
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Pets */}
                            <div>
                                <div className="text-sm font-semibold text-[#1a1a1a]">
                                    Do you allow pets?
                                </div>
                                <RadioGroup
                                    value={petsAllowed}
                                    onValueChange={(v) => setPetsAllowed(v as PetsAllowedType)}
                                    className="mt-4 space-y-3"
                                >
                                    <label className="flex items-center gap-3">
                                        <RadioGroupItem value="yes" />
                                        <span className="text-sm">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <RadioGroupItem value="upon" />
                                        <span className="text-sm">Upon request</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <RadioGroupItem value="no" />
                                        <span className="text-sm">No</span>
                                    </label>
                                </RadioGroup>
                            </div>

                            <Separator className="my-6" />

                            {/* Check-in / out */}
                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm font-semibold text-[#1a1a1a]">
                                        Check in
                                    </div>
                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-2">
                                                From
                                            </div>
                                            <Select value={checkInFrom} onValueChange={setCheckInFrom}>
                                                <SelectTrigger className="h-10">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {times.map((t) => (
                                                        <SelectItem key={`ci-from-${t}`} value={t}>
                                                            {t}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <div className="text-xs text-muted-foreground mb-2">
                                                Until
                                            </div>
                                            <Select
                                                value={checkInUntil}
                                                onValueChange={setCheckInUntil}
                                            >
                                                <SelectTrigger className="h-10">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {times.map((t) => (
                                                        <SelectItem key={`ci-until-${t}`} value={t}>
                                                            {t}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-[#1a1a1a]">
                                        Check out
                                    </div>
                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-2">
                                                From
                                            </div>
                                            <Select
                                                value={checkOutFrom}
                                                onValueChange={setCheckOutFrom}
                                            >
                                                <SelectTrigger className="h-10">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {times.map((t) => (
                                                        <SelectItem key={`co-from-${t}`} value={t}>
                                                            {t}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <div className="text-xs text-muted-foreground mb-2">
                                                Until
                                            </div>
                                            <Select
                                                value={checkOutUntil}
                                                onValueChange={setCheckOutUntil}
                                            >
                                                <SelectTrigger className="h-10">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {times.map((t) => (
                                                        <SelectItem key={`co-until-${t}`} value={t}>
                                                            {t}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-6">
                <HelpCard
                    icon={<Lightbulb className="h-5 w-5" />}
                    title="What if my house rules change?"
                >
                    <p>
                        You can easily customise these house rules later and additional
                        house rules can be set after you complete registration.
                    </p>
                </HelpCard>
            </div>
        </div>
    );
}
