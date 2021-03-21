const AuthorModel = require('../Models/author');

exports.CreateAuthor=(req, res, next) => {

    const authorInstance = new AuthorModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        dob:req.body.dob,
        shortdescription:req.body.shortdescription,
        books:req.body.books,
        imageURL:req.body.imageURL,
    })
    //console.log(authorInstance.getFullName(),authorInstance.authorage())
    authorInstance.save().exec().then(( author) => {
        res.json(author)
        console.log("Author saved", author)
    }).catch((err) => { res.send('error occured added') })

    console.log(authorInstance);
}
exports.Get_all_Authors=(request, response, next) => {
    AuthorModel.find({}).select('-_id -__v').then((err, authors) => {
        if (err) return next(err)
        response.json(authors);
        console.log(authors)
    })
}
exports.GetAuthor= (req, res) => {
    const { id } = req.params;

    AuthorModel.findById(id).select('-_id -__v').exec()
        .then((authors) => {
            res.json(authors);
            console.log(authors);
        }).catch((err) => { res.send('error occured') })
}
exports.DeleteAuthor= (req, res) => {
    const { id } = req.params
    console.log("id:", id);
    AuthorModel.findByIdAndDelete(id) .select('-_id -__v').exec()
    .then((authors) => {
        res.json(authors);
        console.log('author deleted');
    }).catch((err) => { res.send('error occured deleted') })
}
exports.UpdateAuthor=(req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log("id:", id);
    AuthorModel.findByIdAndUpdate(id, data).select('-_id -__v').exec().
    then((author) => {
        console.log(data.firstnamename)
        const authorInstance = new AuthorModel({
            firstname:data.firstname,
            lastname:data.lastname,
            dob:data.dob,
            shortdescription:data.shortdescription,
            books:data.books,
            imageURL:data.imageURL,
        })
        console.log(author);
        res.json(author);
        console.log("author edit");
    }).catch((err) => { res.send('error occured edited') })
}
