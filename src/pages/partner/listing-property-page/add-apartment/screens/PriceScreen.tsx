import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import HelpCard from "./HelpCard";
import { Lightbulb } from "lucide-react";
import { InlineFieldErrorBaner } from "@/components/error-baners/InlineFieldErrorBaner";
import { useAppSelector } from "@/store/hooks";
import { selectAddApartmentErrors } from "@/store/partner/manage-property/apartment/apartment.selector";
import { inputClass } from "../AddAppartmentPage";

interface PriceScreenProps {
    pricePerNight: number;
    setPricePerNight: (value: number) => void;
}

export default function PriceScreen({ pricePerNight, setPricePerNight }: PriceScreenProps) {
    const addApartmentErrors = useAppSelector(selectAddApartmentErrors);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 ml-2 mr-2 mt-1">
            <div>
                <h1 className="text-4xl font-bold text-[#1a1a1a]">Price per night</h1>

                <div className="mt-8 space-y-6">
                    {/* Suggestion card with median bar */}
                    <Card className="rounded-md">
                        <CardContent className="p-6">
                            <div className="text-lg font-semibold text-[#1a1a1a]">
                                Make your price competitive to increase your chances of getting
                                more bookings.
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                                This is the price range for properties similar to yours.{" "}
                                <button
                                    type="button"
                                    className="text-[#0071c2] hover:underline font-medium"
                                >
                                    Learn more
                                </button>
                            </div>

                            {/* Fake price range bar */}
                            <div className="mt-6 relative">
                                <div className="h-1 bg-[#cfe3f7] rounded-full" />
                                <div className="mt-5 flex items-center justify-between text-sm">
                                    <span className="bg-[#0071c2] text-white px-3 py-1 rounded-full">
                                        € 11.91
                                    </span>
                                    <span className="bg-[#0071c2] text-white px-3 py-1 rounded-full">
                                        € 64.91
                                    </span>
                                </div>

                                <div className="absolute left-1/2 -translate-x-1/2 -top-8">
                                    <span className="bg-[#0071c2] text-white px-3 py-1 rounded-full text-sm">
                                        Median: € 37.91
                                    </span>
                                    <div className="mx-auto mt-1 h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#0071c2]" />
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>Did this help you decide on a price?</span>
                                <button type="button" className="hover:text-foreground">
                                    👍
                                </button>
                                <button type="button" className="hover:text-foreground">
                                    👎
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Input card */}
                    <Card className="rounded-md">
                        <CardContent className="p-6">
                            <div className="text-lg font-semibold text-[#1a1a1a]">
                                How much do you want to charge per night?
                            </div>

                            <div className="mt-4 text-sm font-semibold text-[#1a1a1a]">
                                Price guests pay
                            </div>
                            <InlineFieldErrorBaner message={addApartmentErrors?.pricePerNight}/>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="h-10 w-10 rounded-md border grid place-items-center text-muted-foreground">
                                    €
                                </div>
                                <Input
                                    type="number"
                                    inputMode="decimal"
                                    min={0}
                                    step="0.01"
                                    value={pricePerNight}
                                    onChange={(e) => {
                                        const n = Number(e.target.value);
                                        if (Number.isNaN(n) || n < 0) return;
                                        setPricePerNight(n);
                                    }}
                                    className={inputClass(!!addApartmentErrors?.pricePerNight)}
                                />
                            </div>

                            <div className="mt-2 text-sm text-muted-foreground">
                                Including taxes, commission and charges
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-6">
                <HelpCard
                    icon={<Lightbulb className="h-5 w-5" />}
                    title="What if I'm not sure about my price?"
                >
                    <p>
                        Don&apos;t worry — you can always change it later. You can even set
                        weekend, midweek and seasonal prices to control what you earn.
                    </p>
                </HelpCard>
            </div>
        </div>
    )
}
