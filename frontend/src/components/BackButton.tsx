import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton: React.FC<{ destination?: string }> = ({ destination = '/books/results' }) => {

  const handleBack = () => {
    history.back();
  };

  return (
    <div className='p-6 flex items-center'>
      <Link
        to={destination}
        onClick={handleBack}
        className='bg-[#36311F] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#36311F] transition-all duration-300'
      >
        <BsArrowLeft className='text-2xl mr-2' />
        <span className='text-lg'>Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
