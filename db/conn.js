require("dotenv").config();
const mongoose = require("mongoose");

const conn = mongoose.connect(
   process.env.KEY,
  // "mongodb://localhost:27017/myapp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log("db connect 😊");
  }
);

module.exports = conn;
