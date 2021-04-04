const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
var url = process.env.DATABASE_URL || "mongodb://localhost/good-reads";

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongo db is connected");
  }
);
