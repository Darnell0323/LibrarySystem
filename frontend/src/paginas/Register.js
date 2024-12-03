import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
//import './Register.css';
import {BASE_URL} from "../config/config";

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/usuario/nuevo`, {
                nombre_usuario: nombre,
                email,
                password_hash: password,
                telefono,
                id_rol: 2,
            });
            console.log('Registration successful:', response.data);
            navigate('/login');
            setError('');
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <main>
            <section className="w-full h-screen">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-gray-900"
                    style={{
                        backgroundImage: "url('https://th.bing.com/th/id/R.b2fcb3663d3f2706d0e9bbdef8797dab?rik=xYzs4yt20hH%2f3A&pid=ImgRaw&r=0')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '100vh',
                        width: '100vw',
                    }}
                ></div>

                <div className="container mx-auto px-4 h-full flex items-center justify-center pt-24">
                    <div className="w-full lg:w-4/12 px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white opacity-80">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-gray-600 text-sm font-bold">Register</h6>
                                </div>
                                <hr className="mt-6 border-b-1 border-gray-400"/>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={handleSubmit}>
                                    {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                               htmlFor="nombre">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                               htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                               htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                               htmlFor="telefono">
                                            Teléfono
                                        </label>
                                        <input
                                            type="text"
                                            id="telefono"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            type="submit"
                                            className="bg-gray-900 text-white px-6 py-3 rounded shadow hover:shadow-lg w-full text-sm font-bold uppercase"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-1/2 text-left">
                                <Link to="/login" className="text-gray-300">
                                    <small>Already have an account? Login</small>
                                </Link>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link to="/forgot-password" className="text-gray-300">
                                    <small>Forgot password?</small>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;
