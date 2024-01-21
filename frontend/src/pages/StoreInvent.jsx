import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../components/spinner';
import Navbar from '../components/NavBar';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

const StoreInvent = () => {
  const location = useLocation();
  const storeId = location.state?.store_id;

  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (storeId) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/books/store/${storeId}`)
        .then((response) => {
          console.log('Data received from backend:', response.data);
          setStore(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching data from backend:', error);
          setLoading(false);
        });
    }
  }, [storeId]);


  return (
    <>
      <Navbar />
      <div className='p-4'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl my-4 mx-auto text-[#36311F]'>Books List</h1>
          <Link to={`/books/create`} className='flex items-center text- hover:text-[#49E9C1] transition-colors'>
            <MdOutlineAddBox className='text-4xl mr-2' />
            Create New Entry
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-[#36311F] text-white'>
                <th className='py-2 px-4'>No</th>
                <th className='py-2 px-4'>Title</th>
                <th className='py-2 px-4'>Genre</th>
                <th className='py-2 px-4'>Location</th>
                <th className='py-2 px-4'>Quantity</th>
                <th className='py-2 px-4'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {store.map((store, index) => (
                <tr key={store.book_id} className='text-center'>
                  <td className='border py-2 px-4'>{index + 1}</td>
                  <td className='border py-2 px-4'>{store.title}</td>
                  <td className='border py-2 px-4 hidden md:table-cell'>{store.genre}</td>
                  <td className='border py-2 px-4 hidden md:table-cell'>{store.location}</td>
                  <td className='border py-2 px-4 hidden md:table-cell'>{store.quantity}</td>
                  <td className='border py-2 px-4'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/books/details/${store.book_id}`}>
                        <BsInfoCircle className='text-2xl text-[#49E9C1]' />
                      </Link>
                      <Link to={`/books/edit/${store.book_id}`}>
                        <AiOutlineEdit className='text-2xl text-[#36311F]' />
                      </Link>
                      <Link to={`/books/delete/${store.book_id}`}>
                        <MdOutlineDelete className='text-2xl text-[#FF0000]' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default StoreInvent;