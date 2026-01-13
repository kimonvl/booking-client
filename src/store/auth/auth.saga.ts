import type { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "sonner";
import type { AuthUser, RegisterRequest } from "./auth.types";
import type { SagaIterator } from "redux-saga";
import type { AxiosResponse } from "axios";
import { sendPostJson } from "@/utils/axios.utils";
import type { ApiResponse } from "@/types/response/apiResponse";
import { bootstrapDone, bootstrapStart, loginFailed, loginStart, loginSuccess, logout, refreshSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import type { LoginRequest } from "@/types/request/auth/authRequest.types";
import type { LoginResponse } from "@/types/response/auth/authResponse.types";

export function* register(action: PayloadAction<RegisterRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<AuthUser>> = yield call(sendPostJson<AuthUser, RegisterRequest>, "auth/register", action.payload)
        if (res && res.data.success) {
            yield put(registerSuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Register Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";

        yield put(registerFailed(errorMessage));
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

export function* bootstrap(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<LoginResponse>> = yield call(sendPostJson<LoginResponse, {}>, "auth/refresh", {})
        if (res && res.data.success) {
            yield put(refreshSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (e) {
        // refresh may fail -> just stay logged out
        yield put(logout());
    } finally {
        yield put(bootstrapDone());
    }
}

export function* onRegisterStart(): SagaIterator {
    yield takeLatest(registerStart.type, register);
}

export function* onLoginStart(): SagaIterator {
    yield takeLatest(loginStart.type, login);
}

export function* onBootstrapStart(): SagaIterator {
    yield takeLatest(bootstrapStart.type, bootstrap);
}


export function* authSaga(): SagaIterator {
    yield all([
        call(onRegisterStart),
        call(onLoginStart),
        call(onBootstrapStart),
    ]);
}