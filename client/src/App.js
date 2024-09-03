import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Addition from './components/Addition';
import './App.css';
import SearchResults from './components/SearchResults';
import CustomItemContext from './context/ItemContext';
import AuthProvider from './context/AuthContext';
import Cart from "./components/Cart";
import ToRead from './components/ToRead';


const App = () => {
    return (
            <AuthProvider>
        <CustomItemContext>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/addition" element={<Addition />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/wanttoread" element={<ToRead />} />
                        <Route path="/search" element={<SearchResults />} />
                    </Routes>
                </Router>
        </CustomItemContext>
            </AuthProvider>
    );
};


export default App;
