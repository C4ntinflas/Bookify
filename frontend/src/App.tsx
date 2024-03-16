import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';

const App: React.FC = () => {
  const [bookDetails, setBookDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/books');
        if (response.ok) {
          const data = await response.json();
          setBookDetails(data);
        } else {
          throw new Error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {bookDetails.map((book: any) => (
        <Route
          key={book.id}
          path={`/books/details/${book.id}`}
          element={<BookDetails book={book} />}
        />
      ))}
    </Routes>
  );
};

export default App;
