import React from "react"
import { useLocation } from "react-router-dom";
import axios from 'axios'
import Navbar from "../components/Navbar";
import { BsArrowLeft } from 'react-icons/bs';




let newImg = null
let setPrice = null
let book = null


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
    price: '$11.99'
}, {
    name: 'To Kill a Mockingbird',
    img: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
    price: '$13.99'
}, {
    name: '1984',
    img: 'https://m.media-amazon.com/images/I/7180qjGSgDL._AC_UF1000,1000_QL80_.jpg',
    price: '$9.99'
}, {
    name: 'The Catcher in the Rye',
    img: 'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF350,350_QL50_.jpg',
    price: '$8.99'
}, {
    name: "Harry Potter and the Sorcerer's Stone",
    img: 'https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF894,1000_QL80_.jpg',
    price: '$15.99'
}, {
    name: 'The Hobbit',
    img: 'https://images.penguinrandomhouse.com/cover/9780345445605',
    price: '$14.99'
}, {
    name: 'Pride and Prejudice',
    img: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
    price: '$7.99'
}, {
    name: 'The Hunger Games',
    img: 'https://m.media-amazon.com/images/I/71WSzS6zvCL._AC_UF1000,1000_QL80_.jpg',
    price: '$13.99'
}, {
    name: 'The Lord of the Rings',
    img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg',
    price: '$11.99'
}, {
    name: 'Brave New World',
    img: 'https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg',
    price: '$9.99'
}]



function PurchasePage() {
    const location = useLocation()
    const { from } = location.state

    book = from

    console.log(book)
    setImg(bookImg, book)

    function handlePurchase(event){
        console.log('book inv', book.quantity)
        if(book.quantity > 0){
            event.preventDefault()
            book.quantity = book.quantity - 1
            
            axios.put(`http://localhost:3001/books/book/${book.book_id}`, book)
                .then(response => {
                    console.log('Quantity was successfully updated', response.data);
                    history.back()
                    
                })
                .catch(error => {
                    console.error('Error updating quantity:', error);
                    // Handle error and provide user feedback if necessary
                })
        } else {
            alert("This book is currently sold out");
        } 
        history.back()    
    }

    

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
            <div className='containerMain'>
                <div className='bookContainer'>
                    <div className='bookImg'>
                        <img src={newImg} alt={'Book cover for'+ from.title}/>
                    </div>
                    <div className='bookDetails'>
                        <h1 className="bookTitle">{from.title}</h1>
                        <hr></hr>
                        <h3 className="bookGenre">{from.genre}</h3>
                        <h3 className="bookGenre">Discription</h3>
                        <p className="description">{from.description}</p>
                        <p className="price">{setPrice}</p>
                        <button className="button" onClick={handlePurchase}>Buy Book</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchasePage