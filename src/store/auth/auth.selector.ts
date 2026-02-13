import { createSelector } from "reselect";
import type { RootState } from "../store";
import type { AuthState } from "./auth.types";

const selectAuthReducer = (state: RootState): AuthState => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.user
);

export const selectAccessToken = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.accessToken
);

export const selectRegisterErrors = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.registerErrors
);

export const selectRegisterCompleted = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.registerCompleted
);

export const selectAuthStatus = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.status
);

export const selectBootstrapStatus = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.bootstrap
);

export const selectIsAuthenticated = createSelector(
  [selectAccessToken, selectCurrentUser],
  (token, user) => Boolean(token && user)
);