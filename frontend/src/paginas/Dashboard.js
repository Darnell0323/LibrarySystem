import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
