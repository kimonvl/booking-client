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
import apartmentReducer from "./partner/manage-property/apartment/apartmentSlice";
import searchPageReducer from "./guest/pages/search-page/searchPageSlice";
import checkoutPageReducer from "./guest/pages/checkout-page/checkoutPageSlice";
import bookingConfirmReducer from "./guest/booking/bookingConfirmSlice";
import paymentReducer from "./guest/payment/paymentSlice";

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

const persistApartmentConfig = {
  key: "apartment",
  storage,
  whitelist: [],
};

const persistGroupHomeConfig = {
  key: "groupHome",
  storage,
  whitelist: [],
};

const persistGuestPropertyConfig = {
  key: "guestProperty",
  storage,
  whitelist: [],
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

const persistBookingConfirmConfig = {
  key: "bookingConfirm",
  storage,
  whitelist: [],
};

const persistPaymentConfig = {
  key: "payment",
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
    apartment: persistReducer(persistApartmentConfig, apartmentReducer),
    groupHome: persistReducer(persistGroupHomeConfig, groupHomeReducer),
    guestProperty: persistReducer(persistGuestPropertyConfig, guestPropertyReducer),
    searchPage: persistReducer(persistSearchPageConfig, searchPageReducer),
    checkoutPage: persistReducer(persistCheckoutPageConfig, checkoutPageReducer),
    bookingConfirm: persistReducer(persistBookingConfirmConfig, bookingConfirmReducer),
    payment: persistReducer(persistPaymentConfig, paymentReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware, logger),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

/* =========================
   Global store types
   ========================= */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
