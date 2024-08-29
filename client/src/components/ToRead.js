import React, { useContext } from "react";
import { itemContext } from '../context/ItemContext';
import ProductItem from "./ProductItems";

const ToRead=()=>{
    const {toRead,totalPrice}= useContext(itemContext)
    console.log(toRead);
    return (
        <div className='product-list'>
        <h2 style={{color:"green"}}>Want to Read</h2>
        <ul className='item-card'>
            {toRead.length>0?(toRead.map((product)=>(<ProductItem key={product._id} product={product}/>))):(<p>Your wish to read is empty</p>)}

        </ul>
        {toRead.length > 0 && (
                <button className="buy-now-btn" onClick={() => alert(`Your total is : ${totalPrice} `)} style={{ backgroundColor: "#218838", color: "white", marginRight: "78%", top: "65px", position: "absolute" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#044612"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#218838"}>Buy Now</button>
            )}
    </div>
)
}


export default ToRead;