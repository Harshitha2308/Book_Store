// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { itemContext } from '../context/ItemContext';
// import "./SearchResults.css";

// const SearchResults = () => {
//     const [results, setResults] = useState([]);
//     const [error, setError] = useState('');  // Add error state

//     const location = useLocation();
//     const { addToCart, removeFromCart } = useContext(itemContext);

//     const query = new URLSearchParams(location.search).get('query');

//     useEffect(() => {
//         const fetchResults = async () => {
//             const data = new FormData();
//             data.append('query', query); // Add the search query to the FormData

//             const options = {
//                 method: 'POST',
//                 url: 'https://googlebooksraygorodskijv1.p.rapidapi.com/getVolumeBySearchQuery',
//                 headers: {
//                     'x-rapidapi-key': 'YOUR_API_KEY',
//                     'x-rapidapi-host': 'GoogleBooksraygorodskijV1.p.rapidapi.com',
//                 },
//                 data: data,
//             };

//             try {
//                 const response = await axios.request(options);
//                 if (response.status !== 200) {
//                     throw new Error(`Error: ${response.statusText}`);
//                 }
//                 setResults(response.data.items || []);
//             } catch (error) {
//                 console.error('Error fetching search results:', error.message);
//                 setError('An error occurred while fetching data. Please try again later.'); // Set error message
//             }
//         };

//         fetchResults();
//     }, [query]);

//     const handleAddToCart = (book) => {
//         const product = {
//             id: book.volumeId,
//             name: book.title,
//             description: book.description || '',
//             price: 'N/A', // Assuming the API doesn't provide price details
//             genre: book.categories ? book.categories.join(', ') : 'Unknown',
//             author: book.authors ? book.authors.join(', ') : 'Unknown',
//             image: book.thumbnail || '',
//         };
//         addToCart(product);
//     };

//     const handleRemoveFromCart = (book) => {
//         removeFromCart(book.volumeId);
//     };

//     return (
//         <>
//             <h2>Search Results for "{query}"</h2>

//             {error && <div className="error-message">{error}</div>} {/* Display error message */}

//             <div className="products-container">
//                 {results.map((book) => {
//                     const price = 299; // Default price

//                     return (
//                         <div className="product-card" key={book.volumeId}>
//                             <img
//                                 className="product-image"
//                                 src={book.thumbnail || 'placeholder.jpg'}
//                                 alt={book.title}
//                             />
//                             <div className="product-details">
//                                 <h3 style={{ fontWeight: "700" }}>{book.title.slice(0, 14)}</h3>
//                                 <p style={{ fontWeight: "300" }}>{book.description ? book.description.slice(0, 7) : 'No description available'}</p>
//                                 <p style={{ fontWeight: "500" }}>{price}</p>
//                                 <p>{book.categories ? book.categories.join(', ') : 'Unknown Genre'}</p>
//                                 <p style={{ fontWeight: "700", color: "brown" }}>
//                                     {book.authors ? book.authors.join(', ') : 'Unknown Author'}
//                                 </p>
//                                 <button onClick={() => handleAddToCart(book)}>
//                                     Add to Cart
//                                 </button>
//                                 <button onClick={() => handleRemoveFromCart(book)}>-</button>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </>
//     );
// };

// export default SearchResults;
