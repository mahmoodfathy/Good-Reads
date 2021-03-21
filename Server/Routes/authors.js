const express = require('express')
const AuthorModel = require('../Models/author');
const authorRouter = express.Router();
const AuthorController =require('../Controllers/author');

authorRouter.post("/", AuthorController.CreateAuthor)

authorRouter.get("/", AuthorController.Get_all_Authors)

authorRouter.get("/:id",AuthorController.GetAuthor)

authorRouter.delete("/:id",AuthorController.DeleteAuthor)

authorRouter.patch("/:id", AuthorController.UpdateAuthor)

module.exports = authorRouter;