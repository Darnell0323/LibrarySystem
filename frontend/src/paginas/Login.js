import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
//import './Login.css';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
import {BASE_URL} from "../config/config";
import {logintoken} from "../services/authService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logintoken(email, password);
            console.log()
            //const response = await axios.post(`${BASE_URL}/usuario/login`, { email, password_hash: password },);
            const nombre = localStorage.getItem('nombre');
            const rol = localStorage.getItem('rol');
            console.log('Login successful:', nombre);
            toast.success('Login successful!');
            login(rol); // Actualiza el estado de autenticación con el rol del usuario
            if (rol === 'Bibliotecario') {
                navigate('/GestionUsuarios');
            } else {
                navigate('/Libros');
            }
            setError('');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your email and password.');
        }

    };

    return (
        <main>
            <section className="w-full h-screen fixed top-0 left-0">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-gray-900"
                    style={{
                        backgroundImage: "url('https://th.bing.com/th/id/R.b2fcb3663d3f2706d0e9bbdef8797dab?rik=xYzs4yt20hH%2f3A&pid=ImgRaw&r=0')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '100vh',  // Ocupa la altura completa de la ventana
                        width: '100vw',   // Ocupa la anchura completa de la ventana
                    }}
                ></div>
                <div className="container mx-auto px-4 h-full flex items-center justify-center">
                    <div className="w-full lg:w-4/12 px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white opacity-80">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-gray-600 text-sm font-bold">Sign in</h6>
                                    {error && <p className="error">{error}</p>}
                                </div>
                                <hr className="mt-6 border-b-1 border-gray-400"/>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={handleSubmit}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="email"
                                        >
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
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="password"
                                        >
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
                                    <div className="text-center mt-6">
                                        <button
                                            type="submit"
                                            className="bg-gray-900 text-white px-6 py-3 rounded shadow hover:shadow-lg w-full text-sm font-bold uppercase"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-1/2">
                                <Link to="/forgot-password" className="text-gray-300">
                                    <small>Forgot password?</small>
                                </Link>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link to="/register" className="text-gray-300">
                                    <small>Create new account</small>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>


    );
};

export default Login;
