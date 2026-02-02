import { useEffect, useMemo, useState, type JSX } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Heart,
    Share2,
    MapPin,
    ChevronRight,
    Star,
    Info,
    BedDouble,
    Wifi,
    Snowflake,
    Bath,
    CookingPot,
    ParkingCircle,
    Check,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSelectedPropertyStart } from "@/store/guest/property/guestPropertySlice";
import { selectSelectedProperty, selectSelectedPropertyAmenitiesGroupedWithAvailability } from "@/store/guest/property/guestProperty.selector";
import HouseRulesSection from "./HouseRulesSection";
import { selectSearchPageNightsStay } from "@/store/guest/pages/search-page/searchPage.selector";

type AmenityChip = { icon: JSX.Element; label: string };

type RoomRow = {
    roomType: string;
    leftTag?: string; // "We have 1 left"
    bedLine?: string; // "1 queen bed"
    perks?: string[]; // bullet list
    oldPrice?: string;
    price?: string;
    nightsLine?: string; // "Price for 16 nights"
};

type ReviewCard = {
    name: string;
    country: string;
    text: string;
};

type Props = {
    // You will fill these later with real data
    title?: string;
    addressLine?: string;
    locationLinkLabel?: string;
    ratingValue?: number;
    ratingLabel?: string;
    reviewCount?: number;
    mainPhotoUrl?: string;
    galleryUrls?: string[];
    priceLine?: string;
    chips?: AmenityChip[];
    aboutTitle?: string;
    aboutText?: string;
    popularFacilities?: string[];
    rooms?: RoomRow[];
    reviewCategories?: { label: string; score: number }[];
    reviews?: ReviewCard[];
};

const defaultChips: AmenityChip[] = [
    { icon: <CookingPot className="h-5 w-5" />, label: "Apartments" },
    { icon: <MapPin className="h-5 w-5" />, label: "City view" },
    { icon: <Wifi className="h-5 w-5" />, label: "Free WiFi" },
    { icon: <ParkingCircle className="h-5 w-5" />, label: "Parking" },
    { icon: <Snowflake className="h-5 w-5" />, label: "Air conditioning" },
    { icon: <Bath className="h-5 w-5" />, label: "Private bathroom" },
];

const defaultReviewCategories = [
    { label: "Staff", score: 9.4 },
    { label: "Facilities", score: 8.9 },
    { label: "Cleanliness", score: 9.0 },
    { label: "Comfort", score: 9.0 },
    { label: "Value for money", score: 9.0 },
    { label: "Location", score: 8.9 },
    { label: "Free WiFi", score: 9.9 },
];

const defaultReviews: ReviewCard[] = [
    {
        name: "Averie",
        country: "United States",
        text:
            "I loved that it was in a local neighborhood that allowed us to walk to and from sightseeing locations!",
    },
    {
        name: "Pamela",
        country: "United States",
        text:
            "The cleanliness was phenomenal, the unit was fully stocked, great location, attentive host.",
    },
    {
        name: "Cheryl",
        country: "Canada",
        text:
            "The location was great, the place had everything we needed. Stovetop, dishes, utensils, kettle.",
    },
];

function ScorePill({ value }: { value: number | undefined }) {
    if (value == undefined) return;
    return (
        <div className="h-10 w-10 rounded-md bg-[#003b95] text-white flex items-center justify-center font-bold">
            {value.toFixed(1)}
        </div>
    );
}

export function SectionTitle({ id, title, right }: { id?: string; title: string; right?: JSX.Element }) {
    return (
        <div id={id} className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">{title}</h2>
            {right}
        </div>
    );
}

export default function PropertyDetailsPage(props: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { propertyId } = useParams();
    const property = useAppSelector(selectSelectedProperty);
    const groupedAmenities = useAppSelector(selectSelectedPropertyAmenitiesGroupedWithAvailability);
    const nights = useAppSelector(selectSearchPageNightsStay);

    useEffect(() => {
        if (propertyId === undefined) return;
        dispatch(getSelectedPropertyStart(propertyId))
    }, [propertyId])
    const {
        title = "Dinostratus House",
        locationLinkLabel = "Great location - show map",
        ratingLabel = "Excellent",
        reviewCount = 302,
        galleryUrls = [
            "https://picsum.photos/900/600?g1",
            "https://picsum.photos/900/600?g2",
            "https://picsum.photos/900/600?g3",
            "https://picsum.photos/900/600?g4",
            "https://picsum.photos/900/600?g5",
            "https://picsum.photos/900/600?g6",
        ],
        chips = defaultChips,
        aboutTitle = "Prime City Center Location",
        aboutText =
        "This property offers a convenient location with great infrastructure, cafes, restaurants, shopping and public transport nearby.",
        popularFacilities = ["Free WiFi", "Non-smoking rooms", "Heating", "Air conditioning"],
        reviewCategories = defaultReviewCategories,
        reviews = defaultReviews,
    } = props;

    const [activeTab, setActiveTab] = useState("overview");

    const thumbs = useMemo(() => galleryUrls.slice(0, 6), [galleryUrls]);

    return (
        <div className="overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Breadcrumbs */}
                <div className="text-sm text-muted-foreground">
                    <Link className="text-[#0071c2] hover:underline" to="/">Home</Link>{" "}
                    <span className="mx-1">{">"}</span>
                    <span className="text-[#0071c2] hover:underline cursor-pointer">Hotels</span>{" "}
                    <span className="mx-1">{">"}</span>
                    <span className="text-[#0071c2] hover:underline cursor-pointer">All apartments</span>{" "}
                    <span className="mx-1">{">"}</span>
                    <span className="text-[#0071c2] hover:underline cursor-pointer">Greece</span>{" "}
                    <span className="mx-1">{">"}</span>
                    <span className="text-[#0071c2] hover:underline cursor-pointer">Attica</span>{" "}
                    <span className="mx-1">{">"}</span>
                    <span className="text-[#0071c2] hover:underline cursor-pointer">Athens</span>{" "}
                    <span className="mx-1">{">"}</span>
                    <span className="text-muted-foreground">{title} Deals</span>
                </div>

                {/* Tabs header */}
                <div className="mt-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="bg-transparent p-0 h-auto gap-8">
                            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2] rounded-none px-0">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="price" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2] rounded-none px-0">
                                Apartment Info & Price
                            </TabsTrigger>
                            <TabsTrigger value="facilities" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2] rounded-none px-0">
                                Facilities
                            </TabsTrigger>
                            <TabsTrigger value="rules" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2] rounded-none px-0">
                                House rules
                            </TabsTrigger>
                            <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2] rounded-none px-0">
                                Guest reviews ({reviewCount})
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Header row */}
                <div className="mt-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-[#003b95] hover:bg-[#003b95]">Genius</Badge>
                            <div className="flex items-center gap-1 text-[#febb02]">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-[#febb02] stroke-[#febb02]" />
                                ))}
                            </div>
                            <Badge variant="outline" className="border-gray-300">
                                <Info className="h-4 w-4 mr-1" /> Quality rating
                            </Badge>
                        </div>

                        <h1 className="mt-2 text-4xl font-extrabold text-[#1a1a1a]">{title}</h1>

                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                            <MapPin className="h-4 w-4 text-[#0071c2]" />
                            <span>{`${property?.address.street} ${property?.address.streetNumber}, ${property?.address.city}, ${property?.address.postCode}, ${property?.address.country}`}</span>
                            <span className="text-[#0071c2] font-semibold cursor-pointer hover:underline">
                                {locationLinkLabel}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 justify-end">
                        <Button variant="ghost" className="h-10 w-10 rounded-full">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" className="h-10 w-10 rounded-full">
                            <Share2 className="h-5 w-5" />
                        </Button>
                        <Button className="bg-[#0071c2] hover:bg-[#005fa3] h-11 px-4">
                            Reserve your apartment stay
                        </Button>
                    </div>
                </div>

                {/* Gallery + right sidebar */}
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6">
                    {/* Gallery */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                                <div className="rounded-lg overflow-hidden bg-gray-100 h-[420px]">
                                    <img src={property?.mainPhotoUrl} className="w-full h-full object-cover" alt="Main" />
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-3">
                                <div className="rounded-lg overflow-hidden bg-gray-100 h-[205px]">
                                    <img src={property?.photoUrls[0]} className="w-full h-full object-cover" alt="thumb1" />
                                </div>
                                <div className="rounded-lg overflow-hidden bg-gray-100 h-[205px]">
                                    <img src={property?.photoUrls[1]} className="w-full h-full object-cover" alt="thumb2" />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails strip */}
                        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                            {property?.photoUrls.map((u, i) => {
                                if (i <= 1)
                                    return null;
                                return (
                                    <div key={i} className="min-w-[140px] h-[90px] rounded-lg overflow-hidden bg-gray-100">
                                        <img src={u} className="w-full h-full object-cover" alt={`thumb-${i}`} />
                                    </div>
                                )
                            })}
                            <div className="min-w-[140px] h-[90px] rounded-lg overflow-hidden bg-gray-900/70 text-white flex items-center justify-center font-semibold">
                                +{Math.max(0, galleryUrls.length - thumbs.length)} photos
                            </div>
                        </div>

                        {/* Chips */}
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            {chips.map((c, idx) => (
                                <Card key={idx} className="border-gray-200">
                                    <CardContent className="p-3 flex items-center gap-2">
                                        <div className="text-gray-700">{c.icon}</div>
                                        <div className="text-sm font-medium">{c.label}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="font-semibold">{ratingLabel}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {property?.reviewSummary.reviewCount} reviews
                                        </div>
                                    </div>
                                    {<ScorePill value={property?.reviewSummary.averageRating} />}
                                </div>

                                <Separator className="my-4" />

                                <div className="text-sm text-gray-700">
                                    Guests who stayed here loved:
                                </div>

                                <div className="mt-3 text-sm text-gray-700 leading-relaxed">
                                    “I loved that it was in a local neighborhood that allowed us to walk to and from sightseeing locations!”
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                                        A
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-semibold">Averie</div>
                                        <div className="text-muted-foreground text-xs">United States</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative h-56 bg-slate-100">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button className="bg-[#0071c2] hover:bg-[#005fa3]">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            Show on map
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
                                        Google
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Button className="w-full bg-[#0071c2] hover:bg-[#005fa3] h-12">
                            See availability <ChevronRight className="h-5 w-5 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* About */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                    <div className="space-y-4">
                        <SectionTitle
                            id="overview"
                            title="About this property"
                            right={<div className="hidden lg:block text-sm text-[#0071c2] font-semibold cursor-pointer">See availability</div>}
                        />
                        <div className="text-sm leading-relaxed text-gray-700">
                            <span className="font-semibold">{aboutTitle}:</span>{" "}
                            {aboutText}
                        </div>

                        <Button variant="outline" className="border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0ff]">
                            Show me more
                        </Button>

                        <div className="pt-4">
                            <div className="text-lg font-bold">Most popular facilities</div>
                            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
                                {popularFacilities.map((f) => (
                                    <div key={f} className="flex items-center gap-2">
                                        <Wifi className="h-4 w-4 text-green-600" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Genius card */}
                    <Card className="h-fit">
                        <CardContent className="p-5">
                            <div className="text-2xl font-bold">Your Genius Level 1 rewards</div>
                            <div className="mt-2 text-sm text-muted-foreground">
                                Available on select options:
                            </div>

                            <Separator className="my-4" />

                            <div className="flex items-start gap-3">
                                <div className="h-6 w-6 rounded-full bg-[#febb02] flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold">10% discount</div>
                                    <div className="text-muted-foreground">
                                        Applied to the price before taxes and fees
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Booking.com’s loyalty program</span>
                                <span className="font-bold text-[#003b95]">Genius</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Area info */}
                <div className="mt-12">
                    <SectionTitle title="Amenities" right={<></>} />

                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/**Amenity categories */}
                        {groupedAmenities.map((group) => (
                            <div key={group.title}>
                                <div className="mt-4 font-semibold">{group.title}</div>

                                <div className="mt-2 space-y-2 text-sm text-gray-700">
                                    {group.items.map((amenity) => (
                                        <div
                                            key={amenity.code}
                                            className={`flex items-center justify-between ${!amenity.available ? "opacity-50" : ""
                                                }`}
                                        >
                                            <span className={amenity.available ? "" : "line-through text-gray-400"}>
                                                {amenity.label}
                                            </span>

                                            {amenity.available ? (
                                                <Check className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <X className="h-4 w-4 text-gray-400" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Availability / Rooms */}
                <div className="mt-12">
                    <SectionTitle title="Availability" right={<span className="text-[#0071c2] font-semibold text-sm">We Price Match</span>} />

                    <div className="mt-4 rounded-lg border border-[#febb02] p-2 bg-white flex flex-col md:flex-row gap-2">
                        <div className="flex-1 h-12 rounded-md border border-[#febb02] flex items-center px-3 text-sm">
                            Thu, Feb 5 — Sat, Feb 21
                        </div>
                        <div className="flex-1 h-12 rounded-md border border-[#febb02] flex items-center px-3 text-sm">
                            2 adults · 0 children · 1 room
                        </div>
                        <Button className="h-12 bg-[#0071c2] hover:bg-[#005fa3]">
                            Change search
                        </Button>
                    </div>

                    <div className="mt-4 border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 bg-[#3b6aa0] text-white text-sm font-semibold">
                            <div className="col-span-4 p-3">Room type</div>
                            <div className="col-span-2 p-3">Guests</div>
                            <div className="col-span-2 p-3">Price</div>
                            <div className="col-span-2 p-3">Your choices</div>
                            <div className="col-span-2 p-3">Reserve</div>
                        </div>

                        
                            <div className="grid grid-cols-12 border-t">
                                <div className="col-span-4 p-4">
                                    <div className="text-[#0071c2] font-bold hover:underline cursor-pointer">
                                        {property?.type}
                                    </div>
                                    {property?.bedSummary && (
                                        <div className="mt-2 text-sm text-gray-700 flex items-center gap-2">
                                            <BedDouble className="h-4 w-4" />
                                            {property?.bedSummary}
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-2 p-4 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex h-2 w-2 rounded-full bg-gray-800" />
                                        <span className="inline-flex h-2 w-2 rounded-full bg-gray-800" />
                                    </div>
                                </div>

                                <div className="col-span-2 p-4">
                                    {nights && <div className="text-xs text-muted-foreground">{`Price for ${nights} nights`}</div>}
                                    {property?.pricePerNight && nights && <div className="text-xl font-bold text-[#1a1a1a]">{property.pricePerNight * nights}</div>}
                                    <div className="text-xs text-muted-foreground">Includes taxes and fees</div>
                                </div>

                                <div className="col-span-2 p-4 text-sm text-gray-700">
                                    <ul className="space-y-2">
                                        {(["perks", "perks", "perks"]).slice(0, 4).map((p) => (
                                            <li key={p} className="flex items-start gap-2">
                                                <Check className="h-4 w-4 text-green-600 mt-[2px]" />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col-span-2 p-4 flex items-center justify-center">
                                    <Button onClick={() => navigate("/guest-checkout-details")} className="bg-[#0071c2] hover:bg-[#005fa3]">
                                        I'll reserve
                                    </Button>
                                </div>
                            </div>
                        
                    </div>
                </div>

                {/* House rules */}
                {property && <HouseRulesSection property={property} />}

                {/* Guest reviews */}
                <div className="mt-12">
                    <SectionTitle title="Guest reviews" right={<Button className="bg-[#0071c2] hover:bg-[#005fa3]">See availability</Button>} />

                    <div className="mt-3 flex items-center gap-3">
                        <ScorePill value={property?.reviewSummary.averageRating} />
                        <div>
                            <div className="font-semibold">
                                {ratingLabel} <span className="text-muted-foreground">· {property?.reviewSummary.reviewCount} reviews</span>
                            </div>
                            <div className="text-sm text-[#0071c2] hover:underline cursor-pointer">Read all reviews</div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* category bars */}
                        <div className="lg:col-span-2">
                            <div className="font-semibold">Categories:</div>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {reviewCategories.map((c) => (
                                    <div key={c.label}>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{c.label}</span>
                                            <span className="tabular-nums">{c.score.toFixed(1)}</span>
                                        </div>
                                        <Progress value={Math.min(100, c.score * 10)} className="mt-2" />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <div className="font-semibold">See what guests loved the most:</div>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {reviews.map((r) => (
                                        <Card key={r.name} className="border-gray-200">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                                                        {r.name.slice(0, 1).toUpperCase()}
                                                    </div>
                                                    <div className="text-sm">
                                                        <div className="font-semibold">{r.name}</div>
                                                        <div className="text-muted-foreground text-xs">{r.country}</div>
                                                    </div>
                                                </div>

                                                <div className="mt-3 text-sm text-gray-700 leading-relaxed">
                                                    “{r.text}”
                                                </div>

                                                <div className="mt-3 text-sm text-[#0071c2] hover:underline cursor-pointer">
                                                    Read more
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <Button variant="outline" className="mt-5 border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0ff]">
                                    Read all reviews
                                </Button>
                            </div>
                        </div>

                        {/* topics/chips */}
                        <div className="space-y-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="font-semibold">Select topics to read reviews:</div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {["Location", "Clean", "Room", "Quiet", "Bed"].map((t) => (
                                            <Button key={t} variant="outline" className="rounded-full">
                                                + {t}
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="font-semibold">Quality rating</div>
                                    <div className="mt-1 text-sm text-muted-foreground">
                                        Booking.com rated the quality of this property based on facilities, size, location, and service.
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Travelers are asking */}
                

                

                {/* Bottom sticky-ish CTA (simple) */}
                <div className="mt-10 flex justify-end">
                    <Button className="bg-[#0071c2] hover:bg-[#005fa3]">
                        See availability <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
