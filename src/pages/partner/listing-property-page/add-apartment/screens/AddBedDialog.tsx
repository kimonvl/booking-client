import CounterFilter from "@/components/filters/CounterFilter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { BedroomBedType, LivingRoomBedType, SleepingAreasType } from "@/types/request/apartment/addApartmentRequest.types";
import { Bed, X } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

interface AddBedDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    sleepingAreas: SleepingAreasType;
    setSleepingAreas: Dispatch<SetStateAction<SleepingAreasType>>
    selectedBedroomIndex: number | null;
}

const bedroomBedTypeValues: BedroomBedType[] = ["single", "double", "king_size"];
const livingRoomBedTypeValues: LivingRoomBedType[] = ["single_sofa", "double_sofa"];

export default function AddBedDialog({ open, setOpen, sleepingAreas, setSleepingAreas, selectedBedroomIndex }: AddBedDialogProps) {
console.log(selectedBedroomIndex);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[760px] p-0">
                {/* Header */}
                <div className="px-6 pt-6 pb-4">
                    <div className="flex items-start justify-between">
                        <div className="text-xl font-semibold text-[#1a1a1a]">
                            {"Title"}
                        </div>

                        <DialogClose asChild>
                            <button
                                type="button"
                                className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-slate-100"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </DialogClose>
                    </div>
                </div>

                <Separator />

                {/* Body */}
                <div className="px-6 py-4">
                    <div className="space-y-5">
                        {selectedBedroomIndex != null && bedroomBedTypeValues.map((opt) => (
                            <div
                                key={opt}
                                className="flex items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 text-muted-foreground">
                                        <Bed className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-[#1a1a1a]">
                                            {opt}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {opt + " description"}
                                        </div>
                                    </div>
                                </div>

                                <CounterFilter
                                    label={opt}
                                    count={sleepingAreas.bedrooms[selectedBedroomIndex].beds[opt]}
                                    setCount={(next) => {
                                        setSleepingAreas((prev) => {
                                            const updated = structuredClone(prev); // or immer
                                            updated.bedrooms[selectedBedroomIndex].beds[opt] = next;
                                            return updated;
                                        })
                                    }}
                                />
                            </div>
                        ))}
                        {selectedBedroomIndex == null && livingRoomBedTypeValues.map((opt) => (
                            <div
                                key={opt}
                                className="flex items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 text-muted-foreground">
                                        <Bed className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-[#1a1a1a]">
                                            {opt}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {opt + " description"}
                                        </div>
                                    </div>
                                </div>

                                <CounterFilter
                                    label={opt}
                                    count={sleepingAreas.livingRoom.beds[opt]}
                                    setCount={(next) => {
                                        setSleepingAreas((prev) => {
                                            const updated = structuredClone(prev); // or immer
                                            updated.livingRoom.beds[opt] = next;
                                            return updated;
                                        })
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Footer */}
                <div className="px-6 py-5">
                    <Button
                        type="button"
                        // onClick={handleSave}
                        className="w-full h-12 text-base bg-[#0071c2] hover:bg-[#005fa3]"
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
