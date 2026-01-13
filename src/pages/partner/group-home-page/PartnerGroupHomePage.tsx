import React, { useState } from "react";
import {
    Search,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SelectFilter, { type SelectFilterOption } from "@/components/filters/SelectFilter";
import TabsComponent from "@/components/tabs/TabsComponent";
import OperationsTab from "./tabs/OperationsTab";
import PerformanceTab from "./tabs/PerformanceTab";
import SettingsTab from "./tabs/SettingsTab";
import { useNavigate } from "react-router-dom";

/**
 * PartnerDashboardPage (Monolith)
 * - Single file layout matching Booking Extranet "Group homepage"
 * - Mock data, no auth, no API
 * - Keep comments so you can split later
 */

export type HomePageTabNames = "operations" | "performance" | "settings" | "recent";

//const ACTION_BLUE = "#0071c2";

export type Location = "greece" | "athens" | "petra";

const PartnerDashboardPage: React.FC = () => {
    const navigate = useNavigate();
    // -----------------------------
    // State (mock - replace later)
    // -----------------------------

    const [pageTabs, setPageTabs] = useState<HomePageTabNames>("operations");

    const [locationFilter, setLocationFilter] = useState<Location>("greece");
    const [propertySearch, setPropertySearch] = useState("");

    const locationFilterOptions: SelectFilterOption<Location>[] = [
        { value: "greece", label: "2 properties in Greece" },
        { value: "athens", label: "Athens (1 property)" },
        { value: "petra", label: "Petra (1 property)" },
    ];

    return (
        <>
            {/* =========================================================
          MAIN CONTENT WRAPPER
         ========================================================= */}
            <main className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Page title + Add new property */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold text-[#1a1a1a]">Group homepage</h1>
                    </div>

                    <Button onClick={() => navigate("select-property-type")} className="bg-[#0a66c2] hover:bg-[#095aa9]">
                        Add new property
                    </Button>
                </div>

                {/* Filter by location row (dropdown + search input) */}
                <div className="mt-6">
                    <div className="font-semibold mb-2 text-[#1a1a1a]">Filter by location</div>

                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <div className="w-full md:w-[240px]">
                            <SelectFilter<Location>
                                options={locationFilterOptions}
                                value={locationFilter}
                                setValue={setLocationFilter}
                                placeholder="Select location"
                            />
                        </div>

                        <div className="relative w-full md:w-[360px]">
                            <Input
                                value={propertySearch}
                                onChange={(e) => setPropertySearch(e.target.value)}
                                placeholder="Filter by property ID, name"
                                className="pr-10"
                            />
                            <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* =========================================================
                SUB-TABS (Operations/Performance/Settings/Recently added)
                - Operations contains: Happening today + Filter by status header + table (your existing content)
                - Other tabs: UI scaffolding based on screenshots
                ========================================================= */}
                <div className="mt-6">
                    <TabsComponent<HomePageTabNames>
                        tabListStyle="bg-transparent p-0 gap-6 border-b rounded-none"
                        tabTriggers={[
                            { value: "operations", style: "px-0 pb-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2]", name: "Operations" },
                            { value: "performance", style: "px-0 pb-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2]", name: "Performance" },
                            { value: "settings", style: "px-0 pb-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2]", name: "Settings" },
                            { value: "recent", style: "px-0 pb-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2]", name: "Recently added properties" },
                        ]}
                        tabContents={[
                            { value: "operations", style: "mt-6", element: <OperationsTab /> },
                            { value: "performance", style: "mt-6", element: <PerformanceTab /> },
                            { value: "settings", style: "mt-6", element: <SettingsTab /> },

                        ]}
                        onValueChange={(v) => setPageTabs(v as HomePageTabNames)}
                        activeTab={pageTabs}
                    />
                </div>

                {/* Feedback card */}
                <div className="mt-6">
                    <Card className="rounded-none border border-blue-500 bg-blue-50">
                        <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="text-sm text-[#1a1a1a]">
                                Your feedback is important to us. Was this data helpful?
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="h-10 w-10 rounded-full border bg-white hover:bg-muted flex items-center justify-center">
                                    <ThumbsUp className="h-5 w-5" />
                                </button>
                                <button className="h-10 w-10 rounded-full border bg-white hover:bg-muted flex items-center justify-center">
                                    <ThumbsDown className="h-5 w-5" />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* =========================================================
            FOOTER (blue bar like screenshot)
           ========================================================= */}
                <div className="mt-10" />
            </main>
        </>
    );
};

export default PartnerDashboardPage;
