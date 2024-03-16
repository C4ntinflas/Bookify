import { Router, Request, Response } from 'express';
import db from '../models';
const { Book, StoresBook } = db;

const search = Router();

search.get('/search/:title', async (req: Request, res: Response) => {
  try {
    const bookTitle = req.params.title;

    const book = await Book.findOne({
      where: { title: bookTitle },
      include: [
        {
          model: StoresBook,
          attributes: ['store_id', 'quantity'],
          raw: true,
        },
      ],
      attributes: [
        'book_id',
        'title',
        'genre',
        'location',
        'description',
        'total_quantity',
        'quantity',
        'store_id',
      ],
      raw: true,
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    const result = {
      book: {
        book_id: book.book_id,
        title: book.title,
        genre: book.genre,
        location: book.location,
        description: book.description,
        total_quantity: book.total_quantity,
        quantity: book.quantity,
        store_id: book.store_id,
      },
      store_quantities: [
        {
          store_id: book.store_id,
          quantity: book.quantity,
        },
      ],
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default search;

