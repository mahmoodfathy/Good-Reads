const express = require('express');
const categoryController = require('../Controllers/Category');
const router = express.Router();


router.post("/category",categoryController.addCategory);
router.get('/category',categoryController.getCategories);
router.patch('/category/:id',categoryController.updateCategroy);
router.delete('/category/:id',categoryController.deleteCategroy);


module.exports = router;