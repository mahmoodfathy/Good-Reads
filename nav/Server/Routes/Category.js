const express = require('express');
const categoryController = require('../Controllers/Category');
const router = express.Router();
const userAuth = require("../MiddleWares/User");

router.post("/", userAuth.auth, categoryController.addCategory);
router.get('/', categoryController.getCategories);
router.patch('/:id', userAuth.auth, categoryController.updateCategroy);
router.delete('/:id', userAuth.auth, categoryController.deleteCategroy);


module.exports = router;