import React, { useState } from 'react';
import axios from 'axios';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);


  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/search/${searchTerm}`);

      setSearchResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      console.log('Response:', error.response); // Log the response for debugging
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter book title"
      />
      <button onClick={handleSearch}>Search</button>

      {searchResult && (
  <div>
    <h3>Search Result</h3>
    <div>
      <p><strong>Book ID:</strong> {searchResult.book.book_id}</p>
      <p><strong>Title:</strong> {searchResult.book.title}</p>
      <p><strong>Genre:</strong> {searchResult.book.genre}</p>
      
      <h4>Store Quantities</h4>
      {searchResult.store_quantities.map((store, index) => (
        <div key={index}>
          <p><strong>Store ID:</strong> {store.store_id}</p>
          <p><strong>Quantity:</strong> {store.quantity}</p>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
};

export default SearchBar;