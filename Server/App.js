const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");


const userRoute = require("./Routes/User");
const bookRoute = require("./Routes/Book");
const categoryRoutes = require("./Routes/Category");
const authorRoutes = require("./Routes/authors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use("/author", authorRoutes);
app.use(categoryRoutes);
require("./boot/dbConnection");

app.listen(PORT, (err) => {
    if(err)
        console.log(err);
    else
        console.log(`The server is running on port: ${PORT}`)
});
