import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import BookDetails from './BookDetails';

const Home = () => {
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = (result) => {
      setSearchResult(result);
    };


return (
  <div>
  <h1> Book Search </h1>
  <SearchBar onSearch={handleSearch} />
  {searchResult && <BookDetails book={searchResult} />}
  </div>
)
};

export default Home;