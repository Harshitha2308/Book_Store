import React, { useContext, useEffect, useState } from "react";
import { itemContext } from "../context/ItemContext";
import ProductItem from "./ProductItems";

const ProductList=()=>{
    const {products,totalPrice}=useContext(itemContext)
    const [sortedProducts,setSortedProducts]=useState([...products]);
    const [minPrice,setMinPrice]=useState(0);
    const [maxPrice,setMaxPrice]=useState(3000);
    const [selectedType,setSelectedType]=useState("all");


    useEffect(()=>{
        setSortedProducts([...products]);
    },[products]);

    const handleSortByPrice=()=>{
        const sorted=[...sortedProducts].sort((a,b)=>a.price-b.price);
        setSortedProducts(sorted);
    };

    const handleFilterByPriceRange=()=>{
        const filtered = products.filter((product)=>product.price>=minPrice&&product.price<=maxPrice);
        setSortedProducts(filtered);
    };

    const handleFilterByType=()=>{
        if(selectedType==="all"){
            setSortedProducts([...products]);
        }
        else{
            const filtered=products.filter((product)=>product.genre===selectedType);
            setSortedProducts(filtered);
        }
    };

    return(
        <div className="prdt-list">
         <h2 style={{ color: "green" }}>Book List</h2>
            <div className="filter-btn">
                <button onClick={handleSortByPrice}>Sort by Price</button>
                <label>
                    Min Price:
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                </label>
                <label>
                    Max Price:
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </label>
                <button onClick={() => handleFilterByPriceRange()}>
                    Filter by Price Range
                </button>
                <label>
                    Filter by Type:
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="fantacy">Fantacy</option>
                        <option value="Devotional">Devotional</option>
                        {/* Add more options as needed */}
                    </select>
                </label>
 
                <button onClick={handleFilterByType}>Filter by Type</button>
            </div>
 
            <ul className="item-card">
                {sortedProducts.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </ul>
            <button className="buy-now-btn" onClick={()=>alert(`Your total is : ${totalPrice} `)} style={{backgroundColor: "#218838",color:"white",marginRight:"78%",top:"65px",position:"absolute"}} onMouseEnter={(e) => e.target.style.backgroundColor = "#044612"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#218838"}>Buy Now</button>
            </div>
        
    );
};
export default ProductList;