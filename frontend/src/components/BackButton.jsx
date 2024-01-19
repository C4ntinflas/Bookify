import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/books/results' }) => {
  return (
    <div className='flex items-center'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-2 rounded-md flex items-center hover:bg-sky-700 transition-all duration-300'
      >
        <BsArrowLeft className='text-2xl mr-2' />
        <span className='text-lg'>Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
