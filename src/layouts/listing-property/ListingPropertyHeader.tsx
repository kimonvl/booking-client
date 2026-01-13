import { HelpCircle, User2 } from "lucide-react";

const BRAND_BLUE = "#003580";

export default function ListingPropertyHeader() {
  return (
    <header style={{ backgroundColor: BRAND_BLUE }} className="text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            <div className="text-2xl font-bold">Booking.com</div>

            <div className="flex items-center gap-4">
              <span className="text-lg">🇬🇧</span>

              <button className="inline-flex items-center gap-2 text-sm opacity-95 hover:opacity-100">
                <span>Help</span>
                <HelpCircle className="h-4 w-4" />
              </button>

              <button className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/15">
                <User2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
  )
}
