require("dotenv").config();
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use((req, res, next) => {
  console.log(`Incoming Request -> Method: ${req.method} | URL: ${req.url}`);
  next();
});

const userRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const { get404 } = require("./controllers/store");
const path = require("path");
const { default: mongoose } = require("mongoose");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(get404);
const MONGO_URL = process.env.MONGO_URL;
// mongoConnect(() => {
//   app.listen(3000, () => {
//     console.log("Server is running on port 3000");
//   });
// });

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
