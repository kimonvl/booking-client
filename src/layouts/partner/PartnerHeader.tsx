import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, Search, User } from "lucide-react";
import { useState } from "react";

const BRAND_BLUE = "#003580";

export default function PartnerHeader() {
    const [topNav, setTopNav] = useState<
        | "group"
        | "reservations"
        | "strategic"
        | "reviews"
        | "finance"
        | "bulk"
        | "opportunity"
        | "insights"
    >("group");

    return (
        <header style={{ backgroundColor: BRAND_BLUE }} className="text-white">
            <div className="max-w-[1400px] mx-auto px-6">
                {/* Top row */}
                <div className="h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold">Booking.com</div>
                        <span className="opacity-70">|</span>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">ΚΙΜΩΝ ΒΛΟΥΤΗΣ</span>
                            <Badge className="bg-green-600 hover:bg-green-600">Primary account</Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <Input
                                placeholder="Search pages and reservations"
                                className="w-[360px] bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-0"
                            />
                            <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-white/80" />
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-lg">🇬🇧</span>
                            <Bell className="h-5 w-5 text-white/90" />
                            <User className="h-6 w-6 text-white/90" />
                            <span className="h-2 w-2 rounded-full bg-red-500 -ml-2 -mt-3" />
                        </div>
                    </div>
                </div>

                {/* Sub nav row (tabs like screenshot) */}
                <div className="pb-0">
                    <div className="flex items-center gap-2 overflow-x-auto">
                        {/* NOTE: using buttons to mimic Booking extranet tabs */}
                        {[
                            { key: "group", label: "Group homepage" },
                            { key: "reservations", label: "Reservations" },
                            { key: "strategic", label: "Strategic earning" },
                            { key: "reviews", label: "Reviews" },
                            { key: "finance", label: "Finance" },
                            { key: "bulk", label: "Bulk editing" },
                            { key: "opportunity", label: "Group Opportunity Centre" },
                            { key: "insights", label: "Market insights" },
                        ].map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setTopNav(t.key as any)}
                                className={[
                                    "px-4 py-3 text-sm whitespace-nowrap",
                                    "border-b-2",
                                    topNav === (t.key as any)
                                        ? "border-white bg-white/10"
                                        : "border-transparent hover:bg-white/10",
                                ].join(" ")}
                            >
                                <span className="inline-flex items-center gap-2">
                                    {t.label}
                                    {t.key === "finance" && (
                                        <Badge className="bg-green-600 hover:bg-green-600">New</Badge>
                                    )}
                                    {t.key === "finance" && <ChevronDown className="h-4 w-4 opacity-80" />}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}
