import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp } from "lucide-react";
import HelpCard from "./HelpCard";
import type {
  AddressType,
  AllowChildrenType,
  IsParkingAvailableType,
  OfferCotsType,
  PetsAllowedType,
  PhotoItem,
  ServeBreakfastType,
  SleepingAreasType,
  TimeType,
} from "../AddAppartmentPage";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedAmenityLabels, selectSelectedLanguageLabels } from "@/store/dictionaries/dictionary.selector";

type ReviewScreenProps = {
  propertyName: string;
  address: AddressType;

  sleepingAreas: SleepingAreasType;
  guestCount: number;
  bathroomCount: number;
  allowChildren: AllowChildrenType;
  offerCots: OfferCotsType;
  aptSize: string;

  amenities: Record<string, boolean>;

  serveBreakfast: ServeBreakfastType;
  isParkingAvailable: IsParkingAvailableType;

  languages: Record<string, boolean>;
  additionalLanguages: Record<string, boolean>;

  smokingAllowed: boolean;
  partiesAllowed: boolean;
  petsAllowed: PetsAllowedType;
  checkInFrom: TimeType;
  checkInUntil: TimeType;
  checkOutFrom: TimeType;
  checkOutUntil: TimeType;

  photos: PhotoItem[];
  mainPhotoId: string | null;

  pricePerNight: number;

  onConfirm: () => void;
};

const titleCase = (s: string) =>
  s
    .replaceAll("_", " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

function summarizeBeds(sleepingAreas: SleepingAreasType) {
  const bedroomLines = sleepingAreas.bedrooms.map((b, i) => {
    const text = Object.entries(b.beds)
      .filter(([, c]) => c > 0)
      .map(([t, c]) => `${c} ${titleCase(t)} bed${c > 1 ? "s" : ""}`)
      .join(", ");
    return `Bedroom ${i + 1}: ${text || "0 beds"}`;
  });

  const livingroomText = Object.entries(sleepingAreas.livingroom.beds)
    .filter(([, c]) => c > 0)
    .map(([t, c]) => `${c} ${titleCase(t)}${c > 1 ? "s" : ""}`)
    .join(", ");

  return {
    bedroomLines,
    livingroomLine: `Living room: ${livingroomText || "0 sofa beds"}`,
  };
}

export default function ReviewScreen(props: ReviewScreenProps) {
  const {
    propertyName,
    address,
    sleepingAreas,
    guestCount,
    bathroomCount,
    allowChildren,
    offerCots,
    aptSize,
    amenities,
    serveBreakfast,
    isParkingAvailable,
    languages,
    additionalLanguages,
    smokingAllowed,
    partiesAllowed,
    petsAllowed,
    checkInFrom,
    checkInUntil,
    checkOutFrom,
    checkOutUntil,
    photos,
    mainPhotoId,
    pricePerNight,
    onConfirm,
  } = props;

  const beds = summarizeBeds(sleepingAreas);

  const selectedAmenities = useAppSelector(state => selectSelectedAmenityLabels(state, amenities));
  const selectedLangs = useAppSelector(state => selectSelectedLanguageLabels(state, languages));
  const selectedAdditionalLangs = useAppSelector(state => selectSelectedLanguageLabels(state, additionalLanguages));

  const mainPhoto = mainPhotoId ? photos.find((p) => p.id === mainPhotoId) : null;
  const previewPhotos = photos.slice(0, 6);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a]">Review and complete</h1>
        <p className="mt-2 text-muted-foreground">
          Confirm the details you’ve added. You can go back and edit any section.
        </p>

        <div className="mt-8 space-y-6">
          {/* Basic info */}
          <Card className="rounded-md">
            <CardContent className="p-6 space-y-4">
              <div className="text-lg font-semibold text-[#1a1a1a]">Basic information</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-[#1a1a1a]">Property name</div>
                  <div className="text-sm text-muted-foreground">{propertyName || "—"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1a1a1a]">Address</div>
                  <div className="text-sm text-muted-foreground">
                    {[
                      `${address.streetName} ${address.streetNumber}`.trim(),
                      address.floorNumber ? `Floor/Apt: ${address.floorNumber}` : "",
                      `${address.city} ${address.postCode}`.trim(),
                      address.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property details */}
          <Card className="rounded-md">
            <CardContent className="p-6 space-y-4">
              <div className="text-lg font-semibold text-[#1a1a1a]">Property details</div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-[#1a1a1a]">Sleeping areas</div>
                  <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                    {beds.bedroomLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                    <div>{beds.livingroomLine}</div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">Guests</div>
                    <div className="text-sm text-muted-foreground">{guestCount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">Bathrooms</div>
                    <div className="text-sm text-muted-foreground">{bathroomCount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">Apartment size</div>
                    <div className="text-sm text-muted-foreground">{aptSize || "—"}</div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">Allow children</div>
                    <div className="text-sm text-muted-foreground">{titleCase(allowChildren)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">Offer cots</div>
                    <div className="text-sm text-muted-foreground">{titleCase(offerCots)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="rounded-md">
            <CardContent className="p-6 space-y-4">
              <div className="text-lg font-semibold text-[#1a1a1a]">Amenities</div>
              <div className="text-sm text-muted-foreground">
                {selectedAmenities.length ? selectedAmenities.join(", ") : "No amenities selected."}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="rounded-md">
            <CardContent className="p-6 space-y-4">
              <div className="text-lg font-semibold text-[#1a1a1a]">Services</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-[#1a1a1a]">Breakfast</div>
                  <div className="text-muted-foreground">{titleCase(serveBreakfast)}</div>
                </div>
                <div>
                  <div className="font-medium text-[#1a1a1a]">Parking</div>
                  <div className="text-muted-foreground">{titleCase(isParkingAvailable)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="rounded-md">
            <CardContent className="p-6 space-y-4">
              <div className="text-lg font-semibold text-[#1a1a1a]">Languages</div>

              <div className="space-y-2 text-sm">
                <div>
                  <div className="font-medium text-[#1a1a1a]">Main languages</div>
                  <div className="text-muted-foreground">
                    {selectedLangs.length ? selectedLangs.join(", ") : "—"}
                  </div>
                </div>

                <div>
                  <div className="font-medium text-[#1a1a1a]">Additional languages</div>
                  <div className="text-muted-foreground">
                    {selectedAdditionalLangs.length ? selectedAdditionalLangs.join(", ") : "—"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* House rules */}
          <Card className="rounded-md">
            <CardContent className="p-6 space-y-4">
              <div className="text-lg font-semibold text-[#1a1a1a]">House rules</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-[#1a1a1a]">Smoking allowed</div>
                  <div className="text-muted-foreground">{smokingAllowed ? "Yes" : "No"}</div>
                </div>
                <div>
                  <div className="font-medium text-[#1a1a1a]">Parties/events allowed</div>
                  <div className="text-muted-foreground">{partiesAllowed ? "Yes" : "No"}</div>
                </div>
                <div>
                  <div className="font-medium text-[#1a1a1a]">Pets</div>
                  <div className="text-muted-foreground">{petsAllowed}</div>
                </div>
                <div>
                  <div className="font-medium text-[#1a1a1a]">Check-in</div>
                  <div className="text-muted-foreground">
                    {checkInFrom} – {checkInUntil}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-[#1a1a1a]">Check-out</div>
                  <div className="text-muted-foreground">
                    {checkOutFrom} – {checkOutUntil}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className="rounded-md">
            <CardContent className="p-6 space-y-4">
              <div className="text-lg font-semibold text-[#1a1a1a]">Photos</div>

              <div className="text-sm text-muted-foreground">
                {photos.length} photo{photos.length === 1 ? "" : "s"} uploaded
                {mainPhoto ? ` • Main photo selected` : ""}
              </div>

              {photos.length > 0 && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {previewPhotos.map((p) => {
                    const isMain = p.id === mainPhotoId;
                    return (
                      <div
                        key={p.id}
                        className={[
                          "relative overflow-hidden rounded-md border bg-white",
                          isMain ? "ring-2 ring-[#0071c2]" : "",
                        ].join(" ")}
                      >
                        <img
                          src={p.url}
                          alt="Property"
                          className="h-28 w-full object-cover"
                        />
                        {isMain && (
                          <div className="absolute left-2 top-2 text-xs bg-[#0071c2] text-white px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Price */}
          <Card className="rounded-md">
            <CardContent className="p-6 space-y-3">
              <div className="text-lg font-semibold text-[#1a1a1a]">Pricing</div>
              <div className="text-sm text-muted-foreground">
                Price per night:{" "}
                <span className="font-semibold text-[#1a1a1a]">€ {pricePerNight}</span>
              </div>
            </CardContent>
          </Card>

          {/* Confirm */}
          <div className="pt-2">
            <Button
              type="button"
              onClick={onConfirm}
              className="w-full h-12 text-base bg-[#0071c2] hover:bg-[#005fa3]"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="space-y-6">
        <HelpCard icon={<ThumbsUp className="h-5 w-5" />} title="Tip">
          <p>
            Double-check your rules and amenities — this reduces guest confusion and improves reviews.
          </p>
        </HelpCard>
      </div>
    </div>
  );
}
