/**import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, role, ...rest }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('rol');

    // Si el usuario no tiene token o el rol no es el correcto, redirige a la página de login
    if (!token || !userRole || !userRole.includes(role)) {
        return <Navigate to="/login" />;
    }
    else {
        return <Route {...rest} element={element} />;
    }
};

export default PrivateRoute;*/
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ element: Element, roles }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;//Redirige  a login si no esta autenticado
    }

    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Element />;
};

export default PrivateRoute;
