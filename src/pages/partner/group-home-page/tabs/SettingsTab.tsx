import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, SlidersHorizontal } from "lucide-react";

export default function SettingsTab() {
    return (
        <>
            <Card className="rounded-none">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-md border flex items-center justify-center text-muted-foreground">
                            📈
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-[#1a1a1a]">
                                Strengthen your offering by understanding guest demand
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 max-w-5xl">
                                We know what guests are looking for (and when) and we can help you deliver it!
                                With insights into guest demand, you can tailor your property settings and calendar
                                to take advantage of trends for your area.
                            </p>
                            <button className="mt-4 text-sm text-[#0071c2] hover:underline font-medium">
                                Go to insights
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-6 flex items-center justify-end gap-6 text-sm text-muted-foreground">
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

            <div className="mt-3 bg-white border">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID ↑</TableHead>
                                <TableHead className="min-w-[260px]">Property</TableHead>
                                <TableHead className="min-w-[140px]">Genius</TableHead>
                                <TableHead className="min-w-[140px]">Preferred</TableHead>
                                <TableHead className="min-w-[150px]">Minimum stay</TableHead>
                                <TableHead className="min-w-[140px]">Country rates</TableHead>
                                <TableHead className="min-w-[140px]">Mobile rates</TableHead>
                                <TableHead className="min-w-[220px]">Property page score</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {["kimon house petra", "kimon house athens"].map((r: string, idx) => (
                                <TableRow key={`settings-${idx}`}>
                                    <TableCell>{idx}</TableCell>

                                    <TableCell>
                                        <div className="font-medium">{r}</div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            <span className="mr-2">🇬🇷</span>
                                            {"r.address"}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Badge className="bg-blue-600 hover:bg-blue-600">Genius</Badge>
                                        <div className="text-sm text-muted-foreground mt-2">Not eligible</div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm text-muted-foreground">Not eligible</div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm text-[#0071c2] hover:underline cursor-pointer">
                                            7 nights
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm text-[#0071c2] hover:underline cursor-pointer">
                                            Add now
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm text-[#0071c2] hover:underline cursor-pointer">
                                            Add now
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="w-full max-w-[160px] h-2 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-400"
                                                    style={{ width: true ? "47%" : "53%" }}
                                                />
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {true ? "47%" : "53%"}
                                            </div>
                                        </div>
                                        <div className="text-sm text-[#0071c2] hover:underline cursor-pointer mt-2">
                                            Improve
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}
