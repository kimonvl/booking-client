import type { BookingStatusResponse } from "@/types/response/booking/bookingStatus.types";

export interface CreateBookingErrors {
  propertyId?: string;

  checkIn?: string;
  checkOut?: string;

  guestCount?: string;

  checkOutDetails?: string; // for whole-object errors, if you ever return one

  "checkOutDetails.travelingForWork"?: string; // usually not validated, but included for completeness
  "checkOutDetails.title"?: string;
  "checkOutDetails.firstName"?: string;
  "checkOutDetails.lastName"?: string;
  "checkOutDetails.email"?: string;
  "checkOutDetails.phoneCountryCode"?: string;
  "checkOutDetails.phoneNumber"?: string;
  "checkOutDetails.specialRequest"?: string;

  // optional: for non-field / global errors
  _global?: string;
};

export type BookingState = {
  polling: boolean;
  status: "idle" | "loading" | "confirmed" | "failed";
  error: string | null;
  latest: BookingStatusResponse | null;
  createBookingCompleted: boolean;
  createdBookingId: number | null;
  createBookingErrors: CreateBookingErrors; 
};