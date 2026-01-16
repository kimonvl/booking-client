import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AmenitiesDictionaryItem, DictionaryState } from "./dictionary.types";

const initialState: DictionaryState = {
    amenitiesDictionary: [],
    loading: false,
    error: null,
}

export const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        getAmenitiesDictionaryStart: (state) => {
            state.loading = true;
        },
        getAmenitiesDictionarySuccess: (state, action: PayloadAction<AmenitiesDictionaryItem[]>) => {
            state.amenitiesDictionary = action.payload;
            state.loading = false;
        },
        getAmenitiesDictionaryFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

const dictionaryReducer = dictionarySlice.reducer;
export const {
    getAmenitiesDictionaryStart,
    getAmenitiesDictionarySuccess,
    getAmenitiesDictionaryFailure,
} = dictionarySlice.actions;

export default dictionaryReducer;