// DEPENDENCIES
const express = require('express');
const axios = require('axios');
const cors = require('cors');


// CONFIGURATION / MIDDLEWARE
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ROOT
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Bookify App'
  });
});

// CONTROLLERS
const storesController = require('./Controllers/store_controller');
app.use('/stores', storesController);

const booksController = require('./Controllers/book');
app.use('/books', booksController);

const usersController = require('./Controllers/user_controller')
app.use('/users', usersController)

// Backend Endpoint GET Request
const backendEndpoint = 'http://localhost:5173/';

app.get('/fetchData', cors(), (req, res) => {
  // Make a GET request to the backend
  axios.get(backendEndpoint)
    .then(response => {
      // Handle the response data
      res.json({
        dataFromBackend: response.data,
        message: 'Data fetched successfully'
      });
    })
    .catch(error => {
      // Handle errors
      res.status(500).json({
        error: 'Error fetching data from the backend',
        details: error.message
      });
    });
});

// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server live on port: ${process.env.PORT}`);
});
