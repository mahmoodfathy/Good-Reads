const express = require("express");
const bookRouter = express.Router();
const booksController = require("../Controllers/Book");
const userAuth = require("../MiddleWares/User");
const { check } = require("express-validator");

/** APIs **/

/* Add Book To DB */
bookRouter.post("/", userAuth.auth, booksController.addBooks);

/* List All Books From DB */
bookRouter.get("/", booksController.getAllBooks);

/* Get one Book From DB */
bookRouter.get("/:id", booksController.getOneBook);

/* List Most Popular Books From DB */
bookRouter.get("/books/top", booksController.getMostPopular);

/* Delete one Book From DB */
bookRouter.delete("/:id", userAuth.auth, booksController.deleteBook);

/* Update one Book From DB */
bookRouter.patch("/:id", userAuth.auth, booksController.editBook);

bookRouter.get("/category/:id", booksController.getCategoryBooks);

bookRouter.get("/author/:id", booksController.getAuthorBooks);

//Add review to book
bookRouter.put(
  "/:id",
  userAuth.auth,
  [
    check("userId", "userId is required").exists(),
    check("userName", "userName is required").exists(),
    check("text", "text is required").exists(),
  ],
  booksController.addReview
);

bookRouter.put(
  "/:id/:rating",
  userAuth.auth,
  [check("userId", "userId is required").exists()],
  booksController.addRating
);

module.exports = bookRouter;
