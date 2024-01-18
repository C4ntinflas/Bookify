const { Op } = require('sequelize');
const express = require('express');
const books = express.Router();
const db = require('../models');
const { Book } = db;

books.get('/', async (req, res) => {
  try {
    const foundBooks = await Book.findAll();
    res.status(200).json({ foundBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

books.post('/', async (req, res) => {
  try {
    console.log('Received Book Data:', req.body);

    const newBook = await Book.create(req.body);
    res.redirect('/books');
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ error: err.message });
  }
});

books.get('/new', (req, res) => {
  res.render('books/new');
});

books.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
  } catch (err) {
    console.error('Error:', err);
    res.render('error404');
  }
});

books.put('/:id', async (req, res) => {
  try {
    await Book.update(req.body, { where: { book_id: req.params.id } });
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.error('Error:', err);
    res.render('error404');
  }
});

books.delete('/:id', async (req, res) => {
  try {
    await Book.destroy({ where: { book_id: req.params.id } });
    res.redirect('/books');
  } catch (err) {
    console.error('Error:', err);
    res.render('error404');
  }
});

books.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.render('books/edit', { book });
  } catch (err) {
    console.error('Error:', err);
    res.render('error404');
  }
});

books.get('/search', async (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    const foundBooks = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${searchTerm}%`
        }
      }
    });

    if (foundBooks.length > 0) {
      console.log(`Search Term: ${searchTerm}`);
      console.log('Search Results:', foundBooks);
      res.json(foundBooks);
    } else {
      console.log(`No results found for search term: ${searchTerm}`);
      res.json({ message: 'Not Found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = books;
