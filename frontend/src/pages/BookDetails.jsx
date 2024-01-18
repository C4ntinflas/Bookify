import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const BookDetails = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        console.log('Data from server:', response.data)
        setBook(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Error fetching data:', error)
        setLoading(false)
      })
  }, [id])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-fgray-500'>Id</span>
            <span>{book.book_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-fgray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-fgray-500'>Genre</span>
            <span>{book.genre}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-fgray-500'>Location</span>
            <span>{book.location}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-fgray-500'>Description</span>
            <span>{book.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-fgray-500'>Store ID</span>
            <span>{book.store_id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-fgray-500'>Quantity</span>
            <span>{book.quantity}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-fgray-500'>Total Quantity</span>
            <span>{book.total_quantity}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookDetails