import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export default function HelpCard({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
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
}