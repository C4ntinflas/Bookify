import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import BookResults from './pages/BookResults'
import EditBooks from './pages/EditBooks'
import DeleteBook from './pages/DeleteBook'
import BookDetails from './pages/BookDetails'
import Stores from './pages/Stores'
import StoreLogIn from './pages/StoreLogIn'
import SearchBar from './components/SearchBar'


const App = () => {
  return (

    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/books/results' element={<BookResults />} />
      <Route path='/books/create' element={<CreateBooks />} />
      <Route path='/books/details/:id' element={<BookDetails />} />
      <Route path='/books/edit/:id' element={<EditBooks />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/stores' element={<Stores />} />
      <Route path='/login' element={<StoreLogIn />} />
     
    </Routes>
      )
}

export default App