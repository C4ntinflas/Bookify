import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4 text-black min-h-screen'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col bg-[#49E9C1] rounded-xl w-full p-4 mx-auto mb-8'>
          {renderDetail('Title', book.title)}
          {renderDetail('Genre', book.genre)}
          {renderDetail('Description', book.description)}
          {renderDetail('Location', book.location)}
          {renderDetail('Quantity', book.quantity)}
        </div>
      )}
    </div>
  );
};

// Helper function to render details with improved spacing
const renderDetail = (label, value) => (
  <div className='my-4'>
    <span className='text-xl font-semibold text-[#020300]'>{label}:</span>
    <span className='ml-2'>{value}</span>
  </div>
);

export default BookDetails;