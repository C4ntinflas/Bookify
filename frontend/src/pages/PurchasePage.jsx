import React from "react"
import { useLocation } from "react-router-dom";


const bookImg = [{
    name: 'The Great Gatsby',
    img: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_hr.jpg'
}, {
    name: 'To Kill a Mockingbird',
    img: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'
}, {
    name: '1984',
    img: 'https://m.media-amazon.com/images/I/7180qjGSgDL._AC_UF1000,1000_QL80_.jpg'
}, {
    name: 'The Catcher in the Rye',
    img: 'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF350,350_QL50_.jpg'
}, {
    name: "Harry Potter and the Sorcerer's Stone",
    img: 'https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF894,1000_QL80_.jpg'
}, {
    name: 'The Hobbit',
    img: 'https://images.penguinrandomhouse.com/cover/9780345445605',
}, {
    name: 'Pride and Prejudice',
    img: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg'
}, {
    name: 'The Hunger Games',
    img: 'https://m.media-amazon.com/images/I/71WSzS6zvCL._AC_UF1000,1000_QL80_.jpg'
}, {
    name: 'The Lord of the Rings',
    img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg'
}, {
    name: 'Brave New World',
    img: 'https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg'
}]

let newImg = null

function setImg(array, book){
    for(let i = 0; i < array.length; i++){
        if(array[i].name === book.title){
            newImg = array[i].img
        }
        else{
            console.log('something went wrong')
        }
    }
}

function PurchasePage() {
    const location = useLocation()
    const { from } = location.state

    const book = from

    setImg(bookImg, book)
    
    return (
        
        <div>
            <div className='container'>
                {console.log(book)}
                <div className='bookContainer'>
                    <div className='bookImg'>
                        <img src={newImg} alt={'Book cover for'+ from.title}/>
                    </div>
                    <div className='bookDetails'>
                        <h1>{from.title}</h1>
                        <hr></hr>
                        <h3>{from.genre}</h3>
                        <h3>Discription</h3>
                        <p>{from.description}</p>
                        <button className="button">Buy Book</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default PurchasePage