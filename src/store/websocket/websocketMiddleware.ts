import {
  connectWebsocketStart,
  connectWebsocketSuccess,
  connectWebsocketFailure,
} from "./websocketSlice";
import { Client } from "@stomp/stompjs";
import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { selectAccessToken, selectCurrentUser } from "../auth/auth.selector";

let client: Client | null = null;
let isConnecting = false;

const websocketMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action !== "object" || action === null || !("type" in action)) {
    return next(action);
  }
  console.log(" connect middleware", action.type);

  switch (action.type) {
    case connectWebsocketStart.type: {
      
      if (client && (client.connected || isConnecting)) {
        store.dispatch(connectWebsocketSuccess());
        return next(action);
      }

      const state = store.getState() as RootState;
      const accessToken = selectAccessToken(state);
      if (!accessToken) {
        store.dispatch(connectWebsocketFailure());
        return next(action);
      }

      isConnecting = true;

      client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        reconnectDelay: 5000,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: (s) => console.log("[STOMP]", s),
      });

      client.onConnect = () => {
        isConnecting = false;

        const uuid = selectCurrentUser(state)?.id;
        // TODO: subscribe to notificiations/uuid
        client!.subscribe(`/user/queue/notifications/${uuid}`, (msg) => {
          console.log("Notification received", msg.body);
        });

        // TODO: subscribe to messages/uuid
        client!.subscribe(`/user/queue/messages/${uuid}`, (msg) => {
          console.log("Message received", msg.body);
        });

        store.dispatch(connectWebsocketSuccess());
      };

      client.onStompError = () => {
        isConnecting = false;
        store.dispatch(connectWebsocketFailure());
      };

      client.onWebSocketError = () => {
        isConnecting = false;
        store.dispatch(connectWebsocketFailure());
      };

      client.onDisconnect = () => {
        isConnecting = false;
        store.dispatch(connectWebsocketFailure());
      };

      client.activate();
      break;
    }
  }

  return next(action);
};

export default websocketMiddleware;