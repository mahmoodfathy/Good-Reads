const express=require('express');
const authorRouter=require('./Routes/authors');
require('./boot/connectionDB');

const PORT=process.env.PORT ||3000;

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=>{
   console.log(new Date(),req.url,req.method)
   next();
})
app.use('/authors',authorRouter);
app.use((err,req,res,next)=>{
      res.status(401);
      res.send(err);
})
app.listen(PORT,(err)=>{
    if(err) console.error(err)
    else console.log("server express start")
})