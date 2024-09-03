import React, { useContext, useEffect, useState } from "react";
import { itemContext } from '../context/ItemContext';
import ProductItem from "./ProductItems";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
const ToRead=()=>{
    const {toRead,totalPrice}= useContext(itemContext)
    // console.log(toRead);
    const {userId}=useContext(AuthContext);
    const [toRead1,setToRead1]=useState([]);
    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                const res=await axios.get(`http://localhost:4000/api/to-read/${userId}`,{
                    withCredentials: true
                })
                setToRead1(res.data.toRead)
            }
            catch (error) {
                console.error('Error fetching "To Read" list:', error);
            }
        }
        if (userId) {
            fetchData(); // Fetch the list only if the user is logged in
        }
    },[userId]);

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