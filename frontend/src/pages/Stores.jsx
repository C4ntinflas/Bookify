import React, { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import { BsArrowLeft } from 'react-icons/bs';

let newImg = null
let myStore = null

function setImg(array, store){
    for(let i = 0; i < array.length; i++){
        if(array[i].name === store){
            return array[i].img
        }
        else{
        }
    }
}

const storeImg = [{
    name: 'Book Haven',
    img: 'https://static01.nyt.com/images/2022/06/09/books/01bookdiscovery-image1/merlin_173581947_afa0a845-27bc-476c-8d77-47527372191b-articleLarge.jpg?quality=75&auto=webp&disable=upscale'
}, {
    name: 'Readers Paradise',
    img: 'https://grovearcade.com/wp-content/uploads/2019/04/battery-120_656f4ebf-5056-a36a-0ab47b8b87a008d8.jpg'
}, {
    name: 'Classic Books Emporium',
    img: 'https://www.southernliving.com/thmb/tFGLLOmdcxJSBQufcR2HcA9cWAM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2-BooksandBooks-1-PhotocourtesyofBooksandBooks-6404cacbb2904f16a4aa6ade98cd4ba2.jpg'
}]



function Stores() {
    const [ storesData, setStoresData ] = useState([])
    const [ loading, setLoading ] = useState(false)
    console.log(storesData)

    setImg(storeImg, myStore)
    
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3001/stores`)
            .then((response) => {
                console.log('Data from server:', response.data.foundStores);
                setStoresData(response.data.foundStores);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching data', error);
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
            <div className='p-4 text-black min-h-screen'>
                <h1 className='text-3xl my-4 text-center'>Book Stores</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className='flex flex-wrap justify-center'>
                        {storesData.map((store, index) => (
                            <div key={index} className='m-2 rounded-xl p-4'>
                                <Link to={`${store.store_id}`} state={{ from: store }} className='text-[#020300]'>
                                    <div>
                                        <div>
                                            {/* {myStore = store.store_name} */}
                                            <img className='storeImg' src={setImg(storeImg, (store.store_name) )} alt='image of the store'/>
                                        </div>
                                        <div className='bg-[#49E9C1]'>
                                            <div className=''>
                                                {/* <span className='text-xl font-semibold'>Store Name: </span> */}
                                                <p className='text-center text-xl underline'>{store.store_name}</p>
                                            </div>
                                            <div>
                                                {/* <span className='text-xl font-semibold'>Store Address: </span> */}
                                                <p className='text-center text-sm'>{store.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Stores;
