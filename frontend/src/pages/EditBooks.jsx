import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [storeName, setStoreName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([
    { store_id: 1, name: 'Book Haven' },
    { store_id: 2, name: 'Readers Paradise' },
    { store_id: 3, name: 'Classic Books Emporium' },
  ]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:3001/books/${id}`)
        .then(response => {
          const book = response.data.book;
          setTitle(book.title);
          setGenre(book.genre);
          setLocation(book.location);
          setDescription(book.description);
          setStoreName(book.store_name);
          setQuantity(book.quantity);
          setTotalQuantity(book.total_quantity);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching book data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleEditBook = (event) => {
    event.preventDefault();
    setLoading(true);

    // Find the selected store
    const selectedStore = stores.find((store) => store.name === storeName);

    if (!selectedStore) {
      console.error('Selected store not found');
      setLoading(false);
      return;
    }

    const bookData = {
      title,
      genre,
      location,
      description,
      store_id: selectedStore.store_id,
      quantity,
      total_quantity: totalQuantity
    };

    axios.put(`http://localhost:3001/books/${id}`, bookData)
      .then(response => {
        console.log('Book edited successfully:', response.data);
        setLoading(false);
        navigate('/books/results');
      })
      .catch(error => {
        console.error('Error editing book:', error);
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='m-4'>
          <label className='text-xl mr-4 text-grey-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />
        </div>
        <div className='m-4'>
          <label className='text-xl mr-4 text-grey-500'>Genre</label>
          <input
            type='text'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />
        </div>
        <div className='m-4'>
          <label className='text-xl mr-4 text-grey-500'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />
        </div>
        <div className='m-4'>
          <label className='text-xl mr-4 text-grey-500'>Location</label>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />
        </div>
        <div className='m-4'>
          <label className='text-xl mr-4 text-grey-500'>Store</label>
          <select
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          >
            <option value=''>Select a store</option>
            {stores.map((store) => (
              <option key={store.store_id} value={store.name}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
        <div className='m-4'>
          <label className='text-xl mr-4 text-grey-500'>Quantity</label>
          <input
            type='text'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />
        </div>
        <div className='m-4'>
          <label className='text-xl mr-4 text-grey-500'>Total Quantity</label>
          <input
            type='text'
            value={totalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
