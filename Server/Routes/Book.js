const express = require('express');
const bookRouter = express.Router();
const booksController=require('../Controllers/Book');
const userAuth = require("../MiddleWares/User");

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




























module.exports=bookRouter;
