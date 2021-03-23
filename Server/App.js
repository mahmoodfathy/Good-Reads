const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const morgan = require("morgan");
const categoryRoutes = require("./Routes/Category");
const bookRouter = require("./Routes/Book");
const authorRoutes = require("./Routes/authors");
const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
/** Routes */
app.use("/author", authorRoutes);
app.use("/book", bookRouter);
app.use(categoryRoutes);
require("./boot/dbConnection");

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
