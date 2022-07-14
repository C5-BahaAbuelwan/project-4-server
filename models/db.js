const mongoose = require("mongoose");
const dotenv =require("dotenv").config();

// connecting to mongodb
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9ol4q.mongodb.net/?retryWrites=true&w=majority`).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);
    