const express = require("express");
const AuthorModel = require("../Models/author");
const authorRouter = express.Router();
const AuthorController = require("../Controllers/author");

authorRouter.post("/", AuthorController.createAuthor);

authorRouter.get("/", AuthorController.getAllAuthors);

authorRouter.get("/:id", AuthorController.getAuthor);

authorRouter.delete("/:id", AuthorController.deleteAuthor);

authorRouter.patch("/:id", AuthorController.updateAuthor);

module.exports = authorRouter;
