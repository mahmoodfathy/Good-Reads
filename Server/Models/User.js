var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    imageUrl: {type: String},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    books:[
        {
            _id: false,
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book' //Must be the same name as the model
            },
            shelf: {type: String, default: "none"}
        }
    ],
});

module.exports = mongoose.model("User", UserSchema);