import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootSaga } from "./root-saga";
import authReducer from "./auth/authSlice";
import dictionaryReducer from "./dictionaries/dictionarySlice";
import groupHomeReducer from "./partner/primary-account/group-home/groupHomeSlice";
import guestPropertyReducer from "./guest/property/guestPropertySlice";
import searchPageReducer from "./guest/pages/search-page/searchPageSlice";
import checkoutPageReducer from "./guest/pages/checkout-page/checkoutPageSlice";
import paymentReducer from "./guest/payment/paymentSlice";
import bookingReducer from "./guest/booking/bookingSlice";
import createPropertyReducer from "./partner/manage-property/create-property/createPropertySlice";
import websocketrReducer from "./websocket/websocketSlice";
import websocketMiddleware from "./websocket/websocketMiddleware";

/* =========================
   Persist configurations
   ========================= */
const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ['user'],
};

const persistDictionaryConfig = {
  key: "dictionary",
  storage,
  whitelist: ['amenityDictionary', 'languageDictionary'],
};

const persistCreatePropertyConfig = {
  key: "createProperty",
  storage,
  whitelist: [
    "createPropertyLoading",
    "createPropertyErrors",
    "hasFieldErrors",
    "createPropertyForm",
  ],
};

const persistGroupHomeConfig = {
  key: "groupHome",
  storage,
  whitelist: [],
};

const persistGuestPropertyConfig = {
  key: "guestProperty",
  storage,
  whitelist: ['selectedProperty'],
};

const persistSearchPageConfig = {
  key: "searchPage",
  storage,
  whitelist: ['filters'],
};

const persistCheckoutPageConfig = {
  key: "checkoutPage",
  storage,
  whitelist: [],
};

const persistBookingConfig = {
  key: "booking",
  storage,
  whitelist: [],
};

const persistPaymentConfig = {
  key: "payment",
  storage,
  whitelist: [],
};

const persistWebsocketConfig = {
  key: "websocket",
  storage,
  whitelist: [],
};

/* =========================
   Persisted reducers
   ========================= */

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
    dictionary: persistReducer(persistDictionaryConfig, dictionaryReducer),
    createProperty: persistReducer(persistCreatePropertyConfig, createPropertyReducer),
    groupHome: persistReducer(persistGroupHomeConfig, groupHomeReducer),
    guestProperty: persistReducer(persistGuestPropertyConfig, guestPropertyReducer),
    searchPage: persistReducer(persistSearchPageConfig, searchPageReducer),
    checkoutPage: persistReducer(persistCheckoutPageConfig, checkoutPageReducer),
    booking: persistReducer(persistBookingConfig, bookingReducer),
    payment: persistReducer(persistPaymentConfig, paymentReducer),
    websocket: persistReducer(persistWebsocketConfig, websocketrReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware, websocketMiddleware,logger),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

/* =========================
   Global store types
   ========================= */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
