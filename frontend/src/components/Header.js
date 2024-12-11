import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
//import '../styles/Header.css';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="top-0 left-0 w-full shadow-md z-50">
            <nav className="flex justify-end p-4">
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/Login">
                                <button className="bg-black text-white px-8 py-2 rounded-lg mr-4 border border-white">Sign In</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Register">
                                <button className="bg-black text-white px-8 py-2 rounded-lg border border-white">Register</button>
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    </li>
                )}
            </nav>
        </header>

    );
};

export default Header;
