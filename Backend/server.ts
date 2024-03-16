import express, { Application, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import cors from 'cors';
import storesController from './Controllers/store_controller';
import booksController from './Controllers/book';
import searchController from './Controllers/search';
import authRoutes from './Controllers/auth';

require('dotenv').config();

const app: Application = express();
const backendEndpoint: string = 'http://localhost:5173/';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Bookify App' });
});

// Controllers / Routes
app.use('/stores', storesController);
app.use('/books', booksController);
app.use('/api', searchController);
app.use('/admin', authRoutes);

// Backend Endpoint GET Request
app.get('/fetchData', cors(), async (req, res) => {
  try {
    const response = await axios.get(backendEndpoint);
    res.json({
      dataFromBackend: response.data,
      message: 'Data fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching data from the backend',
      details: (error as Error).message, // Type assertion to 'Error'
    });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server live on port: ${PORT}`);
});
