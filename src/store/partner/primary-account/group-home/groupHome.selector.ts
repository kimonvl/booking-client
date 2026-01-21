import type { RootState } from "@/store/store";
import { createSelector } from "reselect";
import type { GroupHomeState } from "./groupHome.types";



const selectGroupHomeReducer = (state: RootState): GroupHomeState => state.groupHome;

export const selectOperationsTable = createSelector(
    [selectGroupHomeReducer],
    (groupHomeSlice) => groupHomeSlice.operationsTable
);

export const selectOperationsLoading = createSelector(
    [selectGroupHomeReducer],
    (groupHomeSlice) => groupHomeSlice.operationsLoading
);

export const selectSummaryTiles = createSelector(
    [selectGroupHomeReducer],
    (groupHomeSlice) => groupHomeSlice.summaryTiles
);

export const selectSummaryTilesLoading = createSelector(
    [selectGroupHomeReducer],
    (groupHomeSlice) => groupHomeSlice.summaryTilesLoading
);