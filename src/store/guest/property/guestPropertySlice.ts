import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GuestPropertyState, PropertyShort } from "./guestProperty.types";


const initialState: GuestPropertyState = {
    searchResults: [],
    loading: false,
    error: null,
}

export const guestPropertySlice = createSlice({
    name: 'guestProperty',
    initialState,
    reducers: {
        getPropertiesByCityStart: (state, _action: PayloadAction<string>) => {
            state.loading = true;
        },
        getPropertiesByCitySuccess: (state, action: PayloadAction<PropertyShort[]>) => {
            state.searchResults = action.payload;
            state.loading = false;
        },
        getPropertiesByCityFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

const guestPropertyReducer = guestPropertySlice.reducer;
export const {
    getPropertiesByCityStart,
    getPropertiesByCitySuccess,
    getPropertiesByCityFailure,
} = guestPropertySlice.actions;

export default guestPropertyReducer;