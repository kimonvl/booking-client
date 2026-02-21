import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface NavigationButonsProps {
    goBack: () => void;
    goNext: () => void;
    goNextWithError: () => void;
    hasErrors: boolean;
    canContinue: boolean;
    persistForm: () => void;
}

export default function NavigationButons({ goBack, goNext, goNextWithError, hasErrors, canContinue, persistForm }: NavigationButonsProps) {
    return (
        <div className=" bottom-0 bg-white border-t">
            <div className="max-w-6xl mx-auto px-6">
                <div className="py-5 flex items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={goBack}
                        className="h-14 w-16 border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0fa]"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        type="button"
                        onClick={() => {persistForm();goNext()}}
                        disabled={!canContinue}
                        className={[
                            "h-14 flex-1 max-w-[560px] text-base font-semibold",
                            "bg-[#0071c2] hover:bg-[#005fa3]",
                            "disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200",
                        ].join(" ")}
                    >
                        Continue
                    </Button>

                    {hasErrors && 
                    <Button
                        type="button"
                        variant="outline"
                        onClick={goNextWithError}
                        className="h-14 w-16 border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0fa]"
                    >
                        Next Error
                    </Button>}
                </div>
            </div>
        </div>
    )
}
