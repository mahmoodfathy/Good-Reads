const express = require("express");
const bookRouter = express.Router();
const booksController = require("../Controllers/Book");
const {check} = require("express-validator");

/** APIs **/

/* Add Book To DB */
bookRouter.post("/", booksController.addBooks);

/* List All Books From DB */
bookRouter.get("/", booksController.getAllBooks);

/* List one Book From DB */
bookRouter.get("/:id", booksController.getOneBook);

/* Delete one Book From DB */
bookRouter.delete("/:id", booksController.deleteBook);

/* Update one Book From DB */
bookRouter.patch("/:id", booksController.editBook);

bookRouter.get("/category/:id", booksController.getCategoryBooks);

//Add review to book
bookRouter.put('/:id', userAuth.auth, [
  check("userId", "userId is required").exists(),
  check("userName", "userName is required").exists(),
  check("text", "text is required").exists(),
], booksController.addReview);

module.exports = bookRouter;
