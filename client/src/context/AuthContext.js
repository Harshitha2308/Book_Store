// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [logged, setLogged] = useState(false);
//     const [role, setRole] = useState('');
//     const [userId, setUserId] = useState('');  // Store userId as well
//     const login = ({ userId, role }) => {
//         setRole(role);
//         setUserId(userId);  // Set userId
//         setLogged(true);
//         console.log("User role set to:", role);
//     };
//     const logout = () => {
//         setRole("")
//         setLogged(false)};

//     return (
//         <AuthContext.Provider value={{ logged, role, userId, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');  // Store userId as well

    const login = ({ userId, role }) => {
        setRole(role);
        setUserId(userId);  // Set userId
        setLogged(true);
        console.log("User role set to:", role);
    };

    const logout = () => {
        setRole("");
        setLogged(false);
    };

    return (
        <AuthContext.Provider value={{ logged, role, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
