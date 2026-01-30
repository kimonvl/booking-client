import type { RootState } from "@/store/store";
import { createSelector } from "reselect";
import type { SearchPageState } from "./searchPage.types";
import { selectAmenitiesDictionaryNoGroups } from "@/store/dictionaries/dictionary.selector";

const selectSearchPageReducer = (state: RootState): SearchPageState => state.searchPage;

export const selectSearchPageFilters = createSelector(
    [selectSearchPageReducer],
    (searchPageSlice) => searchPageSlice.filters
);

export const selectSearchPagePage = createSelector(
    [selectSearchPageReducer],
    (searchPageSlice) => searchPageSlice.page
);

export const selectSearchPageIsLast = createSelector(
    [selectSearchPageReducer],
    (searchPageSlice) => searchPageSlice.last
);

export const selectSearchPageSize = createSelector(
    [selectSearchPageReducer],
    (searchPageSlice) => searchPageSlice.size
);

export const selectSearchPageTotalPages = createSelector(
    [selectSearchPageReducer],
    (searchPageSlice) => searchPageSlice.totalPages
);

export const selectSearchPageTotalElements = createSelector(
    [selectSearchPageReducer],
    (searchPageSlice) => searchPageSlice.totalElements
);

export const selectSearchPagePrice = createSelector(
    [selectSearchPageFilters],
    (filters) => filters.price
);

export const selectSearchPageBedrooms = createSelector(
    [selectSearchPageFilters],
    (filters) => filters.bedroomCount
);

export const selectSearchPageBathrooms = createSelector(
    [selectSearchPageFilters],
    (filters) => filters.bathroomCount
);

export const selectSearchPageCheckIn = createSelector(
    [selectSearchPageFilters],
    (filters) => filters.checkIn
);

export const selectSearchPageCheckout = createSelector(
    [selectSearchPageFilters],
    (filters) => filters.checkOut
);

export const selectSearchPageCity = createSelector(
    [selectSearchPageFilters],
    (filters) => filters.city
);

export const selectAmenityCheckboxOptions = createSelector(
  [selectAmenitiesDictionaryNoGroups, selectSearchPageFilters],
  (dict, filters) => {
    const selected = new Set(filters.amenities); // filters.amenities is string[]
    return dict.map((a) => ({
      key: a.code,
      label: a.label,
      selected: selected.has(a.code),
    }));
  }
);