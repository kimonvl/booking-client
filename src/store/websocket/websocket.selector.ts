import { createSelector } from "reselect";
import type { RootState } from "../store";
import type { WebsocketState } from "./websocket.types";

const selectWebsocketReducer = (state: RootState): WebsocketState => state.websocket;

export const selectWebsocketIsConnected = createSelector(
  [selectWebsocketReducer],
  (websocket) => websocket.isConnected
);
