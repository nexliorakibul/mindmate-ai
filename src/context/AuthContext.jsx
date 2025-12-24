import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for mock session
        const storedUser = localStorage.getItem('mindmate_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const mockUser = { id: 1, name: 'Demo User', email };
                    setUser(mockUser);
                    setIsAuthenticated(true);
                    localStorage.setItem('mindmate_user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject('Invalid credentials');
                }
            }, 1000); // Simulate API latency
        });
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('mindmate_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
