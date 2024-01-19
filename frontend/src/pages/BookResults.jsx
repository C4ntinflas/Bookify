// frontend/src/pages/ShowBooks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import Navbar from '../components/NavBar';
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
      <div className='flex justify-between items-center mb-8'>
        <Navbar />
        <h1 className='text-3xl my-4 mx-auto'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-sky-800 text-white'>
              <th className='py-2 px-4'>No</th>
              <th className='py-2 px-4'>Title</th>
              <th className='py-2 px-4 hidden md:table-cell'>Genre</th>
              <th className='py-2 px-4 hidden md:table-cell'>Location</th>
              <th className='py-2 px-4'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.book_id} className='text-center'>
                <td className='border py-2 px-4'>{index + 1}</td>
                <td className='border py-2 px-4'>{book.title}</td>
                <td className='border py-2 px-4 hidden md:table-cell'>{book.genre}</td>
                <td className='border py-2 px-4 hidden md:table-cell'>{book.location}</td>
                <td className='border py-2 px-4'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/books/details/${book.book_id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/books/edit/${book.book_id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/books/delete/${book.book_id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
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
