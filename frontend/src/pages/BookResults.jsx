// frontend/src/pages/ShowBooks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

const BookResults = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3001/books')
      .then((response) => {
        console.log('Data received from backend:', response.data.foundBooks);
        setBooks(response.data.foundBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data from backend:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4x1' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-m:hidden'>
                Genre
              </th>
              <th className='border border-slate-600 rounded-md max-m:hidden'>
                Location
              </th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.book_id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {book.title}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.genre}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.location}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/books/details/${book.book_id}`}>
                      <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                    <Link to={`/books/edit/${book.book_id}`}>
                      <AiOutlineEdit className='text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`/books/delete/${book.book_id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookResults;
