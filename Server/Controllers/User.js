const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Book = require("../Models/Book");

const userRegister = async (req, res) => {
  const { username, email, password, image } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      res.status(400);
      return res.send({ error: "User already exists" });
    }

    user = new User({
      username: username,
      email: email,
      password: password,
      imageURL: image,
    });
    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    //Return jsonwebtoken
    const payload = {
      user: {
        id: user._id,
        isAdmin: user.isAdmin,
      },
    };
    console.log(payload);
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.status(200);
        return res.send({
          username: user.username,
          id: user._id,
          books: user.books,
          imageUrl: user.imageUrl,
          isAdmin: user.isAdmin,
          token: token,
        });
      }
    );
  } catch (err) {
    res.status(500);
    return res.send({ error: "server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //See if user exists
    let user = await User.findOne({ email: email });
    if (!user) {
      res.status(400);
      return res.json({ errors: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      return res.json({ errors: "Invalid Credentials" });
    }
    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: 36000,
    });
    console.log(user);
    res.status(200);

    return res.json({
      username: user.username,
      id: user._id,
      books: user.books,
      imageURL: user.imageURL,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500);
    return res.send({ error: "server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200);
    return res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send({ error: "server error" });
  }
};

const getUserBooks = async (req, res) => {
  try {
    let { id } = req.params;
    if (id != req.user.id)
      return res.status(401).send({ error: "Unathorized action" });
    //books.book is the field you want to populate
    let user = await User.findById(id)
      .populate("books.book")
      .populate({
        path: "books.book",
        populate: {
          path: "author",
          model: "Author",
        },
      })
      .exec();
    if (!user) {
      res.status(404);
      return res.send({ error: "user not found" });
    }
    let filteredBooks = user.books.filter((bookObj) => {
      if (bookObj.book != null) return bookObj;
    });

    if (filteredBooks.length > 0) {
      await user.updateOne({ books: filteredBooks });
    }
    res.status(200);
    return res.send({
      username: user.username,
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      books: user.books,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send({ error: "server error" });
  }
};

const deleteUserAllBooks = async (req, res) => {
  try {
    let { id } = req.params;
    if (id != req.user.id)
      return res.status(401).send({ error: "Unauthorized action" });
    let user = await User.findById(id);
    if (!user) {
      res.status(404);
      return res.send({ error: "user not found" });
    }

    user = await User.findByIdAndUpdate(id, { books: [] }, { new: true });
    res.status(200);
    return res.send(user);
  } catch (err) {
    res.status(500);
    return res.send({ error: "server error" });
  }
};

const addBookToUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { bookId } = req.body;
    let user = await User.findById(id);
    if (!user) {
      res.status(404);
      return res.send({ error: "user not found" });
    }

    for (let i = 0; i < user.books.length; i++) {
      if (user.books[i].book == bookId) {
        res.status(400);
        return res.send({ error: "Book already added" });
      }
    }

    let book = await Book.findById(bookId);

    if (!book) {
      res.status(404);
      return res.send({ error: "no such book found" });
    }

    if (req.body.shelf)
      user = await User.findByIdAndUpdate(
        id,
        { $push: { books: { book: book._id, shelf: req.body.shelf } } },
        { new: true }
      );
    else
      user = await User.findByIdAndUpdate(
        id,
        { $push: { books: { book: book._id } } },
        { new: true }
      );

    res.status(200);
    return res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send({ error: "server error" });
  }
};

const addBookToShelf = async (req, res) => {
  try {
    let userHasBook = false;
    let { id } = req.params;
    let { bookId, shelf } = req.body;
    let user = await User.findById(id);
    if (!user) {
      res.status(404);
      return res.send({ error: "user not found" });
    }
    let books = user.books;
    if (shelf === "none") {
      userHasBook = true;
      user = await User.findByIdAndUpdate(
        id,

        { $pull: { books: { book: bookId } } },
        { new: true }
      );
      return res.status(200).json(user);
    } else {
      for (let i = 0; i < books.length; i++) {
        if (user.books[i].book == bookId) {
          userHasBook = true;
          books[i]["shelf"] = shelf;
        }
      }
    }

    if (!userHasBook) {
      res.status(400);
      return res.send({ error: "user has no such book" });
    }

    let book = await Book.findById(bookId);

    if (!book) {
      res.status(404);
      return res.send({ error: "no such book found" });
    }

    user = await User.findByIdAndUpdate(id, { books }, { new: true });

    res.status(200);
    return res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send({ error: "server error" });
  }
};
const getUser = async (req, res) => {
  let { id } = req.user;
  console.log(id);
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "No user Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const controllers = {
  userRegister,
  userLogin,
  getAllUsers,
  getUserBooks,
  deleteUserAllBooks,
  addBookToUser,
  addBookToShelf,
  getUser,
};

module.exports = controllers;
