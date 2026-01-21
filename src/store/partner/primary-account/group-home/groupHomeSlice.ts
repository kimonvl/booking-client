import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GroupHomeState, PropertyOperationsRow, SummaryTile } from "./groupHome.types";

const initialState: GroupHomeState = {
    operationsTable: [],
    summaryTiles: [],
    operationsLoading: false,
    summaryTilesLoading: false,
    error: null,
}

export const groupHomeSlice = createSlice({
    name: 'groupHome',
    initialState,
    reducers: {
        getOperationsTableStart: (state) => {
            state.operationsLoading = true;
        },
        getOperationsTableSuccess: (state, action: PayloadAction<PropertyOperationsRow[]>) => {
            state.operationsTable = action.payload;
            state.operationsLoading = false;
        },
        getOperationsTableFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.operationsLoading = false;
        },
        getSummaryTilesStart: (state) => {
            state.summaryTilesLoading = true;
        },
        getSummaryTilesSuccess: (state, action: PayloadAction<SummaryTile[]>) => {
            state.summaryTiles = action.payload;
            state.summaryTilesLoading = false;
        },
        getSummaryTilesFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.summaryTilesLoading = false;
        },

    }
});

const groupHomeReducer = groupHomeSlice.reducer;
export const {
    getOperationsTableStart,
    getOperationsTableSuccess,
    getOperationsTableFailure,
    getSummaryTilesStart,
    getSummaryTilesSuccess,
    getSummaryTilesFailure,
} = groupHomeSlice.actions;

export default groupHomeReducer;