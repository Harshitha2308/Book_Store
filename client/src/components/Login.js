import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:4000/api/login", { username, password }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (response.status === 200) {
                login();
                navigate("/home");
            } else {
                alert("Invalid credentials");
                setUsername("");
                setPassword("");
            }
        } catch (error) {
            console.error("Error in logging in", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <h2>Login Page</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
