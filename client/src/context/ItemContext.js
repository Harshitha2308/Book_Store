import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
export const itemContext=createContext();

function CustomItemContext({children}){
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState([]);
    const [itemsInCart,setItemsInCart]=useState(0);
    const [totalPrice,setTotalPrice]=useState(0);
    const [toRead,setToRead]=useState([]);
    const {userId}=useContext(AuthContext)

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
      const transformBookData = (book) => {
        return {
            title: book.name,  // Rename 'name' to 'title'
            author: book.author,
            genre: book.genre,
            description: book.description,
            price: book.price,
            image: book.image
        };
    };
    const addToCart=async (product)=>{
        console.log(product)
        const transformed=transformBookData(product)
        try{
            await axios.put(`http://localhost:4000/api/add-to-cart/${userId}`,{book: transformed},{
                withCredentials: true // to include cookies
            });
            console.log(product)
            setTotalPrice(totalPrice+product.price);
            setCart([...cart,product]);
            setItemsInCart(itemsInCart+1);
        }
        catch(error){
            console.error('Error adding to cart:', error.response ? error.response.data : error.message);
        }
    };

    const wantToRead=(product)=>{
        setToRead([...toRead,product])
    }
    const removeFromCart= async (product)=>{
        const index=cart.findIndex((prdt)=>prdt._id===product._id);
        console.log(index);
        try{

            if (index!==-1){
                const updatedCart=[...cart];
                updatedCart.splice(index,1);
                setTotalPrice(totalPrice-cart[index].price);
                setCart(updatedCart);
                setItemsInCart(itemsInCart-1);
                await axios.delete(`http://localhost:4000/api/remove-cart/${userId}`,{data: { index }, // Include index in the data
                    withCredentials: true
                });
            }
            else{
                console.log("item not found in cart");
            }
        }catch(error){
            console.log(error)
        }
        
    }

    return (
        <itemContext.Provider
            value={{
                products,addToCart,removeFromCart,itemsInCart,totalPrice,cart,wantToRead,toRead
            }}
        >
            {children}

        </itemContext.Provider>
    );
}

// export {itemContext};
export default CustomItemContext