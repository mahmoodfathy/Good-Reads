const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const categoryRoutes = require('./Routes/Category');
const app =express();


app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

app.use(categoryRoutes);

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("mongo db is connected");
});

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
})
