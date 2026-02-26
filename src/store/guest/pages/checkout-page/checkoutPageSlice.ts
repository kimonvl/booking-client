import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CheckoutDetailsFormState, CheckoutPageState } from "./checkoutPage.types";
import type { AuthUser } from "@/store/auth/auth.types";
import { resetGuestState } from "../../guest.actions";



const initialState: CheckoutPageState = {
    checkoutDetailsForm: {
        travelingForWork: "no",
        title: "",
        firstName: "",
        lastName: "",
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
            state.checkoutDetailsForm.firstName = action.payload.firstName;
            state.checkoutDetailsForm.lastName = action.payload.lastName;
        },
        setGuestCheckoutDetailsForm: (state, action: PayloadAction<CheckoutDetailsFormState>) => {
            state.checkoutDetailsForm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(resetGuestState, () => initialState);
    },
});

const checkoutPageReducer = checkoutPageSlice.reducer;
export const {
    populateFromAuthenticatedUser,
    setGuestCheckoutDetailsForm,
} = checkoutPageSlice.actions;

export default checkoutPageReducer;