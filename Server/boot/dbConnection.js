const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongo db is connected");
  }
);

