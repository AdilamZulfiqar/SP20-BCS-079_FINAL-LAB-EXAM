const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const Pizza = require("./models/pizzaModel");

app.use(express.json());
mongoose.set("strictQuery", true);
require("./db");

app.use(require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("Working");
});

const port = process.env.PORT || 5000;
app.listen(5000, console.log("Server Running"));
