import React from 'react';

interface Book {
  title: string;
  author: string;
  genre: string;
  location: string;
  description: string;
  total_quantity: number;
  quantity: number;
  store_id: number;
}

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const renderDetail = (label: string, value: string) => (
    <div className='my-4'>
      <span className='text-xl font-semibold text-[#020300]'>{label}:</span>
      <span className='ml-2'>{value}</span>
    </div>
  );

  return (
    <div className='p-4 text-black min-h-screen'>
      <h1 className='text-3xl my-4 text-center'>Book Details</h1>
      <div className='flex flex-col bg-[#49E9C1] rounded-xl w-full p-4 mx-auto mb-8'>
        {renderDetail('Title', book.title)}
        {renderDetail('Genre', book.genre)}
        {renderDetail('Description', book.description)}
        {renderDetail('Location', book.location)}
        {renderDetail('Quantity', book.quantity.toString())}
      </div>
    </div>
  );
};

export default BookDetails;
