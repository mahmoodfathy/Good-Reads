const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const AuthorSchema=new mongoose.Schema({
    firstname:{type:String,required:true, minLength:3},
    lastname:{type:String,required:true, minLength:3},
    dob:{type:Date,required:true},
    shortdescription:{type:String},
    books:[{type:mongoose.Schema.Types.ObjectId,ref:"book"}],
    imageURL:String
})


const AuthorModel=mongoose.model("author",AuthorSchema);

module.exports=AuthorModel;