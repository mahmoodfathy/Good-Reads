const BookModel = require("../Models/Book");
const booksPaginationMiddleware = require("../MiddleWares/Book");
const { validationResult } = require("express-validator");
const Author = require("../Models/author");

/* Add Book To DB */
exports.addBooks = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ error: "Unauthorized action" });
  const { name, category, author, description, cover } = req.body;
  const book = new BookModel({
    name,
    category,
    author,
    description,
    cover,
  });
  try {
    await book.save();

    await Author.findByIdAndUpdate(author, { $push: { books: book._id } });
    return res.status(200).json({ message: "book Added successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

/* List All Books From DB Need Pagination */

exports.getAllBooks = async (req, res, next) => {
  try {
    // const {page = 1,limit = 10} = parseInt(req.query);
    // const startIndex = (page - 1 ) * limit;
    // const endIndex = limit * page;
    const books = await BookModel.find({})
      .populate("author")
      .populate("category");
    // .limit(endIndex)
    // .skip(startIndex);
    if (!books) {
      res.status(404);
      return res.send({ error: "books not found" });
    }
    return res.status(200).json(books);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/* List one Book From DB */
exports.getOneBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await BookModel.findById({ _id: bookId })
      .populate("category")
      .populate("author");
    if (!book) {
      return res.status(404).send({ error: "book not found" });
    }
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/* Delete one Book From DB */
exports.deleteBook = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ error: "Unauthorized action" });
  const bookId = req.params.id;
  try {
    const book = await BookModel.findById(bookId);
    await Author.findByIdAndUpdate(book.author, { $pull: { books: bookId } });
    await book.deleteOne();

    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }
    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/* Update one Book From DB */
exports.editBook = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ error: "Unauthorized action" });
  const { id } = req.params;
  const newBookData = req.body;

  try {
    const updatedBook = await BookModel.updateOne({ _id: id }, newBookData);
    await Author.updateMany({}, { $pull: { books: id } });

    await Author.findByIdAndUpdate(newBookData.author, {
      $push: { books: id },
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "book not exist" });
    }
    return res.status(200).json({ message: "updated book successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/* List Most Popular Books From DB  Need Pagination */

exports.getMostPopular = async (req, res, next) => {
  try {
    const topBooks = await BookModel.find({ avgRating: { $gt: 3 } });
    if (!topBooks) {
      return res.status(404).json({ message: "No Popular books found" });
    }
    return res.status(200).json(topBooks);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/* Get Books for Specific Category */
exports.getCategoryBooks = async (req, res) => {
  let { id } = req.params;

  try {
    const books = await BookModel.find({ category: id }).populate("author");
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No Books Found in this category" });
    }
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Get Books for Specific Author */
exports.getAuthorBooks = async (req, res) => {
  let { id } = req.params;
  try {
    const books = await BookModel.find({ author: id });
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No Books Found for this Author" });
    }
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
/* Add Review to Book */

exports.addReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //if there are errors send a bad request
    res.status(400);
    return res.json({ errors: errors.array() });
  }

  let { id } = req.params;

  try {
    let book = await BookModel.findByIdAndUpdate(
      id,
      { $push: { reviews: req.body } },
      { new: true }
    );

    if (!book) return res.status(404).send({ error: "No such book found" });

    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "something went wrong" });
  }
};
exports.addRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //if there are errors send a bad request
    res.status(400);
    return res.json({ errors: errors.array() });
  }

  let { id, rating } = req.params;
  let { userId } = req.body;

  if (rating > 5 || rating < 0) {
    return res.status(400).send({ error: "invalid rating" });
  }

  try {
    let book = await BookModel.find({
      _id: id,
      ratingUsers: { $elemMatch: { userId: userId } },
    });
    if (book.length > 0) {
      let oldRating = book[0].ratingUsers.filter(
        (user) => user.userId == userId
      )[0].oldRating;
      let updatedRatedUsers = book[0].ratingUsers.map((user) => {
        if (user.userId == userId) {
          user.oldRating = rating;
          return user;
        }
        return user;
      });
      book = await BookModel.findByIdAndUpdate(
        id,
        {
          $inc: { totalRatingValue: rating - oldRating },
          ratingUsers: updatedRatedUsers,
        },
        { new: true }
      ).populate("author");
      res.status(200);
      return res.json(book);
    }
    book = await BookModel.findByIdAndUpdate(
      id,
      {
        $inc: { totalRatingValue: rating, totalRatingCount: 1 },
        $push: { ratingUsers: { userId: userId, oldRating: rating } },
      },
      { new: true }
    ).populate("author");
    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};
