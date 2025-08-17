import axios from "axios";
import Router from "next/router";
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000,
});

apiClient.interceptors.request.use(
  (config) => {
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
      //Time limit
      window.location.href = "/error?code=ECONNABORTED";
    } else if (error.response?.status === 429) {
      // Rate limit
      window.location.href = "/error?code=429";
    } else if (error.response?.status >= 500) {
      // Server error
      window.location.href = "/error?code=500";
    }

    return Promise.reject(error);
  }
);
