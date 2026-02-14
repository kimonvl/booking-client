import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PaymentStatusUI = "idle" | "loading" | "succeeded" | "failed";

export type CreatePaymentIntentPayload = {
  bookingId: number;
};

type PaymentState = {
  status: PaymentStatusUI;
  error: string | null;
  clientSecret: string | null;
};

const initialState: PaymentState = {
  status: "idle",
  error: null,
  clientSecret: null,
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
    createPaymentIntentSuccess: (state, action: PayloadAction<string>) => {
      state.status = "succeeded";
      state.clientSecret = action.payload;
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
