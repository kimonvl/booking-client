// AddApartmentPage.tsx
// Monolith page that mimics Booking.com “Add apartment” flow (layout only).
// NOTE: Header is NOT included (it already exists in your Partner layout).

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Lightbulb,
  ThumbsUp,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type StepKey = "basic" | "setup" | "photos" | "pricing" | "legal" | "review";
type BasicStage = "name" | "address";
type SetupStage = "details" | "amenities" | "services" | "languages" | "rules";
type PricingStage = "price" | "rates";

type PhotoItem = {
  id: string;
  file: File;
  url: string;
};

export default function AddApartmentPage() {
  /**
   * -----------------------------
   * TOP-LEVEL STEPS (HEADER BAR)
   * -----------------------------
   */
  const steps = useMemo(
    () =>
      [
        { key: "basic", label: "Basic information" },
        { key: "setup", label: "Property setup" },
        { key: "photos", label: "Photos" },
        { key: "pricing", label: "Pricing and calendar" },
        { key: "legal", label: "Legal information" },
        { key: "review", label: "Review and complete" },
      ] as const,
    []
  );

  const [activeStep, setActiveStep] = useState<StepKey>("basic");

  // Sub-stages inside each step (since screenshots show multiple screens per step).
  const [basicStage, setBasicStage] = useState<BasicStage>("name");
  const [setupStage, setSetupStage] = useState<SetupStage>("details");
  const [pricingStage, setPricingStage] = useState<PricingStage>("price");

  /**
   * -----------------------------
   * BASIC INFORMATION (STATE)
   * -----------------------------
   */
  const [propertyName, setPropertyName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("Greece");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [updatePinOnMap, setUpdatePinOnMap] = useState(true); // UI only (no map)

  /**
   * -----------------------------
   * PROPERTY SETUP (STATE)
   * -----------------------------
   */
  const [sleepingAreas, setSleepingAreas] = useState<
    { title: string; meta: string }[]
  >([
    { title: "Bedroom 1", meta: "1 double bed" },
    { title: "Living room", meta: "0 beds" },
    { title: "Other spaces", meta: "0 beds" },
  ]);

  const [guests, setGuests] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);

  const [allowChildren, setAllowChildren] = useState<"yes" | "no">("yes");
  const [offerCots, setOfferCots] = useState<"yes" | "no">("no");

  const [aptSize, setAptSize] = useState("");
  const [aptSizeUnit, setAptSizeUnit] = useState<"sqm" | "sqft">("sqm");

  // Amenities (checkbox groups)
  const [amenities, setAmenities] = useState<Record<string, boolean>>({
    "Air conditioning": false,
    Heating: false,
    "Free WiFi": false,
    "Electric vehicle charging station": false,

    Kitchen: false,
    Kitchenette: false,
    "Washing machine": false,

    "Flat-screen TV": false,
    "Swimming pool": false,
    "Hot tub": false,
    Minibar: false,
    Sauna: false,

    Balcony: false,
    "Garden view": false,
    Terrace: false,
    View: false,
  });

  // Services
  const [serveBreakfast, setServeBreakfast] = useState<"yes" | "no">("no");
  const [parking, setParking] = useState<"free" | "paid" | "no">("no");

  // Languages
  const [languages, setLanguages] = useState<Record<string, boolean>>({
    English: true,
    French: false,
    German: false,
    Greek: true,
    Spanish: false,
  });

  // House rules
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [partiesAllowed, setPartiesAllowed] = useState(false);
  const [pets, setPets] = useState<"yes" | "upon" | "no">("no");

  const [checkInFrom, setCheckInFrom] = useState("15:00");
  const [checkInUntil, setCheckInUntil] = useState("18:00");
  const [checkOutFrom, setCheckOutFrom] = useState("08:00");
  const [checkOutUntil, setCheckOutUntil] = useState("11:00");

  /**
   * -----------------------------
   * PHOTOS (STATE)
   * -----------------------------
   */
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [mainPhotoId, setMainPhotoId] = useState<string | null>(null);

  useEffect(() => {
    // cleanup object URLs on unmount
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * -----------------------------
   * PRICING (STATE)
   * -----------------------------
   */
  const [pricePerNight, setPricePerNight] = useState<string>("");

  /**
   * -----------------------------
   * STEP COMPLETION (for header icons)
   * -----------------------------
   */
  const stepDone = useMemo(() => {
    const basicDone =
      propertyName.trim().length > 0 &&
      addressLine1.trim().length > 0 &&
      city.trim().length > 0 &&
      zip.trim().length > 0;

    const setupDone = true; // layout-only; you can tighten later
    const photosDone = photos.length >= 5;
    const pricingDone = Number(pricePerNight) > 0;

    return {
      basic: basicDone,
      setup: setupDone,
      photos: photosDone,
      pricing: pricingDone,
      legal: false,
      review: false,
    } as Record<StepKey, boolean>;
  }, [addressLine1, city, photos.length, pricePerNight, propertyName, zip]);

  /**
   * -----------------------------
   * NAV LOGIC (Back / Continue)
   * -----------------------------
   */
  const activeStepIndex = steps.findIndex((s) => s.key === activeStep);

  const canContinue = useMemo(() => {
    // Basic
    if (activeStep === "basic" && basicStage === "name") {
      return propertyName.trim().length > 0;
    }
    if (activeStep === "basic" && basicStage === "address") {
      return (
        addressLine1.trim().length > 0 &&
        city.trim().length > 0 &&
        zip.trim().length > 0
      );
    }

    // Setup
    if (activeStep === "setup") {
      // keep most screens always continuable (layout-only)
      return true;
    }

    // Photos
    if (activeStep === "photos") {
      return photos.length >= 5;
    }

    // Pricing
    if (activeStep === "pricing" && pricingStage === "price") {
      return Number(pricePerNight) > 0;
    }
    if (activeStep === "pricing" && pricingStage === "rates") {
      return true;
    }

    // Legal / Review
    if (activeStep === "legal" || activeStep === "review") {
      return true;
    }

    return false;
  }, [
    activeStep,
    addressLine1,
    basicStage,
    city,
    photos.length,
    pricePerNight,
    pricingStage,
    propertyName,
    zip,
  ]);

  const goBack = () => {
    // Back within Basic
    if (activeStep === "basic" && basicStage === "address") {
      setBasicStage("name");
      return;
    }

    // Back within Setup
    if (activeStep === "setup") {
      const order: SetupStage[] = [
        "details",
        "amenities",
        "services",
        "languages",
        "rules",
      ];
      const idx = order.indexOf(setupStage);
      if (idx > 0) setSetupStage(order[idx - 1]);
      else setActiveStep("basic");
      return;
    }

    // Back within Pricing
    if (activeStep === "pricing" && pricingStage === "rates") {
      setPricingStage("price");
      return;
    }

    // Back between steps
    if (activeStepIndex > 0) {
      setActiveStep(steps[activeStepIndex - 1].key);
    }
  };

  const goNext = () => {
    // Next within Basic
    if (activeStep === "basic" && basicStage === "name") {
      setBasicStage("address");
      return;
    }
    if (activeStep === "basic" && basicStage === "address") {
      setActiveStep("setup");
      return;
    }

    // Next within Setup
    if (activeStep === "setup") {
      const order: SetupStage[] = [
        "details",
        "amenities",
        "services",
        "languages",
        "rules",
      ];
      const idx = order.indexOf(setupStage);
      if (idx < order.length - 1) setSetupStage(order[idx + 1]);
      else setActiveStep("photos");
      return;
    }

    // Next Photos -> Pricing
    if (activeStep === "photos") {
      setActiveStep("pricing");
      setPricingStage("price");
      return;
    }

    // Next within Pricing
    if (activeStep === "pricing" && pricingStage === "price") {
      setPricingStage("rates");
      return;
    }
    if (activeStep === "pricing" && pricingStage === "rates") {
      setActiveStep("legal");
      return;
    }

    // Legal -> Review
    if (activeStep === "legal") {
      setActiveStep("review");
      return;
    }
  };

  /**
   * -----------------------------
   * PHOTOS HELPERS
   * -----------------------------
   */
  const onPickPhotos = () => fileInputRef.current?.click();

  const onPhotosSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const next: PhotoItem[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      next.push({
        id: crypto.randomUUID(),
        file,
        url,
      });
    });

    setPhotos((prev) => {
      const merged = [...prev, ...next];
      // if no main photo yet, set the first
      if (!mainPhotoId && merged.length > 0) {
        setMainPhotoId(merged[0].id);
      }
      return merged;
    });
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);

      const next = prev.filter((p) => p.id !== id);

      // adjust main photo
      if (mainPhotoId === id) {
        setMainPhotoId(next.length ? next[0].id : null);
      }
      return next;
    });
  };

  /**
   * -----------------------------
   * UI: SMALL HELP CARD (right column)
   * -----------------------------
   */
  const HelpCard = ({
    icon,
    title,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }) => (
    <Card className="rounded-md border bg-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground">{icon}</div>
            <div>
              <div className="font-semibold text-[#1a1a1a]">{title}</div>
            </div>
          </div>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 text-sm text-muted-foreground leading-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );

  /**
   * -----------------------------
   * HEADER BAR (STEP PROGRESS)
   * -----------------------------
   */
  const StepHeader = () => {
    const attentionSteps: Partial<Record<StepKey, boolean>> = {
      pricing: true,
      legal: true,
    };

    return (
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Labels row */}
          <div className="pt-5 pb-3">
            <div className="flex items-center justify-between gap-3">
              {steps.map((s) => {
                const isActive = s.key === activeStep;
                const isDone = stepDone[s.key];
                const isAttention = !!attentionSteps[s.key] && !isDone;

                return (
                  <div
                    key={s.key}
                    className="flex-1 min-w-0"
                    title={s.label}
                  >
                    <div
                      className={[
                        "flex items-center gap-2 text-sm whitespace-nowrap",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : isAttention ? (
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                      ) : (
                        <span className="h-4 w-4 inline-block" />
                      )}

                      <span className="truncate">{s.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress segments row */}
            <div className="mt-3 flex items-center gap-3">
              {steps.map((s) => {
                const isActive = s.key === activeStep;
                const isDone = stepDone[s.key];
                return (
                  <div key={`${s.key}-bar`} className="flex-1">
                    <div
                      className={[
                        "h-1 rounded-full",
                        isDone
                          ? "bg-green-500"
                          : isActive
                          ? "bg-[#0071c2]"
                          : "bg-gray-200",
                      ].join(" ")}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * -----------------------------
   * CONTENT: BASIC INFORMATION
   * -----------------------------
   */
  const BasicNameScreen = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
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
              <Input
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder=""
                className="h-10"
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
  );

  const BasicAddressScreen = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a]">
          Where is your property?
        </h1>

        {/* NOTE: user asked to NOT implement the map.
            We keep normal background like the rest (card form only). */}
        <div className="mt-8">
          <Card className="rounded-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                    Find your address
                  </div>
                  <Input
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="Address"
                    className="h-10"
                  />
                </div>

                <div>
                  <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                    Apartment or floor number (optional)
                  </div>
                  <Input
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder=""
                    className="h-10"
                  />
                </div>

                <div>
                  <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                    Country/region
                  </div>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Greece">Greece</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                      City
                    </div>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder=""
                      className="h-10"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                      Post code / Zip code
                    </div>
                    <Input
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder=""
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    checked={updatePinOnMap}
                    onCheckedChange={(v) => setUpdatePinOnMap(!!v)}
                    className="mt-0.5"
                  />
                  <div className="text-sm text-muted-foreground">
                    Update the address when moving the pin on the map.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <HelpCard
          icon={<ThumbsUp className="h-5 w-5" />}
          title="Tip"
        >
          <p>
            Make sure your address is accurate — it helps guests find you and
            improves the quality of your listing.
          </p>
        </HelpCard>
      </div>
    </div>
  );

  /**
   * -----------------------------
   * CONTENT: PROPERTY SETUP
   * -----------------------------
   */
  const SetupDetailsScreen = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
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
                {sleepingAreas.map((a, idx) => (
                  <div
                    key={`${a.title}-${idx}`}
                    className="flex items-center justify-between rounded-md border bg-white px-4 py-3 shadow-sm"
                  >
                    <div>
                      <div className="font-medium text-[#1a1a1a]">{a.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {a.meta}
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 w-10 rounded-full border-gray-300"
                      onClick={() => {
                        // Layout-only: remove (except keep at least 1)
                        setSleepingAreas((prev) =>
                          prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev
                        );
                      }}
                      aria-label="Remove"
                    >
                      <span className="text-xl leading-none">−</span>
                    </Button>
                  </div>
                ))}

                <button
                  type="button"
                  className="text-[#0071c2] hover:underline text-sm font-medium"
                  onClick={() =>
                    setSleepingAreas((prev) => [
                      ...prev,
                      { title: `Bedroom ${prev.length}`, meta: "0 beds" },
                    ])
                  }
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
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  How many guests can stay?
                </div>
                <div className="mt-3 inline-flex items-center rounded-md border overflow-hidden">
                  <button
                    type="button"
                    className="h-10 w-12 grid place-items-center hover:bg-muted"
                    onClick={() => setGuests((v) => Math.max(1, v - 1))}
                  >
                    −
                  </button>
                  <div className="h-10 w-16 grid place-items-center font-semibold">
                    {guests}
                  </div>
                  <button
                    type="button"
                    className="h-10 w-12 grid place-items-center hover:bg-muted"
                    onClick={() => setGuests((v) => v + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  How many bathrooms are there?
                </div>
                <div className="mt-3 inline-flex items-center rounded-md border overflow-hidden">
                  <button
                    type="button"
                    className="h-10 w-12 grid place-items-center hover:bg-muted"
                    onClick={() => setBathrooms((v) => Math.max(0, v - 1))}
                  >
                    −
                  </button>
                  <div className="h-10 w-16 grid place-items-center font-semibold">
                    {bathrooms}
                  </div>
                  <button
                    type="button"
                    className="h-10 w-12 grid place-items-center hover:bg-muted"
                    onClick={() => setBathrooms((v) => v + 1)}
                  >
                    +
                  </button>
                </div>
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
                  value={allowChildren}
                  onValueChange={(v) => setAllowChildren(v as any)}
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
                  value={offerCots}
                  onValueChange={(v) => setOfferCots(v as any)}
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
                  value={aptSizeUnit}
                  onValueChange={(v) => setAptSizeUnit(v as any)}
                >
                  <SelectTrigger className="h-10 w-44">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqm">square metres</SelectItem>
                    <SelectItem value="sqft">square feet</SelectItem>
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
  );

  const SetupAmenitiesScreen = () => {
    const groups = [
      {
        title: "General",
        items: [
          "Air conditioning",
          "Heating",
          "Free WiFi",
          "Electric vehicle charging station",
        ],
      },
      {
        title: "Cooking and cleaning",
        items: ["Kitchen", "Kitchenette", "Washing machine"],
      },
      {
        title: "Entertainment",
        items: ["Flat-screen TV", "Swimming pool", "Hot tub", "Minibar", "Sauna"],
      },
      {
        title: "Outside and view",
        items: ["Balcony", "Garden view", "Terrace", "View"],
      },
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a]">
            What can guests use at your place?
          </h1>

          <div className="mt-8">
            <Card className="rounded-md">
              <CardContent className="p-6">
                <div className="space-y-10">
                  {groups.map((g) => (
                    <div key={g.title}>
                      <div className="text-lg font-semibold text-[#1a1a1a]">
                        {g.title}
                      </div>

                      <div className="mt-4 space-y-3">
                        {g.items.map((name) => (
                          <label
                            key={name}
                            className="flex items-center gap-3"
                          >
                            <Checkbox
                              checked={!!amenities[name]}
                              onCheckedChange={(v) =>
                                setAmenities((prev) => ({
                                  ...prev,
                                  [name]: !!v,
                                }))
                              }
                            />
                            <span className="text-sm">{name}</span>
                          </label>
                        ))}
                      </div>

                      <div className="mt-8">
                        <Separator />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <HelpCard icon={<ThumbsUp className="h-5 w-5" />} title="Tip">
            <p>
              Add only what you really offer — amenities affect guest
              expectations and reviews.
            </p>
          </HelpCard>
        </div>
      </div>
    );
  };

  const SetupServicesScreen = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
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
                value={serveBreakfast}
                onValueChange={(v) => setServeBreakfast(v as any)}
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
                value={parking}
                onValueChange={(v) => setParking(v as any)}
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
  );

  const SetupLanguagesScreen = () => {
    const langs = Object.keys(languages);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a]">
            What languages do you or your staff speak?
          </h1>

          <div className="mt-8">
            <Card className="rounded-md">
              <CardContent className="p-6">
                <div className="text-sm font-semibold text-[#1a1a1a]">
                  Select languages
                </div>

                <div className="mt-4 space-y-3">
                  {langs.map((l) => (
                    <label key={l} className="flex items-center gap-3">
                      <Checkbox
                        checked={!!languages[l]}
                        onCheckedChange={(v) =>
                          setLanguages((prev) => ({ ...prev, [l]: !!v }))
                        }
                      />
                      <span className="text-sm">{l}</span>
                    </label>
                  ))}
                </div>

                <Separator className="my-8" />

                <button
                  type="button"
                  className="text-[#0071c2] hover:underline text-sm font-medium"
                >
                  Add additional languages
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <HelpCard icon={<ThumbsUp className="h-5 w-5" />} title="Tip">
            <p>
              Guests feel more confident booking when they know they can
              communicate easily.
            </p>
          </HelpCard>
        </div>
      </div>
    );
  };

  const SetupRulesScreen = () => {
    const times = [
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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
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
                    value={pets}
                    onValueChange={(v) => setPets(v as any)}
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
  };

  /**
   * -----------------------------
   * CONTENT: PHOTOS
   * -----------------------------
   */
  const PhotosScreen = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a]">
          What does your place look like?
        </h1>

        <div className="mt-8 space-y-6">
          <Card className="rounded-md">
            <CardContent className="p-6">
              <div className="text-sm font-semibold text-[#1a1a1a]">
                Upload at least 5 photos of your property.
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                The more you upload, the more likely you are to get bookings.
                You can add more later.
              </div>

              {/* Drop area */}
              <div className="mt-5 rounded-md border-2 border-dashed p-8 text-center">
                <div className="text-sm font-semibold text-[#1a1a1a]">
                  Drag and drop or
                </div>

                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onPickPhotos}
                    className="border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0fa]"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload photos
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    className="hidden"
                    onChange={(e) => onPhotosSelected(e.target.files)}
                  />
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  jpg/jpeg or png, maximum 47MB each
                </div>
              </div>

              <Separator className="my-6" />

              <div className="text-sm text-muted-foreground leading-6">
                Choose a <span className="font-semibold">main photo</span> that
                will make a good first impression. Click photos to set as main,
                and remove photos using the X.
              </div>

              {/* Thumbnails */}
              <div className="mt-6 grid grid-cols-2 gap-5">
                {photos.map((p) => {
                  const isMain = p.id === mainPhotoId;
                  return (
                    <div
                      key={p.id}
                      className={[
                        "relative rounded-md overflow-hidden border shadow-sm cursor-pointer",
                        isMain ? "ring-2 ring-orange-400" : "",
                      ].join(" ")}
                      onClick={() => setMainPhotoId(p.id)}
                      title={isMain ? "Main photo" : "Set as main"}
                    >
                      {isMain && (
                        <div className="absolute left-3 top-3 z-10">
                          <span className="text-xs font-semibold bg-orange-500 text-white px-2 py-1 rounded">
                            Main photo
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full bg-white/95 grid place-items-center shadow"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(p.id);
                        }}
                        aria-label="Remove photo"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <img
                        src={p.url}
                        alt="Uploaded"
                        className="h-44 w-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bottom validation text (like screenshot) */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>
              {photos.length >= 5
                ? "Great! You have enough photos to continue."
                : `Upload at least ${Math.max(0, 5 - photos.length)} more photo${
                    5 - photos.length === 1 ? "" : "s"
                  } to continue`}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <HelpCard
          icon={<ThumbsUp className="h-5 w-5" />}
          title="What if I don't have professional photos?"
        >
          <p>
            No problem! You can use a smartphone or digital camera. Use bright
            lighting and show the key areas guests care about most.
          </p>
          <div className="mt-3">
            <button
              type="button"
              className="text-[#0071c2] hover:underline text-sm font-medium"
            >
              Here are some tips for taking great photos of your property
            </button>
          </div>
          <p className="mt-3">
            Only use photos you have permission to use.
          </p>
        </HelpCard>
      </div>
    </div>
  );

  /**
   * -----------------------------
   * CONTENT: PRICING & CALENDAR
   * -----------------------------
   */
  const PricingPriceScreen = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
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

              <div className="mt-2 flex items-center gap-2">
                <div className="h-10 w-10 rounded-md border grid place-items-center text-muted-foreground">
                  €
                </div>
                <Input
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)}
                  className="h-10"
                  placeholder=""
                  inputMode="decimal"
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
  );

  const PricingRatesScreen = () => (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-[#1a1a1a]">Rate plans</h1>

      <div className="mt-8 space-y-8">
        <Card className="rounded-md">
          <CardContent className="p-6 text-sm text-muted-foreground leading-6">
            To attract a wider range of guests, we suggest setting up multiple
            rate plans. The recommended prices and policies for each plan are
            based on data from properties like yours, but they can be edited now
            or after you complete registration.
          </CardContent>
        </Card>

        {/* Standard */}
        <div>
          <div className="text-2xl font-semibold text-[#1a1a1a] mb-4">
            Standard rate plan
          </div>

          <Card className="rounded-md">
            <CardContent className="p-6 space-y-8">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-[#1a1a1a]">
                      Cancellation policy{" "}
                      <span className="text-muted-foreground font-normal">ⓘ</span>
                    </div>
                    <div className="mt-2 text-sm text-green-700">
                      You&apos;re 91% more likely to get bookings with the
                      pre-selected cancellation policy settings than with a
                      30-day cancellation policy
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0fa]"
                  >
                    Edit
                  </Button>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex gap-3">
                    <div className="h-7 w-7 rounded-full border grid place-items-center">
                      ✓
                    </div>
                    <div>
                      Guests can cancel their bookings for free up to 1 day
                      before their arrival
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-7 w-7 rounded-full border grid place-items-center">
                      ✓
                    </div>
                    <div>
                      Guests who cancel within 24 hours will have their
                      cancellation fee waived
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-[#1a1a1a]">
                      Price per group size{" "}
                      <span className="text-muted-foreground font-normal">ⓘ</span>
                    </div>
                    <div className="mt-2 text-sm text-amber-700">
                      Set lower prices for smaller groups of guests to increase
                      your chances of getting bookings
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0fa]"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Non-refundable */}
        <div>
          <div className="text-2xl font-semibold text-[#1a1a1a] mb-4">
            Non-refundable rate plan
          </div>

          <Card className="rounded-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-[#1a1a1a]">
                    Price and cancellation policy{" "}
                    <span className="text-muted-foreground font-normal">ⓘ</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0fa]"
                >
                  Edit
                </Button>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="h-7 w-7 rounded-full border grid place-items-center">
                    ✓
                  </div>
                  <div>
                    Guests will pay 10% less than the standard rate for a
                    non-refundable rate
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-7 w-7 rounded-full border grid place-items-center">
                    ✓
                  </div>
                  <div>Guests cannot cancel their bookings for free at any time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly */}
        <div>
          <div className="text-2xl font-semibold text-[#1a1a1a] mb-4">
            Weekly rate plan
          </div>

          <Card className="rounded-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-[#1a1a1a]">
                    Price and cancellation policy{" "}
                    <span className="text-muted-foreground font-normal">ⓘ</span>
                  </div>
                  <div className="mt-2 text-sm text-green-700">
                    You&apos;re 16% more likely to get bookings with the 15%
                    pre-selected weekly rate than with none
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0fa]"
                >
                  Edit
                </Button>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="h-7 w-7 rounded-full border grid place-items-center">
                    ✓
                  </div>
                  <div>
                    Guests will pay 15% less than the standard rate when they
                    book for at least 7 nights
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-7 w-7 rounded-full border grid place-items-center">
                    ✓
                  </div>
                  <div>
                    Guests can cancel their bookings for free up to 1 day before
                    their arrival (based on the standard rate cancellation policy)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  /**
   * -----------------------------
   * CONTENT: LEGAL / REVIEW (placeholders)
   * -----------------------------
   */
  const PlaceholderScreen = ({ title }: { title: string }) => (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-[#1a1a1a]">{title}</h1>
      <div className="mt-6 text-muted-foreground">
        Coming soon — we’ll fill this section next.
      </div>
    </div>
  );

  /**
   * -----------------------------
   * MAIN CONTENT SWITCH
   * -----------------------------
   */
  const content = useMemo(() => {
    if (activeStep === "basic") {
      return basicStage === "name" ? <BasicNameScreen /> : <BasicAddressScreen />;
    }

    if (activeStep === "setup") {
      switch (setupStage) {
        case "details":
          return <SetupDetailsScreen />;
        case "amenities":
          return <SetupAmenitiesScreen />;
        case "services":
          return <SetupServicesScreen />;
        case "languages":
          return <SetupLanguagesScreen />;
        case "rules":
          return <SetupRulesScreen />;
        default:
          return <SetupDetailsScreen />;
      }
    }

    if (activeStep === "photos") return <PhotosScreen />;

    if (activeStep === "pricing") {
      return pricingStage === "price" ? <PricingPriceScreen /> : <PricingRatesScreen />;
    }

    if (activeStep === "legal") return <PlaceholderScreen title="Legal information" />;
    if (activeStep === "review") return <PlaceholderScreen title="Review and complete" />;

    return null;
  }, [activeStep, basicStage, pricingStage, setupStage]);

  /**
   * -----------------------------
   * FOOTER NAV (sticky)
   * -----------------------------
   */
  const FooterNav = () => (
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
            onClick={goNext}
            disabled={!canContinue}
            className={[
              "h-14 flex-1 max-w-[560px] text-base font-semibold",
              "bg-[#0071c2] hover:bg-[#005fa3]",
              "disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200",
            ].join(" ")}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Step progress bar (below your layout header) */}
      <StepHeader />

      {/* Main page content */}
      <div className="max-w-6xl mx-auto px-6 py-10">{content}</div>

      {/* Sticky footer nav */}
      <FooterNav />
    </div>
  );
}
