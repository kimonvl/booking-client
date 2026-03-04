import { createSlice } from "@reduxjs/toolkit";
import type { WebsocketState } from "./websocket.types";

const initialState: WebsocketState = {
    isConnected: false,
    subscribedTopics: {},
};

export const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        connectWebsocketStart: (state) => {
            state.isConnected = false;
        },
        connectWebsocketSuccess: (state) => {            
            state.isConnected = true;
        },
        connectWebsocketFailure: (state) => {
            state.isConnected = false;
            state.subscribedTopics = {};
        },
    }
});

const websocketrReducer = websocketSlice.reducer;

export const {
    connectWebsocketStart,
    connectWebsocketSuccess,
    connectWebsocketFailure,
} = websocketSlice.actions;

export default websocketrReducer