import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/search/${searchTerm}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-none border-gray-300 p-4 text-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter book title"
        className="mx-auto p-2 rounded-l-md rounded-r-none focus:outline-none focus:ring focus:border-sky-600 bg-white"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#49E9C1',
          color: 'white',
          borderRadius: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          border: 'none',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        }}
        className="mt-2 p-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:border-sky-600"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p style={{
        fontWeight: 'bold',
        color: 'black',
      }}>{error}</p>}

      {
        searchResult && (
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
        )
      }
    </div >
  );
};

export default SearchBar;
