import React, { useContext } from 'react'
import { itemContext } from '../context/ItemContext';
import ProductItem from './ProductItems';
const Cart = () => {
    const {cart,totalPrice}=useContext(itemContext);

  return (
    <div className='product-list'>
        <h2 style={{color:"green"}}>Cart</h2>
        <ul className='item-card'>
            {cart.length>0?(cart.map((product)=>(<ProductItem key={product._id} product={product}/>))):(<p>Your cart is empty</p>)}

        </ul>
        {cart.length > 0 && (
                <button className="buy-now-btn" onClick={() => alert(`Your total is : ${totalPrice} `)} style={{ backgroundColor: "#218838", color: "white", marginRight: "78%", top: "65px", position: "absolute" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#044612"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#218838"}>Buy Now</button>
            )}
    </div>
  )
}

export default Cart;