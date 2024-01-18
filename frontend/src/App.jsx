import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import BookResults from './pages/BookResults'
import EditBooks from './pages/EditBooks'
import DeleteBooks from './pages/DeleteBooks'
import BookDetails from './pages/BookDetails'
import Stores from './pages/Stores'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/results' element={<BookResults />} />
      <Route path='/books/create' element={<CreateBooks />} />
      <Route path='/books/details/:id' element={<BookDetails />} />
      <Route path='/books/edit/:id' element={<EditBooks />} />
      <Route path='/books/delete/:id' element={<DeleteBooks />} />
      <Route path='/stores' element={<Stores />} />
    </Routes>
  )
}

export default App