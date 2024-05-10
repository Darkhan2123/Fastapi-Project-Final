import React, { createContext, useState, useEffect } from 'react';

// Create the context object with a default value
export const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Listen for changes in the token state and update localStorage accordingly
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const logout = () => {
        setToken(null);  // This will automatically remove the token from localStorage due to the useEffect above
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
