import type { RootState } from "@/store/store";
import { createSelector } from "reselect";
import type { GuestPropertyState } from "./guestProperty.types";
import { selectAmenitiesDictionary } from "@/store/dictionaries/dictionary.selector";


const selectGuestPropertyReducer = (state: RootState): GuestPropertyState => state.guestProperty;

export const selectSearchResult = createSelector(
    [selectGuestPropertyReducer],
    (guestPropertySlice) => guestPropertySlice.searchResults
);

export const selectSelectedProperty = createSelector(
    [selectGuestPropertyReducer],
    (guestPropertySlice) => guestPropertySlice.selectedProperty
);

export const selectGuestPropertyLoading = createSelector(
    [selectGuestPropertyReducer],
    (guestPropertySlice) => guestPropertySlice.loading
);

export const selectSelectedPropertyAmenitiesGroupedWithAvailability = createSelector(
  [selectAmenitiesDictionary, selectSelectedProperty],
  (dictionary, property) => {
    const codes = new Set(property?.propertyAmenities.map(a => a.code) ?? []);

    return dictionary.map(group => ({
      code: group.code,
      title: group.title,
      items: group.items.map(a => ({
        ...a,
        available: codes.has(a.code),
      })),
    }));
  }
);