import axois from 'axios';

const axiosInstance = axois.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export default axiosInstance;