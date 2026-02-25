import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingStatusResponse } from "@/types/response/booking/bookingStatus.types";
import type { BookingState, CreateBookingErrors } from "./booking.types";



const initialState: BookingState = {
  polling: false,
  status: "idle",
  error: null,
  latest: null,
  createBookingCompleted: false,
  createdBookingId: null,
  createBookingErrors: {},
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    createBookingPendingStart: (state) => {
      state.createBookingCompleted = false;
      state.createBookingErrors = {}
    },
    createBookingPendingSuccess: (state, action: PayloadAction<number>) => {
      state.createBookingCompleted = true;
      state.createdBookingId = action.payload;
    },
    createBookingPendingFailure: (state, action: PayloadAction<{message: string, createBookingErrors: CreateBookingErrors}>) => {
      state.createBookingCompleted = false;
      state.error = action.payload.message;
      state.createBookingErrors = action.payload.createBookingErrors;
    },
    cancelPendingBookingStart: (_state, _action: PayloadAction<number>) => {
    },
    cancelPendingBookingSuccess: (state) => {
      state.createdBookingId = null;
    },
    cancelPendingBookingFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetCreateBookingCompleted: (state) => {
      state.createBookingCompleted = false;
    },
    startPollingBooking: (state, _action: PayloadAction<string>) => {
      state.polling = true;
      state.status = "loading";
      state.error = null;
      state.latest = null;
    },
    pollingUpdate: (state, action: PayloadAction<BookingStatusResponse>) => {
      state.latest = action.payload;
    },
    pollingConfirmed: (state, action: PayloadAction<BookingStatusResponse>) => {
      state.polling = false;
      state.status = "confirmed";
      state.latest = action.payload;
    },
    pollingFailed: (state, action: PayloadAction<string>) => {
      state.polling = false;
      state.status = "failed";
      state.error = action.payload;
    },
    stopPolling: (state) => {
      state.polling = false;
    },
    resetConfirm: () => initialState,
  },
});

const bookingReducer = bookingSlice.reducer;
export const {
  createBookingPendingStart,
  createBookingPendingSuccess,
  createBookingPendingFailure,
  cancelPendingBookingStart,
  cancelPendingBookingSuccess,
  cancelPendingBookingFailed,
  resetCreateBookingCompleted,
  startPollingBooking,
  pollingUpdate,
  pollingConfirmed,
  pollingFailed,
  stopPolling,
  resetConfirm,
} = bookingSlice.actions;

export default bookingReducer;
