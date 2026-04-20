import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081").trim();

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("taskapp_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
