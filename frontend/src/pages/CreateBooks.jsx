import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Extract the book_id from the URL params

  // Fetch book data if editing
  useEffect(() => {
    if (id) {
      // Fetch book data based on the id
      axios.get(`http://localhost:3001/books/${id}`)
        .then(response => {
          const book = response.data.book;
          setTitle(book.title);
          setGenre(book.genre);
          setLocation(book.location);
          setDescription(book.description);
        })
        .catch(error => {
          console.error('Error fetching book data:', error);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const bookData = { title, genre, location, description };

    // Check if editing or creating
    const request = id
      ? axios.put(`http://localhost:3001/books/${id}`, bookData)
      : axios.post('http://localhost:3001/books', bookData);

    request
      .then(response => {
        console.log('Book saved successfully:', response.data);
        setLoading(false);
        navigate('/books/results'); // Redirect to books list after saving
      })
      .catch(error => {
        console.error('Error saving book:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <BackButton />
      <h1>{id ? 'Edit Book' : 'Create Book'}</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Your form fields go here */}
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />

          {/* Add other form fields as needed */}
          
          <button type="submit">{id ? 'Update Book' : 'Create Book'}</button>
        </form>
      )}
    </div>
  );
};

export default CreateBooks;
