import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CambiarContrasena = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8094/auth/cambiarContrasena", {
                token,
                password,
            });
            setMessage("Contraseña cambiada exitosamente.");
            setTimeout(() => navigate("/login"), 3000); // Redirige al login después de 3 segundos
        } catch (error) {
            setMessage(error.response?.data?.message || "Error al cambiar la contraseña.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-lg max-w-md w-full"
            >
                <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-4"
                    placeholder="Nueva contraseña"
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 w-full mb-4"
                    placeholder="Confirmar nueva contraseña"
                    required
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Cambiar Contraseña
                </button>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </form>
        </div>
    );
};

export default CambiarContrasena;
