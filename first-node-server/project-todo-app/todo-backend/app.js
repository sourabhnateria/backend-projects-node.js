require("dotenv").config();
const express = require("express");
const app = express();
const errorsController = require("./controllers/errors");
const cors = require("cors");

const { default: mongoose } = require("mongoose");

const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGO_URL = process.env.MONGO_URL;

const path = require("path");
const { todo } = require("node:test");
const todoItemsRouter = require("./routes/todoItemsRouter");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use("/api/todo", todoItemsRouter);
app.use(errorsController.pageNotFound);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
