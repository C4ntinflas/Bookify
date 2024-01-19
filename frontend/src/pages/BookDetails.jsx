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
        console.log('Data from server:', response.data);
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
          <div className='m-4'>
            <label className='text-xl mr-4 text-grey-500'>Title</label>
            <span>{book.title}</span>
          </div>
          <div className='m-4'>
            <label className='text-xl mr-4 text-grey-500'>Genre</label>
            <span>{book.genre}</span>
          </div>
          <div className='m-4'>
            <label className='text-xl mr-4 text-grey-500'>Description</label>
            <span>{book.description}</span>
          </div>
          <div className='m-4'>
            <label className='text-xl mr-4 text-grey-500'>Location</label>
            <span>{book.location}</span>
          </div>
          <div className='m-4'>
            <label className='text-xl mr-4 text-grey-500'>Store</label>
            <span>{book.store_id}</span>
          </div>
          <div className='m-4'>
            <label className='text-xl mr-4 text-grey-500'>Quantity</label>
            <span>{book.quantity}</span>
          </div>
          <div className='m-4'>
            <label className='text-xl mr-4 text-grey-500'>Total Quantity</label>
            <span>{book.total_quantity}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
