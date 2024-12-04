import axios from 'axios';
import {BASE_URL} from "../config/config";

// Crear instancia de Axios
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token JWT
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtiene el token desde el almacenamiento local
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
