import type { RootState } from "@/store/store";
import { createSelector } from "reselect";
import type { AddApartmentErrors, AppartmentState } from "./apartment.types";
import type { StepsType } from "@/pages/partner/listing-property-page/add-apartment/AddAppartmentPage";


const selectApartmentReducer = (state: RootState): AppartmentState => state.apartment;

export const selectAddApartmentLoading = createSelector(
    [selectApartmentReducer],
    (apartmentSlice) => apartmentSlice.addApartmentLoading
);

export const selectAddApartmentErrors = createSelector(
    [selectApartmentReducer],
    (apartmentSlice) => apartmentSlice.addApartmentErrors
);

export const selectAddApartmentHasFieldErrors = createSelector(
    [selectApartmentReducer],
    (apartmentSlice) => apartmentSlice.hasFieldErrors
);

export const selectAddApartmentForm = createSelector(
    [selectApartmentReducer],
    (apartmentSlice) => apartmentSlice.apartmentForm
);

export const selectAddApartmentStepsWithError = createSelector(
  [selectAddApartmentErrors],
  (addApartmentErrors): StepsType[] => {
    if (!addApartmentErrors) return [];

    const stepSet = new Set<StepsType>();

    (Object.keys(addApartmentErrors) as (keyof AddApartmentErrors)[]).forEach((field) => {
      const msg = addApartmentErrors[field];

      // ignore empty/undefined errors
      if (!msg || (typeof msg === "string" && msg.trim() === "")) return;

      const step = FIELD_TO_STEP[field];
      if (step) stepSet.add(step);
    });

    return STEPS_ORDER.filter((s) => stepSet.has(s));
  }
);

const STEPS_ORDER: StepsType[] = [
  "name",
  "address",
  "details",
  "amenities",
  "services",
  "languages",
  "rules",
  "photos",
  "price",
  "review",
];

const FIELD_TO_STEP: Partial<Record<keyof AddApartmentErrors, StepsType>> = {
  propertyName: "name",

  address: "address",
  "address.country": "address",
  "address.city": "address",
  "address.postCode": "address",
  "address.street": "address",
  "address.streetNumber": "address",

  sleepingAreas: "details",
  guestCount: "details",
  bathroomCount: "details",
  allowChildren: "details",
  offerCots: "details",
  aptSize: "details",

  amenities: "amenities",

  serveBreakfast: "services",
  isParkingAvailable: "services",

  languages: "languages",

  smokingAllowed: "rules",
  partiesAllowed: "rules",
  petsAllowed: "rules",

  checkInFrom: "rules",
  checkInUntil: "rules",
  checkOutFrom: "rules",
  checkOutUntil: "rules",

  photosCount: "photos",
  pricePerNight: "price",

  _global: "review",
};