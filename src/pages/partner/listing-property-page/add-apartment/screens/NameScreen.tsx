import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import HelpCard from "./HelpCard";
import { Lightbulb, ThumbsUp } from "lucide-react";
import { InlineFieldErrorBaner } from "@/components/error-baners/InlineFieldErrorBaner";
import { useAppSelector } from "@/store/hooks";
import { selectAddApartmentErrors } from "@/store/partner/manage-property/apartment/apartment.selector";
import { inputClass } from "../AddAppartmentPage";

interface NameScreenProps {
  propertyName: string;
  setPropertyName: (v: string) => void;
}

export default function NameScreen({ propertyName, setPropertyName }: NameScreenProps) {
  const addApartmentErrors = useAppSelector(selectAddApartmentErrors);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 ml-2 mr-2 mt-1">
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a]">
          What&apos;s the name of your place?
        </h1>

        <div className="mt-8">
          <Card className="rounded-md">
            <CardContent className="p-6">
              <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                Property name
              </div>
              <InlineFieldErrorBaner message={addApartmentErrors?.propertyName} />
              <Input
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder=""
                className={inputClass(!!addApartmentErrors?.propertyName) + "h-10 text-black"}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <HelpCard
          icon={<ThumbsUp className="h-5 w-5" />}
          title="What should I consider when choosing a name?"
        >
          <ul className="list-disc pl-5 space-y-1">
            <li>Keep it short and catchy</li>
            <li>Avoid abbreviations</li>
            <li>Stick to the facts</li>
          </ul>
        </HelpCard>

        <HelpCard
          icon={<Lightbulb className="h-5 w-5" />}
          title="Why do I need to name my property?"
        >
          <p>
            This is the name that will appear as the title of your listing. It
            should tell guests something specific about your place. Don’t
            include your address in the name.
          </p>
        </HelpCard>
      </div>
    </div>
  )
}
