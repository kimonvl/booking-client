import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AmenityDictionaryItem, DictionaryState, LanguageDictionaryItem } from "./dictionary.types";

const initialState: DictionaryState = {
    amenityDictionary: [],
    languageDictionary: [],
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
        getAmenitiesDictionarySuccess: (state, action: PayloadAction<AmenityDictionaryItem[]>) => {
            state.amenityDictionary = action.payload;
            state.loading = false;
        },
        getAmenitiesDictionaryFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getLanguageDictionaryStart: (state) => {
            state.loading = true;
        },
        getLanguageDictionarySuccess: (state, action: PayloadAction<LanguageDictionaryItem[]>) => {
            state.languageDictionary = action.payload;
            state.loading = false;
        },
        getLanguageDictionaryFailure: (state, action: PayloadAction<string>) => {
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
    getLanguageDictionaryStart,
    getLanguageDictionarySuccess,
    getLanguageDictionaryFailure,
} = dictionarySlice.actions;

export default dictionaryReducer;