const router = require("express").Router();
const {check, validationResult} = require("express-validator");
const Controllers = require("../Controllers/User");
const User = require("../Models/User");
const Book = require("../Models/Book");

//Get all users
router.get("/", Controllers.getAllUsers);

//Get the user's books
router.get("/:id/books", Controllers.getUserBooks);

//register new user
router.post("/signup", [
    check("username", "userName is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body);
        //if there are errors send a bad request
        return res.status(400).json({errors: errors.array()});
    }
    return Controllers.userRegister(req, res);
});

//User login route
router.post("/login", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors send a bad request
        res.status(400);
        return res.json({errors: errors.array()});
    }
    return Controllers.userLogin(req, res);
});

//add book to user
router.post("/:id/books", [
    check("bookId", "Please include book id").exists()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors send a bad request
        res.status(400);
        return res.json({errors: errors.array()});
    }
    return Controllers.addBookToUser(req, res);
});

//add shelf to user's book
router.put("/:id/books", [
    check("bookId", "Please include book id").exists(),
    check("shelf", "Please include shelf").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if there are errors send a bad request
        res.status(400);
        return res.json({errors: errors.array()});
    }
    return Controllers.addBookToShelf(req, res);
});

//Delete all user's books
router.delete("/:id/books", Controllers.deleteUserAllBooks);

module.exports = router;