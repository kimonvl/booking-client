import { createSelector } from "reselect";
import type { RootState } from "../store";
import type { DictionaryState } from "./dictionary.types";


const selectDictionaryReducer = (state: RootState): DictionaryState => state.dictionary;

export const selectAmenitiesDictionary = createSelector(
    [selectDictionaryReducer],
    (dictionarySlice) => dictionarySlice.amenityDictionary
);

export const selectLanguageDictionary = createSelector(
    [selectDictionaryReducer],
    (dictionarySlice) => dictionarySlice.languageDictionary
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

