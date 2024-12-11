import axiosInstance from '../api/axiosConfig';
import {BASE_URL} from "../config/config";

export const logintoken = async (email, password_hash) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/usuario/login`, {
            "email": email,
            "password_hash": password_hash
        });
        const { token, rol, nombre_usuario, id } = response.data;
        localStorage.setItem('token', token); // Guarda el token
        localStorage.setItem('rol', rol); // Guarda el rol
        localStorage.setItem('usuario', nombre_usuario); // Guarda el rol
        localStorage.setItem('userId', id); // Save user ID
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token'); // Elimina el token
    window.location.href = '/login'; // Redirige al inicio de sesión
};
