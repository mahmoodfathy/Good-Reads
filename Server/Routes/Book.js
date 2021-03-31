const express = require('express');
const bookRouter = express.Router();
const booksController=require('../Controllers/Book');

/** APIs **/


/* Add Book To DB  Need Admin Authentication */
bookRouter.post('/', booksController.addBooks);

/* Delete one Book From DB Need Admin Authentication */
bookRouter.delete('/:id',booksController.deleteBook);

/* Update one Book From DB Need Admin Authentication */
bookRouter.patch('/:id',booksController.editBook);

/* List All Books From DB */
bookRouter.get('/', booksController.getAllBooks);

/* Get one Book From DB */
bookRouter.get('/:id',booksController.getOneBook);

/* List Most Popular Books From DB */
bookRouter.get('/top', booksController.getMostPopular);




























module.exports=bookRouter;
