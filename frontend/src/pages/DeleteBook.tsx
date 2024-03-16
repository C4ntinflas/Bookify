import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3001/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/books/results');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    window.history.back(); // Navigate back
  };

  return (
    <div className='p-4 text-white'>
      <BackButton />
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col rounded-md bg-[#49E9C1] rounded-x1 w-[600px] p-4 mx-auto'>
        <h3 className='text-2xl text-black'>Are You Sure You want to delete this book?</h3>
        <button
          className='p-4 bg-red-600 text-white mt-8 rounded-md hover:bg-red-700 transition-all'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
