import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HelpCard from "./HelpCard";
import { ChevronDown, Lightbulb, Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import AddBedDialog from "./AddBedDialog";
import CounterFilter from "@/components/filters/CounterFilter";
import type { SleepingAreasType } from "@/types/request/apartment/addApartmentRequest.types";

interface ApartmentDetailsScreenProps {
  sleepingAreas: SleepingAreasType;
  setSleepingAreas: Dispatch<SetStateAction<SleepingAreasType>>;
  addBedroom: () => void;
  removeBedroom: (index: number) => void;
  guestCount: number;
  setGuestCount: (next: number) => void;
  bathroomCount: number;
  setBathroomCount: (next: number) => void;
  allowChildren: boolean;
  setAllowChildren: (value: boolean) => void;
  offerCots: boolean;
  setOfferCots: (value: boolean) => void;
  aptSize: string;
  setAptSize: (value: string) => void;
}

export default function ApartmentDetailsScreen({
  sleepingAreas,
  setSleepingAreas,
  addBedroom,
  removeBedroom,
  guestCount,
  setGuestCount,
  bathroomCount,
  setBathroomCount,
  allowChildren,
  setAllowChildren,
  offerCots,
  setOfferCots,
  aptSize,
  setAptSize,
}: ApartmentDetailsScreenProps) {
  const [addBedOpen, setAddBedOpen] = useState(false);
  const [selectedBedroomIndex, setSelectedBedroomIndex] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 ml-2 mr-2 mt-1">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a]">Property details</h1>

          <div className="mt-8 space-y-6">
            {/* Where can people sleep */}
            <Card className="rounded-md">
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  Where can people sleep?
                </div>

                <div className="mt-4 space-y-4">
                  {/* Bedrooms */}
                  {sleepingAreas.bedrooms.map((bedroom, idx) => (
                    <div
                      key={`Bedroom-${idx}`}
                      className="overflow-hidden rounded-md border bg-white shadow-sm"
                    >
                      <div className="flex items-stretch">
                        {/* LEFT: content (opens dialog) */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBedroomIndex(idx);
                            setAddBedOpen(true);
                          }}
                          className="flex-1 px-5 py-4 text-left hover:bg-slate-50"
                        >
                          <div className="font-medium text-[#1a1a1a]">
                            {"Bedroom " + (idx + 1)}
                          </div>

                          {(() => {
                            const text = Object.entries(bedroom.beds)
                              .filter(([, count]) => count > 0)
                              .map(([type, count]) => `${count} ${type} bed${count > 1 ? "s" : ""}`)
                              .join(", ");

                            return (
                              <div className="text-sm text-muted-foreground">
                                {text || "0 beds"}
                              </div>
                            );
                          })()}
                        </button>

                        {/* MIDDLE: arrow (also opens dialog) */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBedroomIndex(idx);
                            setAddBedOpen(true);
                          }}
                          className="w-16 border-l flex items-center justify-center hover:bg-slate-50"
                          aria-label="Open bedroom"
                        >
                          <ChevronDown className="h-5 w-5 text-[#0071c2]" />
                        </button>

                        {/* RIGHT: trash (remove, must NOT open dialog) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBedroom(idx);
                            setSelectedBedroomIndex(null);
                            // TODO: implement remove logic here (and keep at least 1)
                            // removeBedroom(idx);
                          }}
                          className="w-16 border-l flex items-center justify-center hover:bg-slate-50"
                          aria-label="Remove bedroom"
                        >
                          <Trash2 className="h-5 w-5 text-[#0071c2]" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Living room */}
                  <div
                    onClick={() => {
                      setSelectedBedroomIndex(null)
                      setAddBedOpen(true);
                    }}
                    key={`Living room`}
                    className="flex items-center justify-between rounded-md border bg-white px-4 py-3 shadow-sm"
                  >
                    <div>
                      <div className="font-medium text-[#1a1a1a]">{"Living room "}</div>
                      {(() => {
                        const text = Object.entries(sleepingAreas.livingroom.beds)
                          .filter(([, count]) => count > 0)
                          .map(([type, count]) => `${count} ${type} bed${count > 1 ? "s" : ""}`)
                          .join(", ");

                        return <div className="text-sm text-muted-foreground">{text || "0 beds"}</div>;
                      })()}

                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 w-10 rounded-full border-gray-300"
                      onClick={() => {
                        // Layout-only: remove (except keep at least 1)
                        // setSleepingAreas((prev) =>
                        //   prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev
                        // );
                      }}
                      aria-label="Remove"
                    >
                      <span className="text-xl leading-none">−</span>
                    </Button>
                  </div>

                  <button
                    type="button"
                    className="text-[#0071c2] hover:underline text-sm font-medium"
                    onClick={() => addBedroom()}
                  >
                    + Add bedroom
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Guests / Bathrooms */}
            <Card className="rounded-md">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="text-lg font-semibold text-[#1a1a1a] mb-2">
                    How many guests can stay?
                  </div>
                  <CounterFilter
                    count={guestCount}
                    setCount={setGuestCount}
                  />
                </div>

                <div>
                  <div className="text-lg font-semibold text-[#1a1a1a] mb-2">
                    How many bathrooms are there?
                  </div>
                  <CounterFilter
                    count={bathroomCount}
                    setCount={setBathroomCount}
                  />
                </div>
              </CardContent>
            </Card>


            {/* Children / Cots */}
            <Card className="rounded-md">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="text-lg font-semibold text-[#1a1a1a]">
                    Do you allow children?
                  </div>
                  <RadioGroup
                    value={allowChildren ? "yes" : "no"}
                    onValueChange={(v) => setAllowChildren(v === "yes" ? true : false)}
                    className="mt-3 flex items-center gap-6"
                  >
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="yes" />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="no" />
                      <span className="text-sm">No</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <div className="text-lg font-semibold text-[#1a1a1a]">
                    Do you offer cots?
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Cots sleep most infants 0-3 and can be made available to guests
                    on request.
                  </div>

                  <RadioGroup
                    value={offerCots ? "yes" : "no"}
                    onValueChange={(v) => setOfferCots(v === "yes" ? true : false)}
                    className="mt-3 flex items-center gap-6"
                  >
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="yes" />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="no" />
                      <span className="text-sm">No</span>
                    </label>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Apartment size */}
            <Card className="rounded-md">
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  How big is this apartment?
                </div>

                <div className="mt-3 text-sm font-semibold text-[#1a1a1a]">
                  Apartment size - optional
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <Input
                    value={aptSize}
                    onChange={(e) => setAptSize(e.target.value)}
                    className="h-10 w-48"
                  />
                  <Select
                    value={"sqm"}
                    disabled={true}
                  >
                    <SelectTrigger className="h-10 w-44">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sqm">square metres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <HelpCard icon={<Lightbulb className="h-5 w-5" />} title="Tip">
            <p>
              The more details you add, the easier it is for guests to decide if
              your place is right for them.
            </p>
          </HelpCard>
        </div>
      </div>
      <AddBedDialog
        open={addBedOpen}
        setOpen={setAddBedOpen}
        sleepingAreas={sleepingAreas}
        setSleepingAreas={setSleepingAreas}
        selectedBedroomIndex={selectedBedroomIndex}
      />
    </>
  )
}
