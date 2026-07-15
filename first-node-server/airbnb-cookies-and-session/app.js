const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
app.set("view engine", "ejs");
app.set("views", "views");
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGO_URL =
  "mongodb+srv://sourabhnateriacse_db_user:st9QBFcO2KWn7deC@cluster0.fz2fk3p.mongodb.net/airbnb?appName=Cluster0";

app.use((req, res, next) => {
  console.log(`Incoming Request -> Method: ${req.method} | URL: ${req.url}`);
  next();
});

const userRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const { get404 } = require("./controllers/store");
const path = require("path");
const { default: mongoose } = require("mongoose");

app.use(express.static(path.join(__dirname, "public")));

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  }),
);
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else res.redirect("/login");
});

app.use("/host", hostRouter);
app.use(authRouter);

app.use(get404);

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
