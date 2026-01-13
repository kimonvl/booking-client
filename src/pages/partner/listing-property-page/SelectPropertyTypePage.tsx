import React, { useMemo } from "react";
import { Building2, Hotel } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

/**
 * AddPropertyPage (Monolith)
 * - ONLY the first screen (property type selection)
 * - ONLY 2 cards: Apartment + Hotel
 * - No wizard / no next steps yet
 */

const ACTION_BLUE = "#0071c2";

type PropertyTypeKey = "apartment" | "hotel";

type PropertyCard = {
    key: PropertyTypeKey;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: { text: string };
    ctaText: string;
};

export default function SelectPropertyTypePage() {
    const navigate = useNavigate();

    const cards = useMemo<PropertyCard[]>(
        () => [
            {
                key: "apartment",
                title: "Apartment",
                description:
                    "Furnished and self-catering accommodation, where guests rent the entire place.",
                icon: <Building2 className="h-16 w-16 text-[#1a4b9a]" />,
                badge: { text: "Quick start" },
                ctaText: "List your property",
            },
            {
                key: "hotel",
                title: "Hotel, B&Bs, and more",
                description:
                    "Properties like hotels, B&Bs, guest houses, hostels, aparthotels, etc.",
                icon: <Hotel className="h-16 w-16 text-[#1a4b9a]" />,
                ctaText: "List your property",
            },
        ],
        []
    );

    const onSelect = (type: PropertyTypeKey) => {
        navigate(`/partner/add-property/${type}`);
    };

    return (
        <>
            {/* =========================================================
          PAGE CONTENT
         ========================================================= */}
            <main className="max-w-[1100px] mx-auto px-6">
                <div className="pt-16 pb-10">
                    <h1 className="text-[40px] leading-tight font-bold text-[#1a1a1a] max-w-4xl">
                        List your property on Booking.com and start welcoming guests in no time!
                    </h1>
                    <p className="mt-6 text-lg text-[#1a1a1a]">
                        To get started, choose the type of property you want to list on Booking.com
                    </p>
                </div>

                {/* =========================================================
            PROPERTY TYPE CARDS (only 2)
           ========================================================= */}
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cards.map((c) => (
                        <Card key={c.key} className="rounded-none border border-gray-200">
                            <div className="p-8 relative">
                                {/* Quick start badge (only apartment) */}
                                {c.badge && (
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-4">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-600 text-white text-sm font-medium">
                                            {c.badge.text}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4">{c.icon}</div>

                                    <div className="text-xl font-semibold text-[#1a1a1a]">
                                        {c.title}
                                    </div>

                                    <p className="mt-3 text-sm text-[#1a1a1a] max-w-xs leading-relaxed">
                                        {c.description}
                                    </p>

                                    <Button
                                        className="mt-8 w-full rounded-sm"
                                        style={{ backgroundColor: ACTION_BLUE }}
                                        onClick={() => onSelect(c.key)}
                                    >
                                        {c.ctaText}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="h-24" />
            </main>
        </>
    );
}
