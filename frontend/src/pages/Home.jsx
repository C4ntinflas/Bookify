import React, {useEffect, useState } from 'react';
import axios from 'axios';
import spinner from '../components/spinner';
import { Link } from 'react-icons/ai';
import { BsInfpCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
    .get('http://localhost:5173/books')
    .then((response) => {
    setBooks(response.data.data);
    setLoading(false);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
  });
}, []);  
  return (
    <div>Home</div>
  )
}

export default Home