const express = require("express")
const mongoose = require("mongoose");
var bodyParser = require('body-parser');

const userRoute = require("./Routes/User");
const bookRoute = require("./Routes/Book");

const server = express();
const PORT = process.env.PORT || 5000;
var url = process.env.DATABASEURL || "mongodb://localhost/good-reads";

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if(err)
        console.error(err);
    else
        console.log("DB connected");
});
server.use(bodyParser.urlencoded({extended: true}));

server.use(bodyParser.json());
server.use("/user", userRoute);
server.use("/book", bookRoute);

server.listen(PORT, (err) => {
    if(err)
        console.log(err);
    else
        console.log(`The server is running on port: ${PORT}`)
});