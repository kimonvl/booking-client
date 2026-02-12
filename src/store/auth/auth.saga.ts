import type { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { toast } from "sonner";
import type { AuthUser } from "./auth.types";
import type { SagaIterator } from "redux-saga";
import type { AxiosResponse } from "axios";
import { sendGet, sendPostJson } from "@/utils/axios.utils";
import type { ApiResponse } from "@/types/response/apiResponse";
import { bootstrapDone, bootstrapStart, getTestFailure, getTestStart, getTestSuccess, loginFailed, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, refreshSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import type { LoginRequest, RegisterRequest } from "@/types/request/auth/authRequest.types";
import type { LoginResponse } from "@/types/response/auth/authResponse.types";
import { callApiWithRefresh } from "../refreshSagaWraper";
import { selectSelectedCountryCode } from "../dictionaries/dictionary.selector";
import { data } from "react-router-dom";

export function* register(action: PayloadAction<RegisterRequest>): SagaIterator {
    try {
        const countryName = action.payload.country;
        const countryCode: string | undefined = yield select(
            selectSelectedCountryCode,
            countryName
        );
        const apiPayload: RegisterRequest = {
            ...action.payload,
            country: countryCode ?? "",
        };
        console.log(apiPayload);
        
        const res: AxiosResponse<ApiResponse<AuthUser>> = yield call(sendPostJson<AuthUser, RegisterRequest>, "auth/register", apiPayload)
        if (res && res.data.success) {
            yield put(registerSuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Register Error:", error.response?.data); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";

        yield put(registerFailed({registerErrors: error.response?.data.data, error: error.response?.data.message}));
        toast.error(errorMessage);
    }
}

export function* login(action: PayloadAction<LoginRequest>): SagaIterator {
    try {
        console.log("sending login", action.payload);

        const res: AxiosResponse<ApiResponse<LoginResponse>> = yield call(sendPostJson<LoginResponse, LoginRequest>, "auth/login", action.payload)
        if (res && res.data.success) {
            yield put(loginSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Register Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";

        yield put(loginFailed(errorMessage));
        toast.error(errorMessage);
    }
}

export function* logout(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<LoginResponse>> = yield call(sendPostJson<LoginResponse, LoginRequest>, "auth/logout")
        if (res && res.data.success) {
            yield put(logoutSuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Register Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";

        yield put(logoutFailure(errorMessage));
        toast.error(errorMessage);
    }
}

export function* bootstrap(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<LoginResponse>> = yield call(sendPostJson<LoginResponse, {}>, "auth/refresh", {})
        if (res && res.data.success) {
            yield put(refreshSuccess(res.data.data));
            toast.success(res.data.message);
            yield put(bootstrapDone());
        }
    } catch (e) {
        // refresh may fail -> just stay logged out
        yield put(logoutStart());
        yield put(bootstrapDone());
    }
}

export function* getTest(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<string>> = yield call(callApiWithRefresh, () =>
            sendGet<ApiResponse<string>>("/partner/getTest")
        );
        if (res && res.data.success) {
            yield put(getTestSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (e) {
        yield put(getTestFailure());
    }
}

export function* onRegisterStart(): SagaIterator {
    yield takeLatest(registerStart.type, register);
}

export function* onLoginStart(): SagaIterator {
    yield takeLatest(loginStart.type, login);
}

export function* onLogoutStart(): SagaIterator {
    yield takeLatest(logoutStart.type, logout);
}

export function* onBootstrapStart(): SagaIterator {
    yield takeLeading(bootstrapStart.type, bootstrap);
}

export function* onGetTestStart(): SagaIterator {
    yield takeLatest(getTestStart.type, getTest);
}

export function* authSaga(): SagaIterator {
    yield all([
        call(onRegisterStart),
        call(onLoginStart),
        call(onBootstrapStart),
        call(onGetTestStart),
        call(onLogoutStart),
    ]);
}