const AuthorModel = require('../Models/author');

exports.CreateAuthor = async (req, res) => {

    const authorInstance = new AuthorModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        shortdescription: req.body.shortdescription,
        books: req.body.books,
        imageURL: req.body.imageURL,
    })
    //console.log(authorInstance.getFullName(),authorInstance.authorage())
    try {
        const NewAuthor = await authorInstance.save();
        res.status(200).json({message:"Author Added Successfully"});
    } catch (err) {
        return res.status(500).json(err)
    }

    console.log(authorInstance);
}
exports.Get_all_Authors = async (request, response) => {
    try {
        const Authors = await AuthorModel.find({}).select('-_id -__v');
        if (!Authors) {
            response.status(404);
            return response.send({ error: "Authors not found" });
        }
        else {
            response.status(200).json(Authors);
            console.log(Authors);
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }


}
exports.GetAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const oneAuthor = await AuthorModel.findById(id).select('-_id -__v');
        if (!oneAuthor) {
            res.status(400);
            return res.send({ error: "Author not found" });
        }
            res.status(200).json(oneAuthor);
            console.log(oneAuthor);
    } catch (err) {
        return res.status(500).json(err)
    }

}
exports.DeleteAuthor = async (req, res) => {
    const { id } = req.params
    console.log("id:", id);
    try {
        const deletautho = await AuthorModel.findByIdAndDelete(id).select('-_id -__v');
        res.status(200).json({message:"Author Deleted Successfully"});
        //.catch((err) => { res.send('error occured deleted') })
    } catch (err) {
        return res.status(500).json(err)
    }
}
exports.UpdateAuthor = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const authorInstance ={
        firstname: data.firstname,
        lastname: data.lastname,
        dob: data.dob,
        shortdescription: data.shortdescription,
        //books: data.books,
        imageURL: data.imageURL,
    }
    console.log("id:", id);
    try{
    const updateAuthor=await AuthorModel.findByIdAndUpdate(id,authorInstance);
        if(!updateAuthor){
            res.status(400).json({message:"Author not updated"});
        }
        else{
            res.status(200).json({message:"Author updateded Successfully"});
        }
    }catch(err){
        return res.status(500).json(err)
    }
           
}
