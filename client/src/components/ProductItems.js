import React, { useContext } from "react";
import { itemContext } from "../context/ItemContext";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


const ProductItem=({product})=>{
    const {addToCart,removeFromCart,wantToRead}=useContext(itemContext);
    const handleAddToCart=(product)=>{
        console.log(product);
        addToCart(product);
    };

    const handleRemoveToCart=(product)=>{
        console.log("product removed",product);
        removeFromCart(product);
    };
    const handleToRead=(product)=>{
        console.log("wanted to read",product)
        wantToRead(product)
    }

    return(
        <div className="product-card">
            <img
            className="product-image"
            src={product.image}
            alt={product.name}
            />
            <div className="product-details">
                <h3 style={{fontWeight:"700"}}>{product.name}</h3>
                <p style={{fontWeight:"300"}}>{product.description.slice(0,15)}</p>
                <p style={{fontWeight:"500"}}>{product.price}</p>
                <p>{product.genre}</p>
                <p style={{fontWeight:"700",color:"brown"}}>
                    {product.author}
                </p>
                <button onClick={()=> handleToRead(product)}>
                    Want to Read
                </button>
                <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                </button>
 
                <button onClick={() => handleRemoveToCart(product)}>-</button>
            </div>
        </div>
    )
}

export default ProductItem;