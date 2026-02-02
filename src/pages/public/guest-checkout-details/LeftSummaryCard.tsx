import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

export default function LeftSummaryCard() {
  return (
    <div className="space-y-4">
      {/* Property mini card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="h-24 w-32 rounded-md bg-gray-100 overflow-hidden shrink-0">
              <img
                src="https://picsum.photos/seed/checkout/320/240"
                className="h-full w-full object-cover"
                alt="property"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[#febb02]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#febb02] stroke-[#febb02]" />
                  ))}
                </div>
                <Badge className="bg-[#003b95] hover:bg-[#003b95]">Genius</Badge>
              </div>

              <div className="mt-1 font-bold text-lg text-[#1a1a1a]">Dinostratus House</div>
              <div className="text-sm text-gray-600">Deinostratou 32., Athens, Greece</div>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-[#003b95] text-white font-bold">
                  8.7
                </span>
                <span className="font-semibold">Excellent</span>
                <span className="text-gray-500">· 302 reviews</span>
              </div>

              <div className="mt-2 text-sm text-gray-700">
                <span className="font-semibold">Free WiFi</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking details */}
      <Card>
        <CardContent className="p-0">
          <div className="px-4 py-3 bg-blue-50 border-b text-sm font-semibold text-[#1a1a1a]">
            Your booking details
          </div>

          <div className="px-4 py-4 text-sm text-gray-800 space-y-3">
            <div>
              <div className="font-semibold">Check-in:</div>
              <div>Friday, February 6, 2026 from 2:00 PM</div>
            </div>

            <div>
              <div className="font-semibold">Check-out:</div>
              <div>Saturday, February 7, 2026 until 11:00 AM</div>
            </div>

            <div>
              <div className="font-semibold">Total length of stay:</div>
              <div>1 night</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price summary */}
      <Card>
        <CardContent className="p-0">
          <div className="px-4 py-3 bg-blue-50 border-b text-sm font-semibold text-[#1a1a1a]">
            Your price summary
          </div>

          <div className="px-4 py-4 text-sm text-gray-800 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-[#0071c2]">Today you&apos;ll pay</div>
                <div className="text-gray-600">€ 79 × 1 night</div>
              </div>
              <div className="font-semibold">€ 79</div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-[#0071c2]">At the property you&apos;ll pay</div>
                <div className="text-gray-600">Additional fees</div>
              </div>
              <div className="font-semibold">€ 3</div>
            </div>

            <Separator />

            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">Total price</div>
                <div className="text-gray-600">(for all guests)</div>
              </div>
              <div className="text-lg font-extrabold">€ 82</div>
            </div>

            <div className="text-xs text-gray-500">Includes taxes and fees</div>
          </div>
        </CardContent>
      </Card>

      {/* Booking conditions */}
      <Card>
        <CardContent className="p-0">
          <div className="px-4 py-3 bg-blue-50 border-b text-sm font-semibold text-[#1a1a1a]">
            Review your booking conditions
          </div>

          <div className="px-4 py-4 text-sm text-gray-800">
            <div className="font-semibold">Partner Offer</div>
            <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-700">
              <li>You&apos;ll pay securely with Booking.com today</li>
              <li>Changes to your personal or booking details won&apos;t be possible after your booking is complete</li>
              <li>The invoice will be issued by our partner company</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Location highlights */}
      <Card>
        <CardContent className="p-0">
          <div className="px-4 py-3 bg-blue-50 border-b text-sm font-semibold text-[#1a1a1a]">
            Location Highlights:
          </div>

          <div className="px-4 py-4 text-sm text-gray-800">
            <div className="font-semibold">Popular Landmarks Nearby</div>
            <div className="mt-2 text-gray-700">
              Syngrou/Fix Metro Station, Neos Kosmos Metro Station and Acropolis are just a short distance away
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}