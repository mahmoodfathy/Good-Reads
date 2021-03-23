const mongoose =require('mongoose');
const mongodb_url=process.env.mongodb_url || "mongodb://localhost:27017/Good-Reads"

mongoose.connect(mongodb_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true 

 })
.then(()=>console.log('Connect to database '))
.catch((e)=>console.error('Faild Connet to database ',e));