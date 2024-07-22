import axios from 'axios';
import React, { useState,useRef } from 'react'
import './Addition.css'; 

const Addition = () => {

    const [title,setTitle]=useState("");
    const [author,setAuthor]=useState("");
    const [genre,setGenre]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState("");
    const fileInputRef = useRef(null); 

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);
        try{
        
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response=await axios.post("http://localhost:4000/api/newbooks",formData,{
            headers: {"Content-Type": "application/json","Authorization": `Bearer ${token}`  },
            withCredentials: true,
         } );
        if (response.status===201){alert('Book added successfully');
            // Optionally clear the form
            setTitle('');
            setAuthor('');
            setGenre('');
            setDescription('');
            setPrice('');
            setImage('');
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the file input value
              } 
        } else {
            alert('Failed to add book');
        }
        }catch(error){
    console.error("error is ",error)
}
    }

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input 
                        type="text" 
                        id="author" 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input 
                        type="text" 
                        id="genre" 
                        value={genre} 
                        onChange={(e) => setGenre(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input 
                        type="number" 
                        id="price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input 
                        type="file" 
                        id="image"  
                        onChange={(e) => setImage(e.target.files[0])} 
                        required 
                        ref={fileInputRef}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {image && <img src={image} alt="Book Preview" style={{ marginTop: "20px", maxWidth: "100%" }} />}
        </div>
    );
};

export default Addition;