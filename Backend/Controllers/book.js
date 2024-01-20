const { Op } = require("sequelize");
const express = require("express");
const books = express.Router();
const db = require("../models");
const { Book } = db;

books.get("/", async (req, res) => {
  try {
    const foundBooks = await Book.findAll();
    res.status(200).json({ foundBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//STORE INVENTORY
books.get('/store/:id', async (req, res) => {
  try {
    const foundBooks = await Book.findAll({
      where: {
        store_id: req.params.id
      }
    })
    console.log(foundBooks)
    res.status(200).json(foundBooks)
  } catch (error) {
    res.status(500).json(error)
    //console.log(req.params.id)
  }
})

//UPDATE STORE INVENTORY
books.put('/book/:id', async (req, res) => {
  const bookId = req.params.id
  try {
    const updateQuantity = await Book.update(req.body, {
      where: {book_id: bookId}
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

books.post("/", async (req, res) => {
  try {
    console.log("Received Book Data:", req.body);
    const newBook = await Book.create(req.body);
    res.redirect("/books");
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ error: err.message });
  }
});

books.get("/new", (req, res) => {
  res.render("books/new");
});
// Route to view details of a specific book
books.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    // Return the book data as JSON
    res.json({ book });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update details of a specific book
books.put("/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const [updatedCount] = await Book.update(req.body, {
      where: { book_id: bookId },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Book not found." });
    }

    const updatedBook = await Book.findByPk(bookId);

    // Return the updated book data as JSON
    res.json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Route to delete a specific book
books.delete("/:id", async (req, res) => {
  try {
    await Book.destroy({ where: { book_id: req.params.id } });
    res.redirect("/books");
  } catch (err) {
    console.error("Error:", err);
    res.render("error404");
  }
});

books.get("/:id/edit", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.render("books/edit", { book });
  } catch (err) {
    console.error("Error:", err);
    res.render("error404");
  }
});

/* // Route for searching books (**OLD ROUTE, STORED FOR POTENTIAL USAGE**)
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
 */

module.exports = books;
