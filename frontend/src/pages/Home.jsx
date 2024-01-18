import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home

import Navbar from "./navbar"
import Results from "./books/results"
import Home from "./books/"
import Create from "./books/create"
import Details from "./books/details"
import Edit from "./books/edit"
import Delete from "./books/delete"

function App() {
  let Component
  switch (window.location.pathname) {
    case "/":
      Component = Home
      break
    case "/results":
      Component = Results
      break
    case "/create":
        Component = Create
      break
    case "/details":
          Component = Details
      break    
    case "/edit":
        Component = Edit
      break 
    case "/delete":
      Component = Delete
      break 
  }
  return (
  <>
    <Navbar />
    <Component />
  </>
}
