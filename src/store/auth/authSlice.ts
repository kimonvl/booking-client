import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./auth.types";
import type { LoginResponse } from "@/types/response/auth/authResponse.types";
import type { LoginRequest, RegisterRequest } from "@/types/request/auth/authRequest.types";


const initialState: AuthState = {
    accessToken: null,
    user: null,
    status: "idle",
    error: null,
    bootstrap: "idle",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart: (state, _action: PayloadAction<RegisterRequest>) => {
            state.status = "loading";
            state.error = null;
        },
        registerSuccess: (state) => {
            state.status = "succeeded";
            state.error = null;
        },
        registerFailed: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.error = action.payload;
        },
        loginStart: (state, _action: PayloadAction<LoginRequest>) => {
            state.status = "loading";
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
            state.status = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.error = null;
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.accessToken = null;
            state.user = null;
            state.error = action.payload;
        },
        refreshSuccess: (state, action: PayloadAction<LoginResponse>) => {
            if (!action.payload.accessToken) {
                state.user = null;
                state.accessToken = null;
                return;
            }
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logoutStart: (state) => {
            state.status = "loading";
        },
        logoutSuccess: (state) => {
            state.accessToken = null;
            state.user = null;
            state.status = "idle";
            state.error = null;
        },
        logoutFailure: (state) => {
            state.accessToken = null;
            state.user = null;
            state.status = "idle";
            state.error = null;
        },
        bootstrapStart: (state) => {
            state.bootstrap = "loading";
        },
        bootstrapDone: (state) => {
            state.bootstrap = "done";
        },
        getTestStart: () => {
        },
        getTestSuccess: (_state, action: PayloadAction<string>) => {
            console.log(action.payload);
        },
        getTestFailure: () => {
            console.log("Test failed");
        },

    }
});

const authReducer = authSlice.reducer;
export const {
    registerStart,
    registerSuccess,
    registerFailed,
    loginStart,
    loginSuccess,
    loginFailed,
    refreshSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    bootstrapStart,
    bootstrapDone,
    getTestStart,
    getTestSuccess,
    getTestFailure,
} = authSlice.actions;

export default authReducer;