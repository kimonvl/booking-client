import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  MapPin,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CheckBoxFilter from "@/components/filters/CheckBoxFilter";
import CounterFilter from "@/components/filters/CounterFilter";
import PropertyCardWide from "@/components/property-cards/PropertyCardWide";
import SliderFilter from "@/components/filters/SliderFilter";
import type { SelectFilterOption } from "@/components/filters/SelectFilter";
import SelectFilter from "@/components/filters/SelectFilter";
import type { ToggleFilterOption } from "@/components/filters/ToggleFilter";
import ToggleFilter from "@/components/filters/ToggleFilter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSearchResult } from "@/store/guest/property/guestProperty.selector";
import { getAmenitiesDictionaryStart } from "@/store/dictionaries/dictionarySlice";
import { selectAmenitiesDictionaryNoGroups } from "@/store/dictionaries/dictionary.selector";
import { selectAmenityCheckboxOptions, selectSearchPageBathrooms, selectSearchPageBedrooms, selectSearchPagePrice } from "@/store/guest/pages/search-page/searchPage.selector";
import { setBasicFilters, setBathrooms, setBedrooms, setPrice, toggleAmenity } from "@/store/guest/pages/search-page/searchPageSlice";

export type ViewMode = "list" | "grid";
export type SortingMethod = "top" | "price_low" | "price_high" | "rating";

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const results = useAppSelector(selectSearchResult);
  const amenitiesDictionary = useAppSelector(selectAmenitiesDictionaryNoGroups);
  const amenityCheckBoxOptions = useAppSelector(selectAmenityCheckboxOptions);
  const price = useAppSelector(selectSearchPagePrice);
  const bedroomCount = useAppSelector(selectSearchPageBedrooms);
  const bathroomCount = useAppSelector(selectSearchPageBathrooms);

  const [params] = useSearchParams();
  const city = params.get("city");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests");
  const pets = params.get("pets");

  useEffect(() => {
    if (city != null && checkIn != null && checkOut != null && guests != null)
      dispatch(setBasicFilters({city, checkIn, checkOut, maxGuests: Number(guests), pets: pets === "true"}));
  }, [city, checkIn, checkOut, guests, pets]);

  useEffect(() => {
    if (!amenitiesDictionary || amenitiesDictionary.length === 0)
      dispatch(getAmenitiesDictionaryStart());
  }, [dispatch])

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const viewModeOptions: ToggleFilterOption[] = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
  ]

  const [sortBy, setSortBy] = useState<SortingMethod>("top");
  const sortingMethodOptions: SelectFilterOption<SortingMethod>[] = [
    { value: "top", label: "Our top picks" },
    { value: "price_low", label: "Price (lowest first)" },
    { value: "price_high", label: "Price (highest first)" },
    { value: "rating", label: "Guest rating" },
  ];

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
        <span className="text-blue-700 hover:underline cursor-pointer">{city}</span>{" "}
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
                  limits={price}
                  setLimits={(v) => dispatch(setPrice(v))}
                />

                <Separator className="my-4" />

                {/* Property Type */}
                <CheckBoxFilter
                  checkBoxTitle="Amenities"
                  checkBoxOptions={amenityCheckBoxOptions}
                  setCheckBoxOptions={(_v, name) => {
                    dispatch(toggleAmenity(name))
                  }}
                />

                <Separator className="my-4" />

                {/* Bedrooms and bathrooms */}
                <div>
                  <div className="font-semibold">Bedrooms and bathrooms</div>

                  <div className="mt-3 space-y-4">
                    <CounterFilter
                      label="Bedrooms"
                      count={bedroomCount}
                      setCount={(next) => dispatch(setBedrooms(next))}
                    />

                    <CounterFilter
                      label="Bathrooms"
                      count={bathroomCount}
                      setCount={(next) => dispatch(setBathrooms(next))}
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
                {city}: {results.length} properties found
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
              setValue={(v) => setViewMode(v as ViewMode)}
            />
          </div>

          {/* List of property cards */}
          <div className="mt-5 space-y-5">
            {results.map((p) => (
              <PropertyCardWide property={p} />
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
              {/* <CheckBoxFilter
                checkBoxTitle="Popular filters"
                checkBoxOptions={popularFilters}
                setCheckBoxOptions={setPopularFilters}
              /> */}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
