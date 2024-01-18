import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import Spinner from '../components/spinner'
import BackButton from '../components/BackButton'

function StorePage() {
    //PULLING DATA THROUGH LINK
    const location = useLocation()
    const { from } = location.state


    //PULLING DATA FROM BACKEND
    const [ store, setStore ] = useState([])
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true);
        axios
          .get('http://localhost:3001/books')
          .then((response) => {
            console.log('Data received from backend:', response.data.foundBooks);
            setStore(response.data.foundBooks);
            setLoading(false);
          })
          .catch((error) => {
            console.log('Error fetching data from backend:', error);
            setLoading(false);
          });
      }, []);
    
    return (
        //console.log(from)
        console.log(store)
    )
}

export default StorePage