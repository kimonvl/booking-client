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
