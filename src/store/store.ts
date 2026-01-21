import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootSaga } from "./root-saga";
import authReducer from "./auth/authSlice";
import dictionaryReducer from "./dictionaries/dictionarySlice";
import apartmentReducer from "./partner/add-property/apartment/apartmentSlice";
import groupHomeReducer from "./partner/primary-account/group-home/groupHomeSlice";

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
