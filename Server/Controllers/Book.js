const BookModel=require('../Models/Book');

/* Add Book To DB */
exports.addBooks= async (req,res)=>{
    console.log(req.body);
    const book = new BookModel({
        name: req.body.name,
        category: req.body.categoryId,
        author: req.body.authorId,
        description: req.body.description,
        bookImage: req.body.bookImage
    })
    try {
        const newBook = await book.save();
        // const addedBook = await BookModel.findById({ _id: newBook._id }).populate('category').populate('author');
        res.status(200).json(newBook);
    } catch (err) {
        return res.status(500).json(err);
    }

}

/* List All Books From DB */
exports.getAllBooks=async (req,res)=>{
    try {
        const books = await BookModel.find().populate('category').populate('author');
        if(!books){
            res.status(404);
            return res.send({error: "books not found"});
        }

        res.status(200).json(books)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}

/* List one Book From DB */
exports.getOneBook=async (req,res)=>{
    const bookId=req.params.id;
    try{
        const book= await BookModel.findById({_id: bookId}).populate('category').populate('author');
        if(!book){
            return res.status(404).send({error: "book not found"});
        }
        res.status(200).json(book);
    }catch (err){
        return res.status(500).json(err);
    }

}

/* Delete one Book From DB */
exports.deleteBook=async (req,res)=>{
    const bookId = req.params.id
    try {
        const deletedState = await BookModel.findByIdAndDelete(bookId);
        res.status(200).json(deletedState);
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

/* Update one Book From DB */
exports.editBook= async (req,res)=>{
    const id = req.params.id;
    const newBookData = {
        name: req.body.name,
        category: req.body.categoryId,
        author: req.body.authorId,
        bookImage: req.body.cover,
        description:req.body.description
    }
    try {
        const updatedBook = await BookModel.findByIdAndUpdate(id, newBookData, { new: true }).populate('category').populate('author');
        if(!updatedBook){
            res.status(404);
            return res.status(200).send({error: "book not exist"});
        }
        res.json(updatedBook);
    } catch (err) {
        return res.status(500).json(err);
    }
}
