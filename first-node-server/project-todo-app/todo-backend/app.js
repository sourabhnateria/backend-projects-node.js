const express = require("express");
const app = express();
const errorsController = require("./controllers/errors");
const cors = require("cors");

const { default: mongoose } = require("mongoose");

const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGO_URL =
  "mongodb+srv://sourabhnateriacse_db_user:st9QBFcO2KWn7deC@cluster0.fz2fk3p.mongodb.net/todo?appName=Cluster0";

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
