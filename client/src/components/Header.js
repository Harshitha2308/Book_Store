import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { itemContext } from "../context/ItemContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const { itemsInCart } = useContext(itemContext);
    const { logged, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    const handleclick=()=>{
        navigate("/cart");
    }
    return (
        <div className="header">
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1 className="gfg">ALL Book Store</h1>
            </Link>

            <div className="cart-num" style={{ position: 'absolute', left: '10px', top: '10px' }}>
                <div className="cart-items" onClick={handleclick}>{itemsInCart}</div>
                <FontAwesomeIcon icon={faCartShopping} size="4x" onClick={handleclick} />
            </div>

            <div className="auth-buttons" style={{ position: "absolute", right: "10px", top: "10px" }}>
                {logged ? (
                    <button className="logout-button" onClick={handleLogout} style={{ marginRight: "10px" }}>Logout</button>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="login-button" style={{ marginRight: "10px" }}>Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="register-button" style={{ marginRight: "10px" }}>Register</button>
                        </Link>
                    </>
                )}
                <Link to="/addition">
                    <button className="addition-button">Add Book</button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
