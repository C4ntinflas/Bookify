const books = require('express').Router()
const db = require('../models')
const { Book } = db

// Route to display a list of books
books.get('/', async (req, res) => {
  try {
    const foundBooks = await Book.findAll(); 
    res.status(200).json({foundBooks});
  } catch (err) {
    res.status(500).json(error);
  }
});

// Route to handle form submission and create a new book
books.post('/', async (req, res) => {
  try {
    const newBook = await Book.create(req.body); 
    res.redirect('/books');
  } catch (err) {
    res.status(500).json(err)
  }
});

// Route to display the form for adding a new book
books.get('/new', (req, res) => {
  res.render('books/new');
});

// Route to view details of a specific book
books.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id); 
    res.render('books/show', { book });
  } catch (err) {
    console.error('Error:', err);
    res.render('error404');
  }
});

// Route to update details of a specific book
books.put('/:id', async (req, res) => {
  try {
    await Book.update(req.body, { where: { book_id: req.params.id } }); 
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.error('Error:', err);
    res.render('error404');
  }
});

// Route to delete a specific book
books.delete('/:id', async (req, res) => {
  try {
    await Book.destroy({ where: { book_id: req.params.id } });
    res.redirect('/books');
  } catch (err) {
    console.error('Error:', err);
    res.render('error404');
  }
});

// Route to display the form for editing a specific book
books.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.render('books/edit', { book });
  } catch (err) {
    console.error('Error:', err);
    res.render('error404');
  }
});

// Route for searching books
books.get('/search', async (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.docs && result.docs.length > 0) {
      console.log(`Search Term: ${searchTerm}`);
      console.log('Search Results:', result.docs);
      res.json(result.docs);
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
