import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBook } from "@fortawesome/free-solid-svg-icons"; // Import the book icon
import { itemContext } from "../context/ItemContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const { itemsInCart } = useContext(itemContext);
    const { logged, logout, role } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    console.log("Current role:", role);  // Debugging log

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleHome = () => {
        if (logged) {
            navigate("/home");
        } else {
            navigate("/login");
        }
    };

    const handleClick = () => {
        if (logged) {
            navigate("/cart");
        } else {
            navigate("/login");
        }
    };

    const handleWantToRead = () => {
        if (logged) {
            navigate("/wanttoread");
        } else {
            navigate("/login");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <div className="header">
            <h1 className="gfg" onClick={handleHome} style={{ textDecoration: 'none', marginLeft: "170px", color: 'inherit' }}>ALL Book Store</h1>
            
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '5px', fontSize: '16px' }}
                />
                <button onClick={handleSearch} style={{ padding: '5px 10px', marginRight: "110px" }}>
                    Search
                </button>
            </div>

            <div className="icons-container" style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '10px', top: '10px' }}>
                <div className="cart-icon" style={{ marginRight: '10px', cursor: 'pointer' }} onClick={handleClick}>
                    <FontAwesomeIcon icon={faCartShopping} size="2x" />
                    {/* <div className="cart-items">{itemsInCart}</div> */}
                </div>
                <div className="book-icon" style={{ cursor: 'pointer' }} onClick={handleWantToRead}>
                    <FontAwesomeIcon icon={faBook} size="2x" />
                </div>
            </div>

            <div className="auth-buttons" style={{ position: "absolute", right: "10px", top: "10px" }}>
                {logged ? (
                    <>
                        {role === "admin" && (
                            <Link to="/addition">
                                <button className="addition-button">Add Book</button>
                            </Link>
                        )}
                        <button className="logout-button" onClick={handleLogout} style={{ marginRight: "10px" }}>Logout</button>
                    </>
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
            </div>
        </div>
    );
};

export default Header;
