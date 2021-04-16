const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema({
  firstname: { type: String, required: true, minLength: 3 },
  lastname: { type: String, required: true, minLength: 3 },
  dob: { type: String, required: true },
  shortdescription: { type: String },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  imageURL: {type:String}
});

const AuthorModel = mongoose.model("Author", AuthorSchema);
module.exports = AuthorModel;


