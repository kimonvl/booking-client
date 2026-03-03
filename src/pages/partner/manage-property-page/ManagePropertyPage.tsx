import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  UserCircle2,
  Search,
  Home,
  CalendarDays,
  ListChecks,
  Building2,
  Inbox,
  Wallet,
  Info,
  ChevronDown,
  Eye,
  Mail,
  MessageSquare,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

/**
 * PartnerGoLivePage (Monolith)
 * - Single file layout matching the screenshot you provided (Booking.com extranet-style go-live page)
 * - Mock data only
 * - Uses shadcn/ui + TailwindCSS
 */

const NAV_BLUE = "bg-[#003580]";
const ACTION_BLUE = "bg-[#0071c2] hover:bg-[#005fa3]";

const ManagePropertyPage: React.FC = () => {
  const navigate = useNavigate();

  const mock = {
    propertyName: "kimon house",
    propertyId: "15512249",
    address: "Αλεξανδρείας 63 1, Athens, 172 35, Greece",
    hasKypBanner: true,
    notifications: { property: 4, finance: 1 },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* =========================================================
          TOP HEADER (blue bar)
         ========================================================= */}
      <header className={`${NAV_BLUE} text-white`}>
        <div className="mx-auto max-w-[1400px] px-6">
          {/* top row */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-5">
              <div className="text-2xl font-extrabold tracking-tight">
                Booking<span className="opacity-90">.com</span>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-semibold">{mock.propertyName}</span>
                <span className="inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-2 py-1 text-xs font-semibold">
                  {mock.propertyId}
                  <ChevronDown className="h-4 w-4 opacity-90" />
                </span>
                <button className="rounded p-1 hover:bg-white/10" aria-label="View">
                  <Eye className="h-4 w-4 opacity-90" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center">
                <div className="relative w-[420px]">
                  <Input
                    className="h-10 bg-white text-black placeholder:text-muted-foreground pr-10"
                    placeholder="Search pages and reservations"
                  />
                  <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <button className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/15">
                <span className="text-sm">🇺🇸</span>
              </button>

              <button className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/15">
                <HelpCircle className="h-5 w-5" />
              </button>

              <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/15">
                <UserCircle2 className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* nav row */}
          <nav className="flex items-center gap-8 pb-3">
            <NavItem icon={<Home className="h-5 w-5" />} label="Home" active />
            <NavItem icon={<CalendarDays className="h-5 w-5" />} label="Calendar & pricing" />
            <NavItem icon={<ListChecks className="h-5 w-5" />} label="Reservations" />
            <NavItem
              icon={<Building2 className="h-5 w-5" />}
              label="Property"
              badge={mock.notifications.property}
            />
            <NavItem icon={<Inbox className="h-5 w-5" />} label="Inbox" iconRight={<Mail className="h-4 w-4" />} />
            <NavItem icon={<Wallet className="h-5 w-5" />} label="Finance" badge={mock.notifications.finance} />
          </nav>
        </div>
      </header>

      {/* =========================================================
          PAGE BODY
         ========================================================= */}
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* KYP banner */}
        {mock.hasKypBanner && (
          <div className="mb-8 rounded border border-orange-300 bg-orange-50 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 rounded-full border border-orange-300 bg-white flex items-center justify-center">
                <Info className="h-4 w-4 text-orange-700" />
              </div>

              <div className="flex-1">
                <div className="font-semibold text-[#1a1a1a]">
                  We need more details for the Know Your Partner (KYP) form
                </div>
                <p className="mt-2 text-sm text-[#1a1a1a] leading-relaxed">
                  You&apos;ll need to provide further KYP information about your property to comply with various legal
                  and regulatory requirements. Use the link below to add the info. For more details, check out{" "}
                  <span className="text-[#0071c2] underline cursor-pointer">this article</span> in Partner Help.
                </p>

                <button
                  className="mt-3 text-sm font-semibold text-[#0071c2] hover:underline"
                  onClick={() => navigate("/partner/kyp")}
                >
                  Complete the information
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main grid: left big card + right small card */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT: property go-live card */}
          <Card className="rounded-none border">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* property image */}
                <div className="h-20 w-28 bg-muted border rounded-sm overflow-hidden flex items-center justify-center">
                  <div className="text-xs text-muted-foreground">photo</div>
                </div>

                <div className="flex-1">
                  <div className="text-2xl font-extrabold text-[#1a1a1a]">{mock.propertyName}</div>
                  <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                    <span>📍</span>
                    <span>{mock.address}</span>
                  </div>

                  <div className="mt-4 text-sm font-semibold text-[#1a1a1a]">Go live on Booking.com</div>

                  <p className="mt-2 text-sm text-[#1a1a1a] leading-relaxed max-w-2xl">
                    You&apos;re about to go live to the world! Just make sure your calendar and pricing are correct
                    since all of our bookings are <span className="font-semibold">instantly confirmed</span>.
                  </p>

                  <p className="mt-4 text-sm text-[#1a1a1a]">
                    When you&apos;re ready, just click the button below to go live!
                  </p>

                  <div className="mt-5">
                    <Button
                      className={`${ACTION_BLUE} rounded-none px-6`}
                      onClick={() => navigate("/partner/property/go-live")}
                    >
                      Make my property live
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: update calendar card */}
          <Card className="rounded-none border">
            <CardContent className="p-6">
              <div className="text-lg font-extrabold text-[#1a1a1a]">Update your calendar</div>
              <p className="mt-2 text-sm text-[#1a1a1a] leading-relaxed">
                Bookings you receive are instant. Avoid overbookings by updating your calendar.
              </p>

              <div className="mt-4">
                <Button className={`${ACTION_BLUE} w-full rounded-none`} onClick={() => navigate("/partner/calendar")}>
                  Update calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* =========================================================
          FOOTER (blue strip with links + actions)
         ========================================================= */}
      <footer className={`${NAV_BLUE} text-white mt-10`}>
        <div className="mx-auto max-w-[1400px] px-6 py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <button className="hover:underline">About Us</button>
              <button className="hover:underline">Privacy and cookie statements</button>
              <button className="hover:underline">FAQs</button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button
                className="rounded-none bg-[#0071c2] hover:bg-[#005fa3]"
                onClick={() => navigate("/partner/select-property-type")}
              >
                Add new property
              </Button>
              <Button
                variant="secondary"
                className="rounded-none bg-white/10 text-white hover:bg-white/15 border border-white/20"
                onClick={() => navigate("/partner/feedback")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Share your feedback
              </Button>
            </div>
          </div>

          <Separator className="my-6 bg-white/15" />

          <div className="text-xs text-white/80">
            © Copyright Booking.com {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

function NavItem({
  icon,
  label,
  active,
  badge,
  iconRight,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  iconRight?: React.ReactNode;
}) {
  return (
    <button
      className={[
        "relative flex flex-col items-center gap-1 py-2 text-white/90 hover:text-white",
        active ? "text-white" : "",
      ].join(" ")}
    >
      <div className="relative">
        {icon}
        {typeof badge === "number" && badge > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold">
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold">
        <span>{label}</span>
        {iconRight}
        {!active && label !== "Home" && <ChevronDown className="h-3 w-3 opacity-80" />}
      </div>
      {active && <div className="mt-1 h-[3px] w-10 bg-white" />}
    </button>
  );
}

export default ManagePropertyPage;