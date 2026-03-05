import type { RootState } from "@/store/store";
import { createSelector } from "reselect";
import type { StepsType } from "@/pages/partner/listing-property-page/add-apartment/AddAppartmentPage";
import type { CreatePropertyErrors, CreatePropertyState } from "./createProperty.types";


const selectCreatePropertyReducer = (state: RootState): CreatePropertyState => state.createProperty;

export const selectCreatePropertyLoading = createSelector(
    [selectCreatePropertyReducer],
    (createPropertySlice) => createPropertySlice.createPropertyLoading
);

export const selectCreatePropertyErrors = createSelector(
    [selectCreatePropertyReducer],
    (createPropertySlice) => createPropertySlice.createPropertyErrors
);

export const selectCreatePropertyHasFieldErrors = createSelector(
    [selectCreatePropertyReducer],
    (createPropertySlice) => createPropertySlice.hasFieldErrors
);

export const selectCreatePropertyForm = createSelector(
    [selectCreatePropertyReducer],
    (createPropertySlice) => createPropertySlice.createPropertyForm
);

export const selectCreatePropertyStepsWithError = createSelector(
  [selectCreatePropertyErrors],
  (createPropertyErrors): StepsType[] => {
    if (!createPropertyErrors) return [];

    const stepSet = new Set<StepsType>();

    (Object.keys(createPropertyErrors) as (keyof CreatePropertyErrors)[]).forEach((field) => {
      const msg = createPropertyErrors[field];

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

const FIELD_TO_STEP: Partial<Record<keyof CreatePropertyErrors, StepsType>> = {
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