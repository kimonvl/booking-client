import { createSelector } from "reselect";
import type { RootState } from "@/store/store";

const selectPayment = (state: RootState) => state.payment;

export const selectPaymentStatus = createSelector([selectPayment], (p) => p.status);
export const selectPaymentError = createSelector([selectPayment], (p) => p.error);
export const selectClientSecret = createSelector([selectPayment], (p) => p.clientSecret);
