import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Lightbulb } from "lucide-react";
import HelpCard from "./HelpCard";
import type { IsParkingAvailableType } from "@/types/request/apartment/addApartmentRequest.types";

interface ServicesScreenProps {
    serveBreakfast: boolean;
    setServeBreakfast: (value: boolean) => void;
    isParkingAvailable: IsParkingAvailableType;
    setIsParkingAvailable: (value: IsParkingAvailableType) => void;
}

export default function ServicesScreen({
    serveBreakfast, 
    setServeBreakfast, 
    isParkingAvailable, 
    setIsParkingAvailable
}: ServicesScreenProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 ml-2 mr-2 mt-1">
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a]">
          Services at your property
        </h1>

        <div className="mt-8 space-y-6">
          <Card className="rounded-md">
            <CardContent className="p-6">
              <div className="text-xl font-semibold text-[#1a1a1a]">
                Breakfast
              </div>
              <Separator className="my-5" />

              <div className="text-sm font-semibold text-[#1a1a1a]">
                Do you serve guests breakfast?
              </div>

              <RadioGroup
                value={serveBreakfast ? "yes" : "no"}
                onValueChange={(v) => setServeBreakfast(v === "yes" ? true : false)}
                className="mt-4 space-y-3"
              >
                <label className="flex items-center gap-3">
                  <RadioGroupItem value="yes" />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-3">
                  <RadioGroupItem value="no" />
                  <span className="text-sm">No</span>
                </label>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="rounded-md">
            <CardContent className="p-6">
              <div className="text-xl font-semibold text-[#1a1a1a]">Parking</div>
              <Separator className="my-5" />

              <div className="text-sm font-semibold text-[#1a1a1a]">
                Is parking available to guests?
              </div>

              <RadioGroup
                value={isParkingAvailable}
                onValueChange={(v) => setIsParkingAvailable(v as any)}
                className="mt-4 space-y-3"
              >
                <label className="flex items-center gap-3">
                  <RadioGroupItem value="free" />
                  <span className="text-sm">Yes, free</span>
                </label>
                <label className="flex items-center gap-3">
                  <RadioGroupItem value="paid" />
                  <span className="text-sm">Yes, paid</span>
                </label>
                <label className="flex items-center gap-3">
                  <RadioGroupItem value="no" />
                  <span className="text-sm">No</span>
                </label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <HelpCard icon={<Lightbulb className="h-5 w-5" />} title="Tip">
          <p>
            Services can increase bookings, but only if they match what you can
            consistently provide.
          </p>
        </HelpCard>
      </div>
    </div>
  )
}
