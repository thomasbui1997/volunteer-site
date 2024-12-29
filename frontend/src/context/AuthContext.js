import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('jwt_token') || null,
        isAuthenticated: !!localStorage.getItem('jwt_token'),
        loading: false,
    });

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            setAuth({
                token: token,
                isAuthenticated: true,
                loading: false,
            });
        } else {
            setAuth({
                token: null,
                isAuthenticated: false,
                loading: false,
            });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('jwt_token', token);
        setAuth({
            token: token,
            isAuthenticated: true,
            loading: false,
        });
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setAuth({
            token: null,
            isAuthenticated: false,
            loading: false,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
