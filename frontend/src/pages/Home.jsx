import React, { useState } from 'react';
import SearchBarHome from '../components/SearchBar';
import BookDetails from './BookDetails';
import NavbarHome from '../components/NavbarHome';


const Home = () => {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (result) => {
    setSearchResult(result);
  };

  return (
    <>
      <NavbarHome />
      <div
        style={{
          backgroundImage: "url('/Bookifybg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ color: '#49E9C1', fontSize: '10em', fontWeight: 'bold', marginBottom: '20px' }}>Bookify</h1>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
            <SearchBarHome onSearch={handleSearch} />
          </div>
          {searchResult && <BookDetails book={searchResult} />}
        </div>
      </div>
    </>
  );
};

export default Home;
