const mongoose = require("mongoose");
const BookSchema = mongoose.Schema(
  {
    book_title: {
      type: String,
      required: true,
    },
    book_author: {
      type: String,
      required: true,
    },
    book_rating: {
      type: Number,
      required: true,
    },
    book_genre: {
      type: String,
      required: true,
    },
    book_publication_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Book", BookSchema);
