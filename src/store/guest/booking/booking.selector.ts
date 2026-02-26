import { createSelector } from "reselect";
import type { RootState } from "@/store/store";
import type { BookingState } from "./booking.types";

const selectBookingReducer = (state: RootState): BookingState => state.booking;

export const selectCreateBookingCompleted = createSelector([selectBookingReducer], (bookingSlice) => bookingSlice.createBookingCompleted);
export const selectCreatedBookingId = createSelector([selectBookingReducer], (bookingSlice) => bookingSlice.createdBookingId);
export const selectCreatedBookingErrors = createSelector([selectBookingReducer], (bookingSlice) => bookingSlice.createBookingErrors);

export const selectConfirmStatus = createSelector([selectBookingReducer], (bookingSlice) => bookingSlice.status);
export const selectConfirmLatest = createSelector([selectBookingReducer], (bookingSlice) => bookingSlice.latest);
export const selectConfirmError = createSelector([selectBookingReducer], (bookingSlice) => bookingSlice.error);
export const selectIsPolling = createSelector([selectBookingReducer], (bookingSlice) =>bookingSlice.polling);
