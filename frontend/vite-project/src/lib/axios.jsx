import axios from "axios";

const axiosInstance = axios.create({
  // If VITE_API_URL isn't set (missing frontend .env), default to local backend.
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

export default axiosInstance;