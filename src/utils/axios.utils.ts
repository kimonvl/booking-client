import { store } from "@/store/store";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";


const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // sends refresh cookie automatically
});

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
    hasToken: token,
  });

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
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
