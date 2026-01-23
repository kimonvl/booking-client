import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  MapPin,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { CheckBoxOption } from "@/components/filters/CheckBoxFilter";
import CheckBoxFilter from "@/components/filters/CheckBoxFilter";
import CounterFilter from "@/components/filters/CounterFilter";
import PropertyCardWide from "@/components/property-cards/PropertyCardWide";
import SliderFilter from "@/components/filters/SliderFilter";
import type { SelectFilterOption } from "@/components/filters/SelectFilter";
import SelectFilter from "@/components/filters/SelectFilter";
import type { ToggleFilterOption } from "@/components/filters/ToggleFilter";
import ToggleFilter from "@/components/filters/ToggleFilter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPropertiesByCityStart } from "@/store/guest/property/guestPropertySlice";
import { selectSearchResult } from "@/store/guest/property/guestProperty.selector";

export type ViewMode = "list" | "grid";
export type SortingMethod = "top" | "price_low" | "price_high" | "rating";

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const results = useAppSelector(selectSearchResult);
  const [params] = useSearchParams();
  const destination = params.get("city");


  useEffect(() => {
    if (destination != null)
      dispatch(getPropertiesByCityStart(destination));
  }, [destination])

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const viewModeOptions: ToggleFilterOption[] = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
  ]

  const [budget, setBudget] = useState<[number, number]>([45, 200]);

  const [sortBy, setSortBy] = useState<SortingMethod>("top");
  const sortingMethodOptions: SelectFilterOption<SortingMethod>[] = [
    { value: "top", label: "Our top picks" },
    { value: "price_low", label: "Price (lowest first)" },
    { value: "price_high", label: "Price (highest first)" },
    { value: "rating", label: "Guest rating" },
  ]

  const [popularFilters, setPopularFilters] = useState<CheckBoxOption[]>([
    { key: "hotels", label: "Hotels", count: 12, selected: false },
    { key: "breakfast_included", label: "Breakfast included", count: 12, selected: false },
    { key: "air_conditioning", label: "Air conditioning", count: 13, selected: false },
    { key: "double_bed", label: "Double bed", count: 1, selected: false },
    { key: "free_wiFi", label: "Free WiFi", count: 1, selected: false },
    { key: "beachfront", label: "Beachfront", count: 1, selected: false },
  ]);
  const [reviewScore1, setReviewScore1] = useState<CheckBoxOption[]>([
    { key: "wonderful", label: "Wonderful: 9+", count: 12, selected: false },
    { key: "very_good", label: "Very Good: 8+", count: 12, selected: false },
    { key: "good", label: "Good: 7+", count: 13, selected: false },
    { key: "pleasant", label: "Pleasant: 6+", count: 1, selected: false },
  ]);
  const [beachAccess, setBeachAccess] = useState<CheckBoxOption[]>([
    { key: "beach_access", label: "Beach Access", count: 12, selected: false },
  ]);
  const [propertyType, setPropertyType] = useState<CheckBoxOption[]>([
    { key: "entire_homes&apartments", label: "Entire homes & apartments", count: 12, selected: false },
    { key: "vacation_homes", label: "Vacation Homes", count: 12, selected: false },
    { key: "guesthouses", label: "Guesthouses", count: 13, selected: false },
    { key: "hotels", label: "Hotels", count: 1, selected: false },
  ]);


  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  // Desktop-only sticky mini filterbar
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const filtersWrapRef = useRef<HTMLDivElement | null>(null);
  const [showStickyPopular, setShowStickyPopular] = useState(false);
  const [stickyPos, setStickyPos] = useState<{ left: number; width: number } | null>(
    null
  );

  // One unified scroll/resize handler (desktop only)
  useEffect(() => {
    const handler = () => {
      if (!isDesktop) {
        setShowStickyPopular(false);
        setStickyPos(null);
        return;
      }

      const el = filtersWrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const shouldShow = rect.bottom <= 0; // full filters scrolled above viewport

      setShowStickyPopular(shouldShow);

      if (shouldShow) {
        setStickyPos({
          left: rect.left,
          width: rect.width || 320,
        });
      } else {
        setStickyPos(null);
      }
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [isDesktop]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground">
        <Link to="/" className="hover:underline text-blue-700">
          Home
        </Link>{" "}
        <span className="mx-1">{">"}</span>
        <span className="text-blue-700 hover:underline cursor-pointer">Greece</span>{" "}
        <span className="mx-1">{">"}</span>
        <span className="text-blue-700 hover:underline cursor-pointer">Lesvos</span>{" "}
        <span className="mx-1">{">"}</span>
        <span className="text-blue-700 hover:underline cursor-pointer">{destination}</span>{" "}
        <span className="mx-1">{">"}</span>
        <span>Search results</span>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="h-fit">
          {/* Map preview */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-44 bg-emerald-50">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-50" />
                <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
                  Google
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="bg-[#0071c2] hover:bg-[#005fa3]">
                    <MapPin className="h-4 w-4 mr-2" />
                    Show on map
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <div ref={filtersWrapRef} className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="font-semibold">Filter by:</div>

                <Separator className="my-4" />

                {/* Budget */}
                <SliderFilter
                  label="Budget"
                  limits={budget}
                  setLimits={setBudget}
                />

                <Separator className="my-4" />

                {/* Popular filters */}
                <CheckBoxFilter
                  checkBoxTitle="Popular Filters"
                  checkBoxOptions={popularFilters}
                  setCheckBoxOptions={setPopularFilters}
                />

                <Separator className="my-4" />

                {/* Review score */}
                <CheckBoxFilter
                  checkBoxTitle="Review Score"
                  checkBoxOptions={reviewScore1}
                  setCheckBoxOptions={setReviewScore1}
                />

                <Separator className="my-4" />

                {/* Beach Access */}
                <CheckBoxFilter
                  checkBoxTitle="Beach Access"
                  checkBoxOptions={beachAccess}
                  setCheckBoxOptions={setBeachAccess}
                />

                <Separator className="my-4" />

                {/* Property Type */}
                <CheckBoxFilter
                  checkBoxTitle="Property Type"
                  checkBoxOptions={propertyType}
                  setCheckBoxOptions={setPropertyType}
                />

                <Separator className="my-4" />

                {/* Bedrooms and bathrooms */}
                <div>
                  <div className="font-semibold">Bedrooms and bathrooms</div>

                  <div className="mt-3 space-y-4">
                    <CounterFilter
                      label="Bedrooms"
                      count={bedrooms}
                      setCount={setBedrooms}
                    />

                    <CounterFilter
                      label="Bathrooms"
                      count={bathrooms}
                      setCount={setBathrooms}
                    />
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <section>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {destination}: {results.length} properties found
              </h1>

              {/* Select for sorting method */}
              <div className="mt-3 flex items-center gap-3">
                <div className="w-[240px]">
                  <SelectFilter<SortingMethod>
                    options={sortingMethodOptions}
                    value={sortBy}
                    setValue={setSortBy}
                    placeholder="Sort by"
                  />
                </div>
              </div>
            </div>

            {/* Togle for display options */}
            <ToggleFilter
              options={viewModeOptions}
              value={viewMode}
              setValue={setViewMode}
            />
          </div>

          {/* List of property cards */}
          <div className="mt-5 space-y-5">
            {results.map((p) => (
              <PropertyCardWide property={p}/>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky mini filterbar: only on desktop, top-left next to cards */}
      {isDesktop && showStickyPopular && stickyPos && (
        <div
          className="fixed z-50"
          style={{
            top: 16,
            left: stickyPos.left,
            width: stickyPos.width,
          }}
        >
          <Card className="shadow-md">
            <CardContent className="p-4">
              <CheckBoxFilter
                checkBoxTitle="Popular filters"
                checkBoxOptions={popularFilters}
                setCheckBoxOptions={setPopularFilters}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
