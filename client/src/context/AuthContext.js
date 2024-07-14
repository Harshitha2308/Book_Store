import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);

    const login = () => setLogged(true);
    const logout = () => setLogged(false);

    return (
        <AuthContext.Provider value={{ logged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
