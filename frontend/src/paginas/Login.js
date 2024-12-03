import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
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
            //const response = await axios.post(`${BASE_URL}/usuario/login`, { email, password_hash: password },);
            const nombre = localStorage.getItem('nombre');
            const rol = localStorage.getItem('rol');
            console.log('Login successful:', nombre);
            toast.success('Login successful!');
            login(rol); // Actualiza el estado de autenticación con el rol del usuario
            if (rol === 'Bibliotecario') {
                navigate('/gestionUsuarios');
            } else {
                navigate('/Booklist');
            }
            setError('');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your email and password.');
        }

    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <p className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
