import React, { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';
import { Link } from "react-router-dom";

function Stores() {
    const [storesData, setStoresData] = useState([])
    const [loading, setLoading] = useState(false)

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

    return (
        <div>
            <BackButton />
            <div className='p-4 text-black min-h-screen'>
                <h1 className='text-3xl my-4 text-center'>Book Stores</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className='flex flex-wrap justify-center'>
                        {storesData.map((store, index) => (
                            <div key={index} className='m-2 bg-[#49E9C1] rounded-xl p-4'>
                                <Link to={`${store.store_id}`} state={{ from: store }} className='text-[#020300]'>
                                    <div>
                                        <div className='my-2'>
                                            <span className='text-xl font-semibold'>Store Name:</span>
                                            <span>{store.store_name}</span>
                                        </div>
                                        <div>
                                            <span className='text-xl font-semibold'>Store Address:</span>
                                            <span>{store.address}</span>
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
