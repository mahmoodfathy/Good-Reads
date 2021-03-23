const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const morgan = require("morgan");
const categoryRoutes = require("./Routes/Category");
const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

app.use(categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
