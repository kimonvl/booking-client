import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AmenityDictionaryItem, CountryDictionaryItem, DictionaryState, LanguageDictionaryItem, RoleDictionaryItem } from "./dictionary.types";

const initialState: DictionaryState = {
    amenityDictionary: [],
    languageDictionary: [],
    countryDictionary: [],
    roleDictionary: [],
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
        getCountryDictionaryStart: (state) => {
            state.loading = true;
        },
        getCountryDictionarySuccess: (state, action: PayloadAction<CountryDictionaryItem[]>) => {
            state.countryDictionary = action.payload;
            state.loading = false;
        },
        getCountryDictionaryFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getRoleDictionaryStart: (state) => {
            state.loading = true;
        },
        getRoleDictionarySuccess: (state, action: PayloadAction<RoleDictionaryItem[]>) => {
            state.roleDictionary = action.payload;
            state.loading = false;
        },
        getRoleDictionaryFailure: (state, action: PayloadAction<string>) => {
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
    getCountryDictionaryStart,
    getCountryDictionarySuccess,
    getCountryDictionaryFailure,
    getRoleDictionaryStart,
    getRoleDictionarySuccess,
    getRoleDictionaryFailure,
} = dictionarySlice.actions;

export default dictionaryReducer;