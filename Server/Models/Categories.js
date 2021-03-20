const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    category:{
        type:String,
        default:""
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
});
const Model = mongoose.model('category',CategorySchema);

module.exports = Model;