import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CheckoutDetailsFormState, CheckoutPageState } from "./checkoutPage.types";
import type { AuthUser } from "@/store/auth/auth.types";



const initialState: CheckoutPageState = {
    checkoutDetailsForm: {
        travelingForWork: "no",
        title: "",
        firstName: "Vloutis",
        lastName: "Kimon",
        email: "",
        confirmEmail: "",
        phoneCountryCode: "+30",
        phoneNumber: "",
        specialRequest: "",
    }
}

export const checkoutPageSlice = createSlice({
    name: 'checkoutPage',
    initialState,
    reducers: {
        populateFromAuthenticatedUser: (state, action: PayloadAction<AuthUser>) => {
            state.checkoutDetailsForm.email = action.payload.email;
            state.checkoutDetailsForm.confirmEmail = action.payload.email;
        },
        setGuestCheckoutDetailsForm: (state, action: PayloadAction<CheckoutDetailsFormState>) => {
            state.checkoutDetailsForm = action.payload;
        }
    }
});

const checkoutPageReducer = checkoutPageSlice.reducer;
export const {
    populateFromAuthenticatedUser,
    setGuestCheckoutDetailsForm,
} = checkoutPageSlice.actions;

export default checkoutPageReducer;