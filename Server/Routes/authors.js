const express = require("express");
const AuthorModel = require("../Models/author");
const authorRouter = express.Router();
const AuthorController = require("../Controllers/author");
const userAuth = require("../MiddleWares/User");

authorRouter.post("/", userAuth.auth, AuthorController.createAuthor);

authorRouter.get("/", AuthorController.getAllAuthors);

authorRouter.get("/:id", AuthorController.getAuthor);

authorRouter.delete("/:id", userAuth.auth, AuthorController.deleteAuthor);

authorRouter.patch("/:id", userAuth.auth, AuthorController.updateAuthor);

authorRouter.get("/authors/top", AuthorController.getPopularAuthors);

module.exports = authorRouter;
