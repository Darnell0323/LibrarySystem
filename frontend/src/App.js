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

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <ToastContainer />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute path="/books" role="Usuario" element={Booklist} />} />
                        <Route path="/books/:id" element={<PrivateRoute path="/books" role="Bibliotecario" element={GestionUsuarios} />} />
                        {/*<Route
                            path="/books"
                            element={
                                <ProtectedRoute>
                                    <Booklist/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/gestionUsuarios"
                            element={
                                <GestionUsuarios/>
                            }
                        />*/}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;