import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppartmentState } from "./apartment.types";
import type { AddApartmentRequest } from "@/types/request/apartment/addApartmentRequest.types";

const initialState: AppartmentState = {
    addApartmentLoading: false,
    error: null,
}

export const apartmentSlice = createSlice({
    name: 'apartment',
    initialState,
    reducers: {
        sendAddApartmentStart: (state, _action: PayloadAction<AddApartmentRequest>) => {
            state.addApartmentLoading = true;
        },
        sendAddApartmentSuccess: (state) => {
            state.addApartmentLoading = false;
        },
        sendAddApartmentFailure: (state, action: PayloadAction<string>) => {
            state.addApartmentLoading = false;
            state.error = action.payload;
        },
    }
});

const apartmentReducer = apartmentSlice.reducer;
export const {
    sendAddApartmentStart,
    sendAddApartmentSuccess,
    sendAddApartmentFailure,
} = apartmentSlice.actions;

export default apartmentReducer;