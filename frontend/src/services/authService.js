import axiosInstance from '../api/axiosConfig';

export const logintoken = async (username, password) => {
    try {
        const response = await axiosInstance.post('http://localhost:8094/usuario/login', {
            username,
            password,
        });
        const token = response.data.token;
        const rol = response.data.rol;
        const nombre = response.data.nombre_usuario;
        localStorage.setItem('token', token); // Guarda el token
        localStorage.setItem('rol', rol); // Guarda el rol
        localStorage.setItem('usuario', nombre); // Guarda el rol
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
