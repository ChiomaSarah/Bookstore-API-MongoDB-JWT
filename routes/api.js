require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;
const Book = require("../models/book");
const router = express.Router();
const app = express();
const middleware = require("../verifyToken");
const jsonParser = express.json();

router.get("/", middleware.verify, async (req, res) => {
  try {
    const books = await Book.find();
    if (books) {
      res.json({
        status: 200,
        message: "Request successful... Books Retrieved!",
        data: books,
      });
    } else {
      res.status(401).json({
        error: "Unauthorized access... please, login!",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", middleware.verify, jsonParser, async (req, res) => {
  try {
    const createBook = new Book({
      book_title: req.body.book_title,
      book_author: req.body.book_author,
      book_rating: req.body.book_rating,
      book_genre: req.body.book_genre,
      book_publication_date: req.body.book_publication_date,
    });
    await createBook.save();
    if (createBook) {
      res.json({
        status: 201,
        message: "Request successful... Book Created Successfully!",
        data: createBook,
      });
    } else {
      res.status(401).json({
        error: "Unauthorized access... please, login!",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", middleware.verify, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    res.json({
      status: 200,
      data: book,
    });
  } catch (error) {
    res.status(404).json({ error: "Request failed... Book doesn't exist!" });
  }
});

router.patch("/:id", middleware.verify, jsonParser, async (req, res) => {
  try {
    const updateBook = await Book.findOne({ _id: req.params.id });

    if (req.body.book_title) {
      updateBook.book_title = req.body.book_title;
    }
    if (req.body.book_author) {
      updateBook.book_author = req.body.book_author;
    }
    if (req.body.book_rating) {
      updateBook.book_rating = req.body.book_rating;
    }
    if (req.body.book_genre) {
      updateBook.book_genre = req.body.book_genre;
    }
    if (req.body.book_publication_date) {
      updateBook.book_publication_date = req.body.book_publication_date;
    }
    await updateBook.save();
    res.json({
      status: 200,
      message: "Request successful... Book updated!",
      data: updateBook,
    });
  } catch (error) {
    res.status(404).json({ error: "Request failed... Book does not exist!" });
  }
});

router.delete("/:id", middleware.verify, async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Request failed... Book doesn't exist!" });
  }
});
module.exports = router;
