import type { RootState } from "@/store/store";
import { createSelector } from "reselect";
import type { AppartmentState } from "./apartment.types";


const selectApartmentReducer = (state: RootState): AppartmentState => state.apartment;

export const selectAddApartmentLoading = createSelector(
    [selectApartmentReducer],
    (apartmentSlice) => apartmentSlice.addApartmentLoading
);