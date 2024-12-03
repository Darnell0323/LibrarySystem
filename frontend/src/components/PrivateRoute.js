import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, role, ...rest }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('rol');

    // Si el usuario no tiene token o el rol no es el correcto, redirige a la página de login
    if (!token || !userRole || !userRole.includes(role)) {
        return <Navigate to="/login" />;
    }

    return <Route {...rest} element={element} />;
};

export default PrivateRoute;
