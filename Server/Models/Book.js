const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please Enter book Name"] },
  cover: { type: String },
  description: {
    type: String,
    minlength: 10,
    maxLength: [20, "Maximum description Length is 20 character"],
  },
  details: [
    { Paperback: { type: String, maxLength: 2 } },
    { PublishedDate: { type: Date } },
    { OriginalTitle: { type: String } },
    { EditionLanguage: { type: String } },
    { Characters: { type: String } },
  ],
  totalRatingCount: { type: Number, default: 0 },
  totalRatingValue: { type: Number, default: 0 },
  totalReviewsCount: { type: Number, default: 0 },
  addedDate: { type: Date, default: Date.now },
  review: { type: String },
  rating: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
