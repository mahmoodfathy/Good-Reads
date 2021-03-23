const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/GoodReads";

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{return console.log("Mongo DB Connected Successfully")})
    .catch((err)=>console.error(err))
