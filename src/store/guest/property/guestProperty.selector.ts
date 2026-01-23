import type { RootState } from "@/store/store";
import { createSelector } from "reselect";
import type { GuestPropertyState } from "./guestProperty.types";


const selectGuestPropertyReducer = (state: RootState): GuestPropertyState => state.guestProperty;

export const selectSearchResult = createSelector(
    [selectGuestPropertyReducer],
    (guestPropertySlice) => guestPropertySlice.searchResults
);

export const selectGuestPropertyLoading = createSelector(
    [selectGuestPropertyReducer],
    (guestPropertySlice) => guestPropertySlice.loading
);