import axios, { InternalAxiosRequestConfig } from "axios";
import Router from "next/router";

const controllerMap = new Map<string, AbortController>();
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const fullUrl = new URL(config.url!, config.baseURL).pathname;
    if (controllerMap.has(fullUrl)) {
      controllerMap.get(fullUrl)!.abort();
    }
    const controller = new AbortController();
    controllerMap.set(fullUrl, controller);
    config.signal = controller.signal;
    const token = localStorage.getItem("sessionAuthToken");
    if (token) {
      config.headers.sessionauth = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
      window.location.href = "/error?code=ECONNABORTED";
    }
    const originalRequest = error.config;
    if (typeof window != undefined) {
      if (error.status === 401) {
        localStorage.clear();
        Router.push("/");
        return Promise.reject(error);
      }
    }

    if (error.response && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = localStorage.getItem("sessionAuthToken");
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      }
    }
    if (error.code === "ECONNABORTED") {
      window.location.href = "/error?code=ECONNABORTED";
    } else if (error.response?.status === 429) {
      window.location.href = "/error?code=429";
    } else if (error.response?.status >= 500) {
      window.location.href = "/error?code=500";
    }

    return Promise.reject(error);
  }
);
