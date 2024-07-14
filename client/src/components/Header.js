// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { itemContext } from "../context/ItemContext";

// const Header = () => {
//     const { itemsInCart, totalPrice } = useContext(itemContext);

//     return (
//         <div className="header">
//             <h1 className="gfg">ALL Book Store</h1>
//             <h3 style={{ color: "green" }}>Total Price: {totalPrice}</h3>

//             <div className="cart-num">
//                 <div className="cart-items">{itemsInCart}</div>
//                 <FontAwesomeIcon icon={faCartShopping} size="4x" />
//             </div>

//             <div className="auth-buttons" style={{ position: "absolute", right: "10px", top: "10px" }}>
//                 <Link to="/login">
//                     <button className="login-button" style={{ marginRight: "10px" }}>Login</button>
//                 </Link>
//                 <Link to="/register">
//                     <button className="register-button">Register</button>
//                 </Link>
//             </div>
//             <div className="add-book-button" style={{ position: "absolute", right: "10px", bottom: "10px" }}>
//                 <Link to="/addition">
//                     <button className="addition-button">Add Book</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default Header;
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

    return (
        <div className="header">
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1 className="gfg">ALL Book Store</h1>
            </Link>

            <div className="cart-num" style={{ position: 'absolute', left: '10px', top: '10px' }}>
                <div className="cart-items">{itemsInCart}</div>
                <FontAwesomeIcon icon={faCartShopping} size="4x" />
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
