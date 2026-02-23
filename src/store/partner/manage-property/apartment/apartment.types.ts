import type { AddressType, IsParkingAvailableType, PetsAllowedType, PhotoItem, SleepingAreasType, TimeType } from "@/types/request/apartment/addApartmentRequest.types";

export interface AddApartmentErrors {
  propertyName?: string;

  address?: string;
  "address.country"?: string;
  "address.city"?: string;
  "address.postCode"?: string;
  "address.street"?: string;
  "address.streetNumber"?: string;
  "address.floorNumber"?: string;
  sleepingAreas?: string;

  guestCount?: string;
  bathroomCount?: string;

  allowChildren?: string;
  offerCots?: string;

  aptSize?: string;

  amenities?: string;
  serveBreakfast?: string;

  isParkingAvailable?: string;

  languages?: string;

  smokingAllowed?: string;
  partiesAllowed?: string;
  petsAllowed?: string;

  checkInFrom?: string;
  checkInUntil?: string;
  checkOutFrom?: string;
  checkOutUntil?: string;

  photosCount?: string;
  pricePerNight?: string;

  // optional: for non-field / global errors
  _global?: string;
}

export interface AddApartmentForm {
  propertyName: string;
  address: AddressType;
  sleepingAreas: SleepingAreasType;
  guestCount: number;
  bathroomCount: number;
  allowChildren: boolean;
  offerCots: boolean;
  aptSize: string;
  amenities: Record<string, boolean> | null;
  serveBreakfast: boolean;
  isParkingAvailable: IsParkingAvailableType;
  languages: Record<string, boolean> | null;
  additionalLanguages: Record<string, boolean> | null;
  smokingAllowed: boolean;
  partiesAllowed: boolean;
  petsAllowed: PetsAllowedType;
  checkInFrom: TimeType;
  checkInUntil: TimeType;
  checkOutFrom: TimeType;
  checkOutUntil: TimeType;
  photos: PhotoItem [];
  mainPhotoId: string | null;
  pricePerNight: number;
}

export interface AppartmentState {
    apartmentForm: AddApartmentForm;
    addApartmentLoading: boolean;
    addApartmentErrors: AddApartmentErrors | null;
    hasFieldErrors: boolean;
    error: string | null;
}