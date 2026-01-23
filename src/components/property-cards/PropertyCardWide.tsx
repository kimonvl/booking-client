import type { PropertyShort } from "@/store/guest/property/guestProperty.types";
import { Heart, ChevronRight, Info } from "lucide-react";
import { useMemo, useState } from "react";

function Stars({ count = 0 }: { count?: number }) {
    const stars = Array.from({ length: Math.max(0, Math.min(5, count)) });
    return (
        <span className="inline-flex items-center gap-1">
            {stars.map((_, i) => (
                <span key={i} className="text-[#febb02] text-sm leading-none">
                    ■
                </span>
            ))}
        </span>
    );
}

export interface PropertyCardWideProps {
    property: PropertyShort;
}

export default function PropertyCardWide({property}: PropertyCardWideProps) {
    const [showTip, setShowTip] = useState(false);
    const bullets = ["Entire apartment", "1 bedroom", "1 living room", "1 bathroom", "1 kitchen", "45 m²"];
    const ratingValue = 9.8;
    const ratingLabel = "Wonderful";
    const reviewCount = 173;
    const nightsAndGuests = "1 night, 2 adults";

    const ratingText = useMemo(() => {
        if (ratingValue == null) return null;
        return ratingValue.toFixed(1);
    }, [ratingValue]);

    return (
        <div className="w-full rounded-xl border border-[#cce3ff] bg-[#f3f8ff] shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_260px] gap-0">
                {/* Image */}
                <div className="relative p-4 md:p-4">
                    <div className="relative h-[190px] md:h-[210px] w-full overflow-hidden rounded-lg bg-gray-100">
                        <img
                            src={property.mainPhotoUrl}
                            alt={property.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                        <button
                            type="button"
                            //   onClick={onSave}
                            className="absolute right-3 top-3 h-10 w-10 rounded-full bg-white/95 shadow flex items-center justify-center hover:bg-white"
                            aria-label="Save"
                        >
                            <Heart className="h-5 w-5 text-[#1a1a1a]" />
                        </button>
                    </div>
                </div>

                {/* Middle content */}
                <div className="px-4 pb-4 md:py-4 md:pr-4 md:pl-0">
                    <div className="flex items-start gap-2">
                        <h2 className="text-2xl font-bold text-[#0071c2] leading-tight">
                            {property.name}
                        </h2>
                        <Stars count={5} />
                    </div>

                    <div className="mt-1 text-sm">
                        <span className="text-[#0071c2] hover:underline cursor-pointer">
                            {property.address.city}
                        </span>
                    </div>

                    {true ? (
                        <div className="mt-3 inline-flex items-center rounded-md bg-[#008009] px-2 py-1 text-xs font-semibold text-white">
                            {"dealTag"}
                        </div>
                    ) : null}

                    {true ? (
                        <div className="mt-4 text-sm font-semibold text-[#1a1a1a]">
                            {"roomTitle"}
                        </div>
                    ) : null}

                    {bullets.length > 0 ? (
                        <div className="mt-1 text-sm text-gray-700">
                            {bullets.map((b, i) => (
                                <span key={i}>
                                    {b}
                                    {i < bullets.length - 1 ? (
                                        <span className="mx-1 text-gray-400">•</span>
                                    ) : null}
                                </span>
                            ))}
                        </div>
                    ) : null}

                    {property.bedSummary ? (
                        <div className="mt-2 text-sm text-gray-800">
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4"
                                onMouseEnter={() => setShowTip(true)}
                                onMouseLeave={() => setShowTip(false)}
                                onFocus={() => setShowTip(true)}
                                onBlur={() => setShowTip(false)}
                            >
                                {property.bedSummary}
                                <Info className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>
                    ) : null}
                </div>

                {/* Right content */}
                <div className="px-4 pb-4 md:py-4 md:px-4 flex flex-col justify-between">
                    {/* Rating */}
                    {(ratingLabel || ratingText) && (
                        <div className="flex items-start justify-end gap-3">
                            <div className="text-right">
                                {ratingLabel ? (
                                    <div className="font-semibold text-[#1a1a1a]">
                                        {ratingLabel}
                                    </div>
                                ) : null}
                                {reviewCount != null ? (
                                    <div className="text-sm text-gray-600">
                                        {reviewCount.toLocaleString()} reviews
                                    </div>
                                ) : null}
                            </div>

                            {ratingText ? (
                                <div className="h-10 w-10 rounded-md bg-[#003b95] text-white flex items-center justify-center font-bold">
                                    {ratingText}
                                </div>
                            ) : null}
                        </div>
                    )}

                    {/* Price block */}
                    <div className="mt-6 md:mt-0 text-right">
                        {nightsAndGuests ? (
                            <div className="text-sm text-gray-700">{nightsAndGuests}</div>
                        ) : null}

                        <div className="mt-1 flex items-end justify-end gap-2">
                            <div className="text-3xl font-bold text-[#1a1a1a]">
                                {property.pricePerNight}
                            </div>
                        </div>

                        <div className="mt-1 text-xs text-gray-600">{"taxesLine"}</div>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            // onClick={onSeeAvailability}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#0071c2] px-4 py-3 text-white font-semibold hover:bg-[#005fa3]"
                        >
                            See availability
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
