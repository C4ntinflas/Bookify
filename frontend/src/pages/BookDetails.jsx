import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Navbar from '../components/Navbar';

let newImg = null
let setPrice = null
let myBook = null

function setImg(array, book){
  for(let i = 0; i < array.length; i++){
      if(array[i].name === book.title){
          newImg = array[i].img
          setPrice = array[i].price
          
      }
      else{
      }
  }
}

const bookImg = [{
  name: 'The Great Gatsby',
  img: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_hr.jpg',
}, {
  name: 'To Kill a Mockingbird',
  img: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
}, {
  name: '1984',
  img: 'https://m.media-amazon.com/images/I/7180qjGSgDL._AC_UF1000,1000_QL80_.jpg',
}, {
  name: 'The Catcher in the Rye',
  img: 'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF350,350_QL50_.jpg',
}, {
  name: "Harry Potter and the Sorcerer's Stone",
  img: 'https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF894,1000_QL80_.jpg',
}, {
  name: 'The Hobbit',
  img: 'https://images.penguinrandomhouse.com/cover/9780345445605',
}, {
  name: 'Pride and Prejudice',
  img: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
}, {
  name: 'The Hunger Games',
  img: 'https://m.media-amazon.com/images/I/71WSzS6zvCL._AC_UF1000,1000_QL80_.jpg',
}, {
  name: 'The Lord of the Rings',
  img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg',
}, {
  name: 'Brave New World',
  img: 'https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg',
}]



const BookDetails = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        console.log(response.data.book)
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  const BackButton = () => {
    history.back()
  };

  setImg(bookImg, book)

  return (
    <div>
      <Navbar />
      <div className='p-4 text-black min-h-screen'>
        <button type="button" onClick={BackButton}
          className='bg-[#36311F] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#36311F] transition-all duration-300 text-lg text-2xl mr-2'
          ><BsArrowLeft className='text-2xl mr-2' />Back</button>
        <h1 className='text-3xl my-2 text-center'>Book Details</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className='mx-auto mb-8'>
            <img src={newImg} alt={'Book cover for'+ book.title}/>
            </div>
            <div className='flex flex-col bg-[#49E9C1] rounded-xl w-full p-4 mx-auto mb-8'>
              {renderDetail('Title', book.title)}
              {renderDetail('Genre', book.genre)}
              {renderDetail('Description', book.description)}
              {renderDetail('Location', book.location)}
              {renderDetail('Quantity', book.quantity)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to render details with improved spacing
const renderDetail = (label, value) => (
  <div className='my-4'>
    <span className='text-xl font-semibold text-[#020300]'>{label}:</span>
    <span className='ml-2'>{value}</span>
  </div>
);

export default BookDetails;