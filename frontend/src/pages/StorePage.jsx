import React from "react"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import Spinner from '../components/spinner'
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { BsArrowLeft } from 'react-icons/bs'

function StorePage() {

  //PULLING DATA THROUGH LINK
  const location = useLocation()
  const { from } = location.state

  const storeId = from.store_id


  //PULLING DATA FROM BACKEND
  const [store, setStore] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookify-backend.onrender.com/books/store/${storeId}`)
      .then((response) => {
        console.log('Data received from backend:', response.data);
        setStore(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data from backend:', error);
        setLoading(false);
      });
  }, []);

  const BackButton = () => {
    history.back()
  };

  return (
    <div>
      <Navbar />
      <div className='p-6 flex items-center'>
        <button type="button" onClick={BackButton}
          className='bg-[#36311F] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#36311F] transition-all duration-300 text-lg text-2xl mr-2'
        ><BsArrowLeft className='text-2xl mr-2' />Back</button>
      </div>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl mx-auto'>{ }</h1>
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
              <th className='py-2 px-4 hidden md:table-cell'>Quantity</th>
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
                    <Link to={`${store.book_id}`} state={{ from: store }}>
                      <div className='p-6 flex items-center'>
                        <button type="button"
                          className='bg-[#49E9C1] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#252422] transition-all duration-300 text-lg text-2xl mr-2'
                        >Book Details</button>
                      </div>
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
}

export default StorePage