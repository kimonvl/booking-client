import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingStatusResponse } from "@/types/response/booking/bookingStatus.types";

type ConfirmState = {
  polling: boolean;
  status: "idle" | "loading" | "confirmed" | "failed";
  error: string | null;
  latest: BookingStatusResponse | null;
};

const initialState: ConfirmState = {
  polling: false,
  status: "idle",
  error: null,
  latest: null,
};

export const bookingConfirmSlice = createSlice({
  name: "bookingConfirm",
  initialState,
  reducers: {
    startPollingBooking: (state, _action: PayloadAction<{ bookingId: number }>) => {
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

const bookingConfirmReducer = bookingConfirmSlice.reducer;
export const {
  startPollingBooking,
  pollingUpdate,
  pollingConfirmed,
  pollingFailed,
  stopPolling,
  resetConfirm,
} = bookingConfirmSlice.actions;

export default bookingConfirmReducer;
