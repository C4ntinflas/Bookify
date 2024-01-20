//dependencies
const search = require("express").Router();
const db = require("../models");
const { Book, BookStore, Users, UserInventory, StoresBook } = db;
const { Op } = require("sequelize");
const path = require("path");

// Search route for book quantities
search.get("/search/:title", async (req, res) => {
  try {
    const bookTitle = req.params.title;

    // Find the book by title
    const book = await Book.findOne({
      where: { title: bookTitle },
      include: [
        {
          model: StoresBook,
          attributes: ["store_id", "quantity"],
          raw: true, // Use raw: true to avoid aliasing
        },
      ],
      attributes: [
        "book_id",
        "title",
        "genre",
        "location",
        "description",
        "total_quantity",
        "quantity",
        "store_id",
      ],
      raw: true, // Use raw: true for the main query as well
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    console.log(book);

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
  ]
};

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = search;
