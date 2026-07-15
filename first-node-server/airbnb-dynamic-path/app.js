const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const userRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const { get404 } = require("./controllers/store");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(get404);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
