import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GuestPropertyState, PropertyDetails, PropertyShort, SearchFieldErrors } from "./guestProperty.types";
import { resetGuestState } from "../guest.actions";


const initialState: GuestPropertyState = {
    searchResults: [],
    searchFieldErrors: {},
    selectedProperty: null,
    loading: false,
    error: null,
}

export const guestPropertySlice = createSlice({
    name: 'guestProperty',
    initialState,
    reducers: {
        searchStart: (state) => {
            state.loading = true;
        },
        searchSuccess: (state, action: PayloadAction<PropertyShort[]>) => {
            state.searchResults = action.payload;
            state.searchFieldErrors = {};
            state.loading = false;
        },
        searchFailure: (state, action: PayloadAction<{ errorMsg: string, fieldErrors: SearchFieldErrors }>) => {
            state.error = action.payload.errorMsg;
            state.searchFieldErrors = action.payload.fieldErrors;
            state.searchResults = [];
            state.loading = false;
        },
        loadMoreStart: (state) => {
            state.loading = true;
        },
        loadMoreSuccess: (state, action: PayloadAction<PropertyShort[]>) => {
            state.searchResults = [...state.searchResults, ...action.payload]
            state.loading = false;
        },
        loadMoreFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getSelectedPropertyStart: (state, _action: PayloadAction<string>) => {
            state.loading = true;
        },
        getSelectedPropertySuccess: (state, action: PayloadAction<PropertyDetails>) => {
            state.selectedProperty = action.payload;
            state.loading = false;
        },
        getSelectedPropertyFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetGuestState, () => initialState);
    },
});

const guestPropertyReducer = guestPropertySlice.reducer;
export const {
    searchStart,
    searchSuccess,
    searchFailure,
    loadMoreStart,
    loadMoreSuccess,
    loadMoreFailure,
    getSelectedPropertyStart,
    getSelectedPropertySuccess,
    getSelectedPropertyFailure,
} = guestPropertySlice.actions;

export default guestPropertyReducer;