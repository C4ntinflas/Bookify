import { Router, Request, Response } from 'express';
import db from '../models';
const { Op } = require('sequelize');
const { Book } = db;

const books = Router();

books.get('/', async (req: Request, res: Response) => {
  try {
    const foundBooks = await Book.findAll();
    res.status(200).json({ foundBooks });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

//STORE INVENTORY
books.get('/store/:id', async (req: Request, res: Response) => {
  try {
    const foundBooks = await Book.findAll({
      where: {
        store_id: req.params.id
      }
    });
    console.log(foundBooks);
    res.status(200).json(foundBooks);
  } catch (error: any) {
    res.status(500).json(error);
  }
});

//UPDATE STORE INVENTORY
books.put('/book/:id', async (req: Request, res: Response) => {
  const bookId = req.params.id;
  try {
    const updateQuantity = await Book.update(req.body, {
      where: { book_id: bookId }
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
});

books.post('/', async (req: Request, res: Response) => {
  try {
    console.log('Received Book Data:', req.body);
    const newBook = await Book.create(req.body);
    res.redirect('/books');
  } catch (err: any) {
    console.error('Error creating book:', err);
    res.status(500).json({ error: err.message });
  }
});

books.get('/new', (req: Request, res: Response) => {
  res.render('books/new');
});

// Route to view details of a specific book
books.get('/:id', async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    // Return the book data as JSON
    res.json({ book });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update details of a specific book
books.put('/:id', async (req: Request, res: Response) => {
  const bookId = req.params.id;

  try {
    const [updatedCount] = await Book.update(req.body, {
      where: { book_id: bookId },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    const updatedBook = await Book.findByPk(bookId);

    // Return the updated book data as JSON
    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete a specific book
books.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Book.destroy({ where: { book_id: req.params.id } });
    res.redirect('/books');
  } catch (err: any) {
    console.error('Error:', err);
    res.render('error404');
  }
});

books.get('/:id/edit', async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.render('books/edit', { book });
  } catch (err: any) {
    console.error('Error:', err);
    res.render('error404');
  }
});

export default books;
