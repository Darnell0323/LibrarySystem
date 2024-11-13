import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './paginas/Login';
import Register from './paginas/Register';
import Dashboard from './paginas/Dashboard';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import GestionUsuarios from "./paginas/GestionUsuarios";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <ToastContainer />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/gestionUsuarios"
                            element={
                            <ProtectedRoute>
                                <GestionUsuarios/>
                            </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;