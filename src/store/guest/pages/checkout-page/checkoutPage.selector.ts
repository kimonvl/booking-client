import type { RootState } from "@/store/store";
import { createSelector } from "reselect";
import type { CheckoutPageState } from "./checkoutPage.types";

const selectCheckoutPageReducer = (state: RootState): CheckoutPageState => state.checkoutPage;

export const selectCheckoutPageDetailsForm = createSelector(
    [selectCheckoutPageReducer],
    (checkoutPageSlice) => checkoutPageSlice.checkoutDetailsForm
);