import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './paginas/Login';
import Register from './paginas/Register';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import GestionUsuarios from "./paginas/GestionUsuarios";
import Booklist from "./paginas/Booklist";
import PrivateRoute from "./components/PrivateRoute";
import {Home} from "lucide-react";
import Dashboard from "./paginas/Dashboard";
import Header from "./components/Header";
import RecuperarContrasena from "./paginas/RecuperarContraseña";
import CambiarContrasena from "./paginas/CambiarContraseña";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Header/>
                    <ToastContainer />
                    <Routes>
                        <Route path="/Dashboard" element={<Dashboard/>}/>
                        <Route path="/Home" element={<Home/>}/>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/recuperarContrasena" element={<RecuperarContrasena/>}/>
                        <Route path="/cambiarContraseña" element={<CambiarContrasena/>}/>
                        <Route
                            path="/Libros"
                            element={
                                <PrivateRoute
                                    roles={['Usuario', 'Bibliotecario']}
                                    element={Booklist}
                                />} /> {/*Ruta protegida Booklist para usuarios y bibliotecario*/}
                        <Route
                            path="/GestionUsuarios"
                            element={
                                <PrivateRoute
                                    roles={['Bibliotecario']}
                                    element={GestionUsuarios}
                                />}/>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;