// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { itemContext } from '../context/ItemContext';
// import "./SearchResults.css";

// const SearchResults = () => {
//     const [results, setResults] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true); // Add loading state

//     const location = useLocation();
//     const { addToCart, removeFromCart } = useContext(itemContext);

//     const query = new URLSearchParams(location.search).get('query');

//     useEffect(() => {
//         if (query) {
//             axios.get(`https://freetestapi.com/api/v1/books?search=${query}`)  // Include search query in API request
//                 .then(response => {
//                     const filteredResults = response.data.filter(book =>
//                         book.title.toLowerCase().includes(query.toLowerCase()) ||
//                         (book.authors && book.authors.some(author => author.toLowerCase().includes(query.toLowerCase())))
//                     );
//                     setResults(filteredResults);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     setError('Failed to fetch data');
//                     setLoading(false);
//                 });
//         } else {
//             setLoading(false);
//         }
//     }, [query]);

//     const handleAddToCart = (book) => {
//         const product = {
//             id: book.volumeId,
//             name: book.title,
//             description: book.description || '',
//             price: 'N/A',
//             genre: book.categories ? book.categories.join(', ') : 'Unknown',
//             author: book.authors ? book.authors.join(', ') : 'Unknown',
//             image: book.thumbnail || '',
//         };
//         addToCart(product);
//     };

//     const handleRemoveFromCart = (book) => {
//         removeFromCart(book.volumeId);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>
//             <h2>Search Results for "{query}"</h2>

//             {error && <div className="error-message">{error}</div>}

//             {results.length === 0 ? (
//                 <div className="no-results-message">No books found</div>  // Display message when no results
//             ) : (
//                 <div className="products-container">
//                     {results.map((book) => {
//                         const price = 299;

//                         return (
//                             <div className="product-card" key={book.volumeId}>
//                                 <img
//                                     className="product-image"
//                                     src={book.cover_image || 'placeholder.jpg'}
//                                     alt={book.title}
//                                 />
//                                 <div className="product-details">
//                                     <h3 style={{ fontWeight: "700" }}>{book.title.slice(0, 14)}</h3>
//                                     <p style={{ fontWeight: "300" }}>{book.description ? book.description.slice(0, 7) : 'No description available'}</p>
//                                     <p style={{ fontWeight: "500" }}>{price}</p>
//                                     <p>{book.categories ? book.categories.join(', ') : 'Unknown Genre'}</p>
//                                     <p style={{ fontWeight: "700", color: "brown" }}>
//                                         {book.authors ? book.authors.join(', ') : 'Unknown Author'}
//                                     </p>
//                                     <button onClick={() => handleAddToCart(book)}>
//                                         Add to Cart
//                                     </button>
//                                     <button onClick={() => handleRemoveFromCart(book)}>-</button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </>
//     );
// };

// export default SearchResults;


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { itemContext } from '../context/ItemContext';
import "./SearchResults.css";

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const { addToCart, removeFromCart } = useContext(itemContext);

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            axios.get(`https://archive.org/advancedsearch.php?q=${query}&output=json`)
                .then(response => {
                    const books = response.data.response?.docs || [];
                    setResults(books);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to fetch data');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [query]);

    const handleAddToCart = (book) => {
        const product = {
            id: book.identifier,
            name: book.title,
            description: book.description || 'No description available',
            price: 'N/A',
            genre: Array.isArray(book.subject) ? book.subject.join(', ') : (book.subject || 'Unknown'),
            author: Array.isArray(book.creator) ? book.creator.join(', ') : (book.creator || 'Unknown'),
            image: `https://archive.org/services/img/${book.identifier}`,
        };
        addToCart(product);
    };

    const handleRemoveFromCart = (book) => {
        removeFromCart(book.identifier);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>Search Results for "{query}"</h2>

            {error && <div className="error-message">{error}</div>}

            {Array.isArray(results) && results.length === 0 ? (
                <div className="no-results-message">No books found</div>
            ) : (
                <div className="products-container">
                    {results.map((book) => {
                        const price = 299;

                        return (
                            <div className="product-card" key={book.identifier}>
                                <img
                                    className="product-image"
                                    src={`https://archive.org/services/img/${book.identifier}`}
                                    alt={book.title}
                                />
                                <div className="product-details">
                                    <h3 style={{ fontWeight: "700" }}>{book.title.slice(0, 14)}</h3>
                                    <p style={{ fontWeight: "300" }}>{book.description ? book.description.slice(0, 7) : 'No description available'}</p>
                                    <p style={{ fontWeight: "500" }}>{price}</p>
                                    <p>{Array.isArray(book.subject) ? book.subject.join(', ') : (book.subject || 'Unknown Genre')}</p>
                                    <p style={{ fontWeight: "700", color: "brown" }}>
                                        {Array.isArray(book.creator) ? book.creator.join(', ') : (book.creator || 'Unknown Author')}
                                    </p>
                                    <button onClick={() => handleAddToCart(book)}>
                                        Add to Cart
                                    </button>
                                    <button onClick={() => handleRemoveFromCart(book)}>-</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default SearchResults;
