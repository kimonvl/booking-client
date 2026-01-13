import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, SlidersHorizontal } from "lucide-react";

export default function PerformanceTab() {
    return (
        <>
            <h2 className="text-2xl font-semibold text-[#1a1a1a]">
                Your overall performance this week
            </h2>

            {/* KPI Card */}
            <Card className="mt-4 rounded-none">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        {[
                            { label: "Booked avg. daily rate", value: "€ 0" },
                            { label: "Stayed avg. daily rate", value: "€ 0" },
                            { label: "Cancellation rate", value: "0%" },
                            { label: "Stayed room nights", value: "0" },
                            { label: "Stayed earnings", value: "€ 0" },
                            { label: "Avg. booking window", value: "0" },
                            { label: "Avg. length of stay", value: "0" },
                            { label: "Open / Bookable", value: "0/2", sub: "properties in this group" },
                        ].map((kpi, idx) => (
                            <div
                                key={kpi.label}
                                className={[
                                    "p-6",
                                    idx % 4 !== 0 ? "md:border-l" : "",
                                    idx >= 4 ? "md:border-t" : "",
                                ].join(" ")}
                            >
                                <div className="text-xs text-muted-foreground">{kpi.label}</div>
                                <div className="text-xl font-semibold text-[#1a1a1a] mt-1">
                                    {kpi.value}
                                </div>
                                {kpi.sub && (
                                    <div className="text-xs text-muted-foreground mt-1">{kpi.sub}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Separator />

                    {/* Opportunities line */}
                    <div className="px-6 py-4 text-sm text-[#1a1a1a] flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-50 text-green-700">
                            ✳
                        </span>
                        <span>
                            We've identified a number of opportunities for you to boost business in the coming week.{" "}
                            <button className="text-[#0071c2] hover:underline font-medium">
                                Get started.
                            </button>
                        </span>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 text-sm text-muted-foreground">
                Below you can find a breakdown of your properties' performance.
            </div>

            {/* Controls row */}
            <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                    <div>
                        <div className="text-sm text-[#1a1a1a] mb-2">Filter by period</div>
                        <Select defaultValue="mtd">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Month-to-date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mtd">Month-to-date</SelectItem>
                                <SelectItem value="last_30">Last 30 days</SelectItem>
                                <SelectItem value="ytd">Year-to-date</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <div className="text-sm text-[#1a1a1a] mb-2">Compare with</div>
                        <Select defaultValue="none">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="No comparison" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">No comparison</SelectItem>
                                <SelectItem value="prev_period">Previous period</SelectItem>
                                <SelectItem value="prev_year">Same period last year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className="bg-[#0071c2] hover:bg-[#005fa3] h-10">
                        Show data
                    </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <button className="inline-flex items-center gap-2 hover:text-foreground">
                        <Download className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center gap-2 hover:text-foreground">
                        <SlidersHorizontal className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center gap-2 hover:text-foreground">
                        <Eye className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Performance table */}
            <div className="mt-4 bg-white border">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID ↑</TableHead>
                                <TableHead className="min-w-[240px]">Property</TableHead>
                                <TableHead className="min-w-[160px]">Booked avg. daily rate</TableHead>
                                <TableHead className="min-w-[160px]">Stayed avg. daily rate</TableHead>
                                <TableHead className="min-w-[140px]">Cancellation rate</TableHead>
                                <TableHead className="min-w-[150px]">Stayed room nights</TableHead>
                                <TableHead className="min-w-[150px]">Stayed earnings</TableHead>
                                <TableHead className="min-w-[160px]">Review score</TableHead>
                                <TableHead className="min-w-[160px]">Hotel reservations</TableHead>
                                <TableHead className="min-w-[190px]">
                                    Click-through rate (30 days only)
                                </TableHead>
                                <TableHead className="min-w-[190px]">
                                    Conversion (30 days only)
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {["kimon house petra", "kimon house athens"].map((r: string, idx) => (
                                <TableRow key={`perf-${idx}`}>
                                    <TableCell>{idx}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{r}</div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            <span className="mr-2">🇬🇷</span>
                                            {"address"}
                                        </div>
                                    </TableCell>
                                    <TableCell>€ 0</TableCell>
                                    <TableCell>€ 0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>€ 0</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        There are no reviews for this time period
                                    </TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>0%</TableCell>
                                    <TableCell>0%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}
