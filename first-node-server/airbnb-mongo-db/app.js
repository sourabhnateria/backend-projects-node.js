const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const userRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const { get404 } = require("./controllers/store");
const { mongoConnect } = require("./utils/databaseUtil");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(get404);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
