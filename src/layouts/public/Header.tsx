import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import TabsComponent, { type TabTriggerProps } from "@/components/tabs/TabsComponent";
import SearchBarComponent from "@/components/searchBars/SearchBarComponent";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectIsAuthenticated } from "@/store/auth/auth.selector";
import { UserMenu } from "./UserMenu";

type HeaderTabNames = "stays" | "flights";

const headerTabTriggers: TabTriggerProps<HeaderTabNames>[] = [
  {
    value: "stays",
    style: "rounded-full data-[state=active]:bg-white/15 data-[state=active]:text-white text-white/90",
    name: "Διαμονή",
  },
  {
    value: "flights",
    style: "rounded-full data-[state=active]:bg-white/15 data-[state=active]:text-white text-white/90",
    name: "Πτήσεις",
  },
];

function UserChip({ email }: { email: string }) {
  const initial = email?.[0]?.toUpperCase() ?? "U";

  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-full px-3 py-2 hover:bg-white/10"
    >
      <div className="h-10 w-10 rounded-full border-2 border-[#febb02] flex items-center justify-center">
        <div className="h-9 w-9 rounded-full bg-[#1f5aa6] flex items-center justify-center text-white font-bold">
          {initial}
        </div>
      </div>

      <div className="text-left leading-tight">
        <div className="text-sm font-semibold text-white">{email}</div>
        <div className="text-xs text-[#febb02] font-semibold">Genius Level 1</div>
      </div>
    </button>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.startsWith("/flights") ? "flights" : "stays";

  const isAuth = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  const onTabValueChange = (val: string) => {
    if (val === "flights") navigate("/flights");
    if (val === "stays") navigate("/");
  };

  return (
    <header className="bg-[#003580] text-white">
      {/* Top row */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button className="text-xl font-bold" onClick={() => navigate("/")} type="button">
          Booking.com
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm">EUR</span>

          {isAuth && user ? (
            <UserMenu email={user.email} />
          ) : (
            <>
              <Button
                onClick={() => navigate("/auth/guest/register")}
                variant="outline"
                className="bg-white text-[#003580] hover:bg-gray-100"
              >
                Εγγραφή
              </Button>
              <Button
                onClick={() => navigate("/auth/guest/login")}
                className="bg-white text-[#003580] hover:bg-gray-100"
              >
                Σύνδεση
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs row */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <TabsComponent<HeaderTabNames>
          tabListStyle="bg-transparent p-0 gap-2 flex flex-wrap"
          tabTriggers={headerTabTriggers}
          onValueChange={onTabValueChange}
          activeTab={activeTab}
        />
      </div>

      {/* Persistent Search Bar */}
      <SearchBarComponent />
    </header>
  );
}
