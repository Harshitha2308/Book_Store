import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { itemContext } from '../context/ItemContext';
import "./SearchResults.css"
const SearchResults = () => {
    const [results, setResults] = useState([]);

    const location = useLocation();
    const { addToCart, removeFromCart } = useContext(itemContext);

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchResults = async () => {
          
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
                setResults(response.data.items);
                console.log(response.json)
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
           
        };

        fetchResults();
    }, [query]);


    const handleAddToCart = (book) => {
        const product = {
            id: book.id,
            name: book.volumeInfo.title,
            description: book.volumeInfo.description || '',
            price: 'N/A', // Google Books API doesn't provide price; you might need a different API for that.
            genre: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown',
            author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
        };
        addToCart(product);
    };

    const handleRemoveFromCart = (book) => {
        removeFromCart(book.id);
    };

    return (
        <>
            <h2>Search Results for "{query}"</h2>
            <div className="products-container">
                {results.map(book => (
                    <div className="product-card" key={book.id}>
                        <img
                            className="product-image"
                            src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg'}
                            alt={book.volumeInfo.title}
                            />
                        <div className="product-details">
                            <h3 style={{fontWeight:"700"}}>{book.volumeInfo.title.slice(0,14)}</h3>
                            <p style={{fontWeight:"300"}}>{book.volumeInfo.description ? book.volumeInfo.description.slice(0,7) : 'No description available'}</p>
                            <p style={{fontWeight:"500"}}>{'Price not available'}</p>
                            <p>{book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown Genre'}</p>
                            <p style={{fontWeight:"700",color:"brown"}}>
                                {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                            </p>
                            <button onClick={() => handleAddToCart(book)}>
                                Add to Cart
                            </button>
                            <button onClick={() => handleRemoveFromCart(book)}>-</button>
                        </div>
                    </div>
                ))}
                
                </div>
            
        </>
    );
};

export default SearchResults;
