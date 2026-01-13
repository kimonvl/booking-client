import { store } from "@/store/store";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiResponse } from "@/types/response/apiResponse";
import type { LoginResponse } from "@/types/response/auth/authResponse.types";
import { logout, refreshSuccess } from "@/store/auth/authSlice";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // sends refresh cookie automatically
});

// Separate instance to avoid interceptor recursion
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/** Normalize axios config.url to a pathname like "/auth/login" */
function getPath(config: AxiosRequestConfig): string {
  const base = config.baseURL ?? API_BASE_URL;
  const url = config.url ?? "";
  try {
    return new URL(url, base).pathname; // handles "auth/login" and "/auth/login" and full URLs
  } catch {
    const u = url.startsWith("/") ? url : `/${url}`;
    return u.split("?")[0];
  }
}

function isAuthPath(path: string) {
  return path.startsWith("/auth/");
}

/** IMPORTANT: avoid installing interceptors multiple times (HMR/dev) */
const g = globalThis as any;
if (g.__api_interceptors_installed) {
  // already installed, do nothing
} else {
  g.__api_interceptors_installed = true;

  // Attach access token (Bearer) from Redux to every request
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.accessToken;

    console.log("[API]", config.method?.toUpperCase(), config.url, {
    hasToken: Boolean(token),
  });

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // // prevent multiple refresh calls at once
  // let refreshPromise: Promise<string> | null = null;

  // async function doRefresh(): Promise<string> {
  //   const res = await refreshClient.post<ApiResponse<LoginResponse>>("/auth/refresh");

  //   const newToken = res.data?.data?.accessToken;
  //   if (!newToken) throw new Error("Refresh response missing accessToken");

  //   // You store token (and maybe user=null) in redux
  //   store.dispatch(refreshSuccess(res.data.data));
  //   return newToken;
  // }

  // api.interceptors.response.use(
  //   (response) => response,
  //   async (error: AxiosError) => {
  //     const status = error.response?.status;
  //     const originalConfig = error.config as (AxiosRequestConfig & { _retry?: boolean });

  //     if (!originalConfig) return Promise.reject(error);

  //     const path = getPath(originalConfig);
  //     const method = (originalConfig.method ?? "get").toLowerCase();

  //     // ✅ refresh ONLY on 401 (unauthorized)
  //     // ❌ never refresh on /auth/* calls
  //     // ❌ don't loop
  //     if (status !== 401 || originalConfig._retry || isAuthPath(path)) {
  //       return Promise.reject(error);
  //     }

  //     originalConfig._retry = true;

  //     try {
  //       refreshPromise = refreshPromise ?? doRefresh();
  //       const token = await refreshPromise;
  //       refreshPromise = null;

  //       // ✅ DO NOT automatically replay non-GET (prevents "last POST fires again")
  //       // If you *want* retry for POST, opt in by setting config.headers["x-retry"] = "1"
  //       const retryAllowed =
  //         method === "get" || (originalConfig.headers as any)?.["x-retry"] === "1";

  //       if (!retryAllowed) {
  //         // token refreshed, but we don't replay the request automatically
  //         return Promise.reject(error);
  //       }

  //       originalConfig.headers = originalConfig.headers ?? {};
  //       (originalConfig.headers as any).Authorization = `Bearer ${token}`;

  //       return api(originalConfig);
  //     } catch (refreshErr) {
  //       refreshPromise = null;
  //       store.dispatch(logout());
  //       return Promise.reject(refreshErr);
  //     }
  //   }
  // );
}

export function sendGet<TResponse>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> {
  return api.get<TResponse>(endpoint, config);
}

export function sendPostJson<TResponse, TBody = unknown>(
  endpoint: string,
  data?: TBody,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> {
  return api.post<TResponse>(endpoint, data, {
    headers: { "Content-Type": "application/json" },
    ...config,
  });
}
