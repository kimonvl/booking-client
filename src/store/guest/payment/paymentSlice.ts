import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PaymentStatusUI = "idle" | "loading" | "succeeded" | "failed";

export type CreatePaymentIntentPayload = {
  bookingId: number;
};

type PaymentState = {
  status: PaymentStatusUI;
  error: string | null;
  clientSecret: string | null;
  bookingId: number | null;
};

const initialState: PaymentState = {
  status: "idle",
  error: null,
  clientSecret: null,
  bookingId: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    createPaymentIntentStart: (state) => {
      state.status = "loading";
      state.error = null;
      state.clientSecret = null;
    },
    createPaymentIntentSuccess: (state, action: PayloadAction<{ clientSecret: string, bookingId: number }>) => {
      state.status = "succeeded";
      state.clientSecret = action.payload.clientSecret;
      state.bookingId = action.payload.bookingId;
    },
    createPaymentIntentFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
      state.clientSecret = null;
    },
    resetPaymentState: () => initialState,
  },
});

const paymentReducer = paymentSlice.reducer;
export const {
  createPaymentIntentStart,
  createPaymentIntentSuccess,
  createPaymentIntentFailure,
  resetPaymentState,
} = paymentSlice.actions;

export default paymentReducer;
