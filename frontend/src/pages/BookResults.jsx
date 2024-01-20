import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/NavBar';

const BookResults = () => {
    const { state } = useLocation();
    console.log('State:', state);
    const searchResult = state && state.searchResult;

    return (
        <>
            <Navbar />
            <div className='p-4'>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl my-4 mx-auto text-[#36311F] font-semibold'>Book Results</h1>
                </div>
                {searchResult ? (
                    <div className="bg-gray-100 hover:bg-gray-200">
                        <p className='border py-2 px-4'><strong>Title:</strong> {searchResult.book.title}</p>
                        <p className='border py-2 px-4'><strong>Genre:</strong> {searchResult.book.genre}</p>
                        <p className='border py-2 px-4'><strong>Location:</strong> {searchResult.book.location}</p>
                        <p className='border py-2 px-4'><strong>Description:</strong> {searchResult.book.description}</p>
                    </div>
                ) : (
                    <div className="rounded-lg overflow-hidden border border-none border-gray-300 p-4 text-center">
                        <p>No book result found.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default BookResults;
