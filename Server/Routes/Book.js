const express = require('express');
const bookRouter = express.Router();
const booksController=require('../Controllers/Book');
const userAuth = require("../MiddleWares/User");
const {check} = require("express-validator");

/** APIs **/

/* Add Book To DB */
bookRouter.post('/', userAuth.auth, booksController.addBooks);

/* List All Books From DB */
bookRouter.get('/', booksController.getAllBooks);

/* List one Book From DB */
bookRouter.get('/:id', booksController.getOneBook);

/* Delete one Book From DB */
bookRouter.delete('/:id', userAuth.auth, booksController.deleteBook);

/* Update one Book From DB */
bookRouter.patch('/:id', userAuth.auth, booksController.editBook);

bookRouter.get("/category/:id", booksController.getCategoryBooks);

//Add review to book
bookRouter.put('/:id', userAuth.auth, [
  check("userId", "userId is required").exists(),
  check("userName", "userName is required").exists(),
  check("text", "text is required").exists(),
], booksController.addReview);

//Add rating to book
bookRouter.put('/:id/:rating', userAuth.auth, [
  check("userId", "userId is required").exists()
], booksController.addRating);

module.exports=bookRouter;
