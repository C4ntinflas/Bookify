import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/search/${searchTerm}`);
      const searchResult = response.data;
      console.log(response.data);
      navigate('/books/results', { state: { searchResult } });
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
    </div>
  );
};

export default SearchBar;