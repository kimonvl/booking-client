import type { PropertyDetails } from "@/store/guest/property/guestProperty.types";
import { SectionTitle } from "./PropertyDetailsPage";
import { Card, CardContent } from "@/components/ui/card";
import type { JSX } from "react";
import { Baby, CigaretteOff, Clock, PartyPopper, PawPrint } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function RuleRow({
  icon,
  title,
  children,
}: {
  icon: JSX.Element;
  title: string;
  children: JSX.Element;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 px-6 py-5">
      <div className="flex items-start gap-3">
        <div className="mt-[2px] text-gray-700">{icon}</div>
        <div className="font-semibold text-[#1a1a1a] leading-5">{title}</div>
      </div>

      <div className="text-sm text-gray-700 leading-6">{children}</div>
    </div>
  );
}



export default function HouseRulesSection({ property }: { property: PropertyDetails }) {
  const checkInLine =
    property.checkInFrom && property.checkInUntil
      ? `From ${property.checkInFrom} to ${property.checkInUntil}`
      : property.checkInFrom
        ? `From ${property.checkInFrom}`
        : "Check-in time not specified";

  const checkOutLine =
    property.checkOutFrom && property.checkOutUntil
      ? `From ${property.checkOutFrom} to ${property.checkOutUntil}`
      : property.checkOutUntil
        ? `Until ${property.checkOutUntil}`
        : "Check-out time not specified";

  const petsLine =
    property.petsPolicy === "YES"
      ? "Pets are allowed."
      : property.petsPolicy === "UPON_REQUEST"
        ? "Pets are allowed upon request."
        : "Pets are not allowed.";

  return (
    <div className="mt-12">
      <SectionTitle id="rules" title="House rules" right={<></>} />

      <Card className="mt-4">
        <CardContent className="p-0">
          <RuleRow icon={<Clock className="h-5 w-5" />} title="Check-in">
            <>
              <div className="font-medium">{checkInLine}</div>
              <div className="text-muted-foreground">
                You need to let the property know what time you'll be arriving in advance.
              </div>
            </>
          </RuleRow>

          <Separator />

          <RuleRow icon={<Clock className="h-5 w-5" />} title="Check-out">
            <>
              <div className="font-medium">{checkOutLine}</div>
            </>
          </RuleRow>

          <Separator />

          <RuleRow icon={<Baby className="h-5 w-5" />} title="Children & Beds">
            <>
              <div className="font-medium">
                {property.childrenAllowed ? "Children of all ages are welcome." : "Children are not allowed."}
              </div>
              <div className="mt-2">
                {property.cotsOffered
                  ? "Crib is available upon request (subject to availability)."
                  : "There are no cots available at this property."}
              </div>
            </>
          </RuleRow>

          <Separator />

          <RuleRow icon={<CigaretteOff className="h-5 w-5" />} title="Smoking">
            <>
              {property.smokingAllowed ? "Smoking is allowed." : "Smoking is not allowed."}
            </>
          </RuleRow>

          <Separator />

          <RuleRow icon={<PartyPopper className="h-5 w-5" />} title="Parties">
            <>
              {property.partiesAllowed ? "Parties/events are allowed." : "Parties/events are not allowed."}
            </>
          </RuleRow>

          <Separator />

          <RuleRow icon={<PawPrint className="h-5 w-5" />} title="Pets">
            <>{petsLine}</>
          </RuleRow>
        </CardContent>
      </Card>
    </div>
  );
}
