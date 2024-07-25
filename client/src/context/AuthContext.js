import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [role ,setRole]=useState('');
    const login = (user) => {
        setRole(user)
        setLogged(true)};
    const logout = () => {
        setRole("")
        setLogged(false)};

    return (
        <AuthContext.Provider value={{ logged,role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
