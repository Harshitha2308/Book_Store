import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';
import './Register.css';  // Make sure to import the CSS file

const Register = () => {
    const [username,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/register", {
                username,
                email,
                password,
                phone
            });
            if (response.status === 201) {
                navigate('/login');
            } else {
                console.error('Failed to register:', response);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register. Please try again.');
        }
    };
    

    return (
        <div className="register-container">
            <h2>Register Page</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={(e)=>setName(e.target.value)}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" onChange={(e)=>setPhone(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <h6 className="login-asking">Already have an account? <Link to="/login">Login</Link>

            </h6>

        </div>
    );
};

export default Register;
