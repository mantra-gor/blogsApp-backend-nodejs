const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to DB Successfully Done ✅"))
    .catch((error) => console.log("Failed while connecting to DB ❌"));
};

module.exports = connectDB;
