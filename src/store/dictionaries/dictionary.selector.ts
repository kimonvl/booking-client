import { createSelector } from "reselect";
import type { RootState } from "../store";
import type { DictionaryState } from "./dictionary.types";


const selectDictionaryReducer = (state: RootState): DictionaryState => state.dictionary;

export const selectAmenitiesDictionary = createSelector(
    [selectDictionaryReducer],
    (dictionarySlice) => dictionarySlice.amenityDictionary
);

export const selectAmenitiesDictionaryNoGroups = createSelector(
    [selectDictionaryReducer],
    (dictionarySlice) => {
        return dictionarySlice.amenityDictionary.flatMap((g) => g.items);  
    }
);

export const selectLanguageDictionary = createSelector(
    [selectDictionaryReducer],
    (dictionarySlice) => dictionarySlice.languageDictionary
);

export const selectCountryDictionary = createSelector(
    [selectDictionaryReducer],
    (dictionarySlice) => dictionarySlice.countryDictionary
);

export const selectCountryNames = createSelector(
    [selectCountryDictionary],
    (countryDictionary) => countryDictionary.map((item) => item.name)
);

export const selectSelectedCountryCode = createSelector(
    [
        selectCountryDictionary,
        (_: RootState, selected: string) => selected,
    ],
    (dictionary, selected) => {
        return dictionary
            .find((lang) => lang.name == selected)?.code
    }
);

export const selectSelectedAmenityLabels = createSelector(
    [
        selectAmenitiesDictionary,
        (_: RootState, selected: Record<string, boolean>) => selected,
    ],
    (dictionary, selected) => {
        const labelByCode: Record<string, string> = {};

        dictionary.forEach(group => {
            group.items.forEach(item => {
                labelByCode[item.code] = item.label;
            });
        });

        return Object.entries(selected)
            .filter(([, v]) => v)
            .map(([code]) => labelByCode[code])
            .filter(Boolean);
    }
);

export const selectSelectedLanguageLabels = createSelector(
    [
        selectLanguageDictionary,
        (_: RootState, selected: Record<string, boolean>) => selected,
    ],
    (dictionary, selected) => {
        return dictionary
            .filter((lang) => selected[lang.code])
            .map((lang) => lang.label);
    }
);

export const selectSelectedCountryLabels = createSelector(
    [
        selectCountryDictionary,
        (_: RootState, countryCode: string) => countryCode,
    ],
    (dictionary, countryCode) => {
        return dictionary
            .find((country) => country.code === countryCode)?.name
    }
);

