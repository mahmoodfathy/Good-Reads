const BookModel = require("../Models/Book");
const booksPaginationMiddleware = require('../MiddleWares/Book');

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
    return res.status(200).json({message:"book Added successfully"});
  } catch (err) {
    return res.status(500).json(err);
  }
};

/* List All Books From DB Need Pagination */
exports.getAllBooks = async (req, res,next) => {
  try {
    const {page = 1,limit = 10} = parseInt(req.query);
    const startIndex = (page - 1 ) * limit;
    const endIndex = limit * page;
    const books = await BookModel.find({}).populate("author").populate("category")
        .limit(endIndex)
        .skip(startIndex);
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
    const book = await BookModel.findById({ _id: bookId }).populate("category").populate("author");
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
    const deletedState = await BookModel.findByIdAndDelete(bookId);
    console.log(deletedState);
    if (!deletedState) {
      return res.status(404).json({ message: "Book not found!" });
    }
    return res.status(200).json(deletedState);
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
exports.getMostPopular= async (req,res,next)=>{
  try{
    avgRating=await BookModel.getAvgRating();
    const topBooks = await BookModel.find({ avgRating: { $gt: 3 } })
    if(!topBooks){
      return res.status(404).json({ message: "No Popular books found" });
    }
    return res.status(200).json(topBooks);
  }catch (err){
    return res.status(500).json(err);
  }
}

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
