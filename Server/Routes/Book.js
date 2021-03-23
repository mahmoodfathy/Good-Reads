const express = require('express');
const bookRouter = express.Router();
const booksController=require('../Controllers/Book');

/** APIs **/

/* Add Book To DB */
bookRouter.post('/', booksController.addBooks);

/* List All Books From DB */
bookRouter.get('/', booksController.getAllBooks);

/* List one Book From DB */
bookRouter.get('/:id',booksController.getOneBook);

/* Delete one Book From DB */
bookRouter.delete('/:id',booksController.deleteBook);

/* Update one Book From DB */
bookRouter.patch('/:id',booksController.editBook);




























module.exports=bookRouter;
