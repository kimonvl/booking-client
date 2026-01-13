import type { AxiosError, AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { api } from "@/utils/axios.utils";
import { logout, refreshSuccess } from "@/store/auth/authSlice";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { LoginResponse } from "@/types/response/auth/authResponse.types";

function isAxiosError(e: unknown): e is AxiosError {
  return typeof e === "object" && e !== null && (e as any).isAxiosError === true;
}

/**
 * Single-flight refresh:
 * If 10 requests fail with 401 at the same time,
 * only ONE /auth/refresh call is executed.
 */
let refreshInFlight:
  | Promise<AxiosResponse<ApiResponse<LoginResponse>>>
  | null = null;

function startRefreshOnce() {
  refreshInFlight =
    refreshInFlight ?? api.post<ApiResponse<LoginResponse>>("/auth/refresh");
  return refreshInFlight;
}

async function refreshAndGetPayload() {
  return await startRefreshOnce();
}

function* ensureFreshAccessToken(): any {
  try {
    const res: AxiosResponse<ApiResponse<LoginResponse>> = yield call(
      refreshAndGetPayload
    );
    console.log("refresh access token");
    

    // allow future refreshes
    refreshInFlight = null;

    const body = res.data;
    if (!body?.success || !body.data?.accessToken) {
      throw new Error(body?.message || "Refresh failed");
    }

    // stores accessToken + user (if backend returns it)
    yield put(refreshSuccess(body.data));

    return body.data.accessToken as string;
  } catch (e) {
    refreshInFlight = null;
    console.log("refresh access token failed");
    
    throw e;
  }
}

export type CallApiWithRefreshOptions = {
  /**
   * If false, we will refresh the token (so the app becomes authenticated again)
   * BUT we will NOT retry the original request automatically.
   * Useful for non-idempotent POST/PUT/DELETE that you don't want to replay.
   */
  allowRetry?: boolean;
};

/**
 * Wrap any protected request:
 * - try request
 * - if 401 -> refresh (single-flight) -> (optionally) retry ONCE
 * - if refresh fails -> logout and rethrow
 */
export function* callApiWithRefresh<T>(
  requestFn: () => Promise<AxiosResponse<T>>,
  options?: CallApiWithRefreshOptions
): any {
  const allowRetry = options?.allowRetry ?? true;

  try {
    return yield call(requestFn);
  } catch (e) {
    if (!isAxiosError(e)) throw e;

    const status = e.response?.status;
    if (status !== 401) throw e;

    try {
      // refresh (shared across concurrent failures)
      yield call(ensureFreshAccessToken);

      // if you don't want to replay the request, stop here
      if (!allowRetry) throw e;

      // retry original request ONCE
      return yield call(requestFn);
    } catch (refreshErr) {
      yield put(logout());
      throw refreshErr;
    }
  }
}
