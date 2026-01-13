import { Heart, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export interface Property {
  id: string;
  name: string;
  image: string;
  managedBy: string;
  locationLine: string;
  distanceLine: string;
  highlights: string[];
  roomTitle: string;
  roomMeta: string;
  ratingLabel: string;
  ratingScore: number;
  reviewsCount: number;
  locationScoreLabel: string;
  locationScore: number;
  nightsLabel: string;
  price: number;
  taxesLine: string;
  cta: string;
};

interface PropertyCardWideProps {
    property: Property;
    idx: number;
}

export default function PropertyCardWide({ property, idx }: PropertyCardWideProps) {
    return (
        <Card key={`${property.id}-${idx}`} className="border-blue-200 bg-blue-50/40">
            <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_200px] gap-4">
                    <div className="relative">
                        <div
                            className="h-48 md:h-full rounded-lg overflow-hidden bg-muted"
                            style={{
                                backgroundImage: `url(${property.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        <button
                            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow"
                            aria-label="Save"
                        >
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <a
                                href="#"
                                className="text-xl font-bold text-[#0071c2] hover:underline"
                            >
                                {property.name}
                            </a>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <Star className="h-4 w-4 text-yellow-500" />
                                <Star className="h-4 w-4 text-yellow-500" />
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground mt-1">
                            {property.managedBy}
                        </div>

                        <div className="mt-2 text-sm">
                            <span className="text-[#0071c2] hover:underline cursor-pointer">
                                {property.locationLine}
                            </span>
                            <span className="text-muted-foreground"> · {property.distanceLine}</span>
                        </div>

                        <div className="mt-2 space-y-1 text-sm">
                            {property.highlights.map((h) => (
                                <div key={h} className="text-muted-foreground">
                                    • {h}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 font-semibold">{property.roomTitle}</div>
                        <div className="text-sm text-muted-foreground mt-1">{property.roomMeta}</div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-blue-600 hover:bg-blue-600">Genius</Badge>
                            <Badge variant="secondary">Free cancellation</Badge>
                        </div>
                    </div>

                    <div className="flex md:flex-col justify-between gap-4">
                        <div className="flex items-start justify-between md:justify-end gap-3">
                            <div className="text-right">
                                <div className="font-semibold">{property.ratingLabel}</div>
                                <div className="text-xs text-muted-foreground">
                                    {property.reviewsCount} reviews
                                </div>
                                {property.locationScore > 0 && (
                                    <div className="text-sm text-[#0071c2] font-semibold mt-1">
                                        {property.locationScoreLabel} {property.locationScore}
                                    </div>
                                )}
                            </div>

                            <div className="h-10 w-10 rounded-md bg-[#003580] text-white flex items-center justify-center font-bold">
                                {property.ratingScore.toFixed(1)}
                            </div>
                        </div>

                        <div className="md:text-right">
                            <div className="text-sm text-muted-foreground">{property.nightsLabel}</div>
                            <div className="text-2xl font-bold mt-1">€ {property.price}</div>
                            <div className="text-xs text-muted-foreground mt-1">{property.taxesLine}</div>

                            <Button className="mt-3 w-full md:w-auto bg-[#0071c2] hover:bg-[#005fa3]">
                                {property.cta}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
