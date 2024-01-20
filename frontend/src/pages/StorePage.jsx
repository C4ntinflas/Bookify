import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import Spinner from '../components/spinner'
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";


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
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      <div>

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
                    <Link to='purchase' state={{ from: store }}>
                      <button type="button" class="btn btn-primary">Purchase</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StorePage