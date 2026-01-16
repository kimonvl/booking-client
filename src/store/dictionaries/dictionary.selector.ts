import { createSelector } from "reselect";
import type { RootState } from "../store";
import type { DictionaryState } from "./dictionary.types";


const selectDictionaryReducer = (state: RootState): DictionaryState => state.dictionary;

export const selectAmenitiesDictionary = createSelector(
    [selectDictionaryReducer],
    (dictionarySlice) => dictionarySlice.amenitiesDictionary
);
