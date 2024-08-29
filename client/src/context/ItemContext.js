import React, { createContext, useEffect, useState } from 'react'

export const itemContext=createContext();

function CustomItemContext({children}){
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState([]);
    const [itemsInCart,setItemsInCart]=useState(0);
    const [totalPrice,setTotalPrice]=useState(0);
    const [toRead,setToRead]=useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:4000/api/books");
            const products = await response.json();
            console.log(products);
            setProducts(products);
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error here (e.g., display an error message to the user)
          }
        };
        fetchData();
      }, []);
    const addToCart=(product)=>{
        setTotalPrice(totalPrice+product.price);
        setCart([...cart,product]);
        setItemsInCart(itemsInCart+1);
    };

    const wantToRead=(product)=>{
        setToRead([...toRead,product])
    }
    const removeFromCart=(product)=>{
        const index=cart.findIndex((prdt)=>prdt._id===product._id);
        console.log(index);

        if (index!==-1){
            const updatedCart=[...cart];
            updatedCart.splice(index,1);
            setTotalPrice(totalPrice-cart[index].price);
            setCart(updatedCart);
            setItemsInCart(itemsInCart-1);

        }
        else{
            console.log("item not found in cart");
        }
    }

    return (
        <itemContext.Provider
            value={{
                products,addToCart,removeFromCart,itemsInCart,totalPrice,cart,wantToRead
            }}
        >
            {children}

        </itemContext.Provider>
    );
}

// export {itemContext};
export default CustomItemContext