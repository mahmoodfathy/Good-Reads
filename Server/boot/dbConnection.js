const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
var url = process.env.DATABASEURL || "mongodb://localhost/good-reads";

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongo db is connected");
  }
);

