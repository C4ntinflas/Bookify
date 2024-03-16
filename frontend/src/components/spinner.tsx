import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='animate-ping w-8 h-8 mr-2 rounded-full bg-sky-800'></div>
      <span className='text-sky-800'>Loading...</span>
    </div>
  );
};

export default Spinner;

