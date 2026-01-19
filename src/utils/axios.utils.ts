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

export function sendPostFormData<TResponse = unknown>(
  endpoint: string,
  data: FormData,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> {
  return api.post<TResponse>(endpoint, data, {
    headers: {
      // 🔥 IMPORTANT: remove Content-Type so browser sets boundary
      "Content-Type": undefined as any,
    },
    ...config,
  });
}


