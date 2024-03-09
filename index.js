const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3300;

app.use(express.json());

const blog = require("./routes/blog.routes.js");
app.use("/api/v1", blog);

const connectDB = require("./config/database.js");
connectDB();

app.listen(port, () => {
  console.log("Server Started on port: ", port);
});

app.get("/", (_, res) => {
  res.send(`<h1>Hello World</h1>`);
});
