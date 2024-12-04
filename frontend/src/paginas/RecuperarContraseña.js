import React, { useState } from 'react';
import axios from 'axios';

const RecuperarContrasena = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8094/auth/recuperarContrasena?email=${email}`);
            setMessage(response.data);
        } catch (error) {
            console.log(error)
            setMessage('Error al enviar el correo');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Recuperar Contraseña</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-4"
                    placeholder="Ingresa tu email"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
                {message && <p className="mt-4 text-green-500">{message}</p>}
            </form>
        </div>
    );
};

export default RecuperarContrasena;
