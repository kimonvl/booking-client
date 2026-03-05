import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  CalendarDays,
  ListChecks,
  Building2,
  Inbox,
  Wallet,
  ChevronDown,
  Mail,
} from "lucide-react";
import InboxTab from "./InboxTab";

type ManageTab =
  | "home"
  | "calendar"
  | "reservations"
  | "property"
  | "inbox"
  | "finance";

export default function ManagePropertyPage() {
  const [tab, setTab] = React.useState<ManageTab>("home");
  const badges = { property: 4, finance: 1 };

  return (
    // Full viewport + vertical layout
    <div className="min-h-screen w-screen flex flex-col">
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as ManageTab)}
        // Tabs should fill the available height
        className="flex-1 flex flex-col"
      >
        {/* HEADER (blue) */}
        <div className="bg-[#003580] text-white">
          <div className="mx-auto max-w-[1400px] px-6">
            <TabsList className="h-auto w-fit inline-flex bg-transparent p-0 gap-8 border-0 rounded-none py-5">
              <TopIconTab value="home" label="Home" icon={<Home className="h-7 w-7" />} />

              <TopIconTab
                value="calendar"
                label="Calendar & pricing"
                icon={<CalendarDays className="h-7 w-7" />}
                showChevron
              />

              <TopIconTab
                value="reservations"
                label="Reservations"
                icon={<ListChecks className="h-7 w-7" />}
              />

              <TopIconTab
                value="property"
                label="Property"
                icon={<Building2 className="h-7 w-7" />}
                badge={badges.property}
                showChevron
              />

              <TopIconTab
                value="inbox"
                label="Inbox"
                icon={<Inbox className="h-7 w-7" />}
                rightIcon={<Mail className="h-5 w-5" />}
                showChevron
              />

              <TopIconTab
                value="finance"
                label="Finance"
                icon={<Wallet className="h-7 w-7" />}
                badge={badges.finance}
                showChevron
              />
            </TabsList>

            <div className="h-px bg-white/20" />
          </div>
        </div>

        {/* CONTENT AREA (fills remaining height + full width) */}
        <div className="flex-1 w-full bg-white text-black">
          {/* each TabsContent is made flex-1 so it can fill height */}
          <TabsContent value="home" className="m-0 h-full w-full flex-1">
            <div className="h-full w-full p-6">Home content</div>
          </TabsContent>

          <TabsContent value="calendar" className="m-0 h-full w-full flex-1">
            <div className="h-full w-full p-6">Calendar content</div>
          </TabsContent>

          <TabsContent value="reservations" className="m-0 h-full w-full flex-1">
            <div className="h-full w-full p-6">Reservations content</div>
          </TabsContent>

          <TabsContent value="property" className="m-0 h-full w-full flex-1">
            <div className="h-full w-full p-6">Property content</div>
          </TabsContent>

          <TabsContent value="inbox" className="m-0 h-full w-full flex-1">
            <InboxTab />          
          </TabsContent>

          <TabsContent value="finance" className="m-0 h-full w-full flex-1">
            <div className="h-full w-full p-6">Finance content</div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function TopIconTab({
  value,
  label,
  icon,
  badge,
  showChevron,
  rightIcon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  showChevron?: boolean;
  rightIcon?: React.ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className={[
        "flex-none",
        "relative h-auto rounded-none bg-transparent p-0 shadow-none",
        "text-white/90 hover:text-white data-[state=active]:text-white",
        "data-[state=active]:bg-transparent",
        "focus-visible:ring-0 focus-visible:ring-offset-0",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-2 pb-3">
        <div className="relative">
          {icon}
          {typeof badge === "number" && badge > 0 && (
            <span className="absolute -right-3 -top-3 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold leading-none">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold whitespace-nowrap">
          <span>{label}</span>
          {rightIcon}
          {showChevron && <ChevronDown className="h-4 w-4 opacity-90" />}
        </div>
      </div>

      {/* underline driven by state */}
      <span className="absolute bottom-0 left-1/2 h-[3px] w-10 -translate-x-1/2 bg-transparent data-[state=active]:bg-white" />
    </TabsTrigger>
  );
}