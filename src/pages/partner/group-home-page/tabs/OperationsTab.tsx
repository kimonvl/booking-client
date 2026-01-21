import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectOperationsTable, selectSummaryTiles } from "@/store/partner/primary-account/group-home/groupHome.selector";
import { getOperationsTableStart, getSummaryTilesStart } from "@/store/partner/primary-account/group-home/groupHomeSlice";
import { Download, Eye, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export type Location = "greece" | "athens" | "petra";

export default function OperationsTab() {
    const dispatch = useAppDispatch();
    const operationsTable = useAppSelector(selectOperationsTable);
    const summaryTiles = useAppSelector(selectSummaryTiles);

    useEffect(() => {
        dispatch(getOperationsTableStart());
        dispatch(getSummaryTilesStart());
    }, [dispatch])

    const [statusFilter, setStatusFilter] = useState("all");

    // -----------------------------
    // Small helpers
    // -----------------------------
    const StatusPill = ({ tone, label }: { tone: "danger" | "ok"; label: string }) => (
        <span className="inline-flex items-center gap-2">
            <span
                className={[
                    "inline-block h-2.5 w-2.5 rounded-full",
                    tone === "danger" ? "bg-red-500" : "bg-emerald-500",
                ].join(" ")}
            />
            <span className={tone === "danger" ? "text-red-600" : "text-emerald-700"}>
                {label}
            </span>
        </span>
    );

    return (
        <div>
            {/* "Happening today" + summary tiles */}
            <div>
                <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Happening today</h2>

                <Card className="rounded-none">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-5">
                            {summaryTiles.map((t, idx) => (
                                <div
                                    key={t.label}
                                    className={[
                                        "p-8",
                                        idx !== 0 ? "md:border-l" : "",
                                        "flex flex-col gap-2",
                                    ].join(" ")}
                                >
                                    <div className="text-2xl font-semibold text-[#1a1a1a]">
                                        {t.value}
                                    </div>
                                    <button className="text-[#0071c2] hover:underline text-sm font-medium text-left w-fit">
                                        {t.label}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table header row: filter by status + actions */}
            <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="w-full lg:w-[260px]">
                    <div className="font-semibold mb-2 text-[#1a1a1a]">Filter by status</div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="All properties" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All properties</SelectItem>
                            <SelectItem value="closed">Closed / Not bookable</SelectItem>
                            <SelectItem value="open">Open / Bookable</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <button className="inline-flex items-center gap-2 hover:text-foreground">
                        <Download className="h-4 w-4" />
                        Download
                    </button>
                    <button className="inline-flex items-center gap-2 hover:text-foreground">
                        <SlidersHorizontal className="h-4 w-4" />
                        Customise data
                    </button>
                    <button className="inline-flex items-center gap-2 hover:text-foreground">
                        <Eye className="h-4 w-4" />
                        Customise view
                    </button>
                </div>
            </div>

            {/* Properties table (matches screenshot structure) */}
            <div className="mt-4 bg-white border">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">ID ↑</TableHead>
                                <TableHead className="min-w-[260px]">Property</TableHead>
                                <TableHead className="min-w-[220px]">Status on Booking.com</TableHead>
                                <TableHead className="min-w-[190px]">Arrivals in next 48 hours</TableHead>
                                <TableHead className="min-w-[210px]">Departures in next 48 hours</TableHead>
                                <TableHead className="min-w-[150px]">Guest messages</TableHead>
                                <TableHead className="min-w-[190px]">Booking.com messages</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {operationsTable.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className="align-top">{row.id}</TableCell>

                                    <TableCell className="align-top">
                                        <div className="font-medium text-[#1a1a1a]">{row.name}</div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            <span className="mr-2">{row.address.country}</span>
                                            {`${row.address.street} ${row.address.streetNumber} ${row.address.city}`}
                                        </div>
                                    </TableCell>

                                    <TableCell className="align-top">
                                        <StatusPill tone={"danger"} label={row.status} />
                                    </TableCell>

                                    <TableCell className="align-top tabular-nums">{row.arrivalsNext48}</TableCell>
                                    <TableCell className="align-top tabular-nums">{row.departuresNext48}</TableCell>
                                    <TableCell className="align-top tabular-nums">{row.guestMessages}</TableCell>

                                    <TableCell className="align-top">
                                        <div className="flex items-center gap-3">
                                            <span className="tabular-nums">{row.bookingMessages}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {0 === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                                        No properties match your filters.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
