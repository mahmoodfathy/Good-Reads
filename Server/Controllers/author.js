const AuthorModel = require("../Models/author");

exports.createAuthor = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ error: "Unauthorized action" });
  const {
    firstname,
    lastname,
    dob,
    shortdescription,
    books,
    imageURL,
  } = req.body;
  const authorInstance = new AuthorModel({
    firstname,
    lastname,
    dob,
    shortdescription,
    books,
    imageURL,
  });

  try {
    const newAuthor = await authorInstance.save();
    res.status(200).json({ message: "Author Added Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }

  console.log(authorInstance);
};
exports.getAllAuthors = async (request, response) => {
  try {
    const Authors = await AuthorModel.find({}).select("-__v").populate("books");
    if (!Authors) {
      return response.status(404).json({ error: "No authors found" });
    }
    return response.status(200).json(Authors);
  } catch (err) {
    return response.status(500).json(err);
  }
};
exports.getAuthor = async (req, res) => {
  // if(!req.user.isAdmin)
  //   return res.status(401).send({error: "Unauthorized action"});
  const { id } = req.params;
  try {
    const oneAuthor = await AuthorModel.findById(id)
      .select(" -__v")
      .populate("books");
    if (!oneAuthor) {
      return res.status(400).json({ error: "Author not found" });
    }
    return res.status(200).json(oneAuthor);
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.deleteAuthor = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ error: "Unauthorized action" });
  const { id } = req.params;
  try {
    const deletautho = await AuthorModel.findByIdAndDelete(id).select(" -__v");
    return res.status(200).json({ message: "Author Deleted Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.updateAuthor = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ error: "Unauthorized action" });
  const { id } = req.params;
  const updatedAuthor = req.body;

  try {
    const updateAuthor = await AuthorModel.updateOne(
      { _id: id },
      updatedAuthor
    );
    if (!updateAuthor) {
      return res.status(400).json({ message: "Author not updated !" });
    }
    return res.status(200).json({ message: "Author updateded Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.getPopularAuthors = async (req, res) => {
  try {
    const popularAuthors = await AuthorModel.find({}).limit(3);
    if (!popularAuthors) {
      return res.status(404).json({ message: "No Popular Authors Found!" });
    }
    return res.status(200).json(popularAuthors);
  } catch (err) {
    return res.status(500).json(err);
  }
};
