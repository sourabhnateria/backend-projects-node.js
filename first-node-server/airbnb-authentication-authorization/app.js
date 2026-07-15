require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
app.set("view engine", "ejs");
app.set("views", "views");
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const User = require("./models/user");

const MONGO_URL = process.env.MONGO_URL;

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
    saveUninitialized: false,
    store: store,
  }),
);
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use((req, res, next) => {
  if (!req.session || !req.session.userId) {
    res.locals.isLoggedIn = false;
    res.locals.user = null;
    return next();
  }

  User.findById(req.session.userId)
    .then((user) => {
      if (user) {
        req.user = user; // Makes req.user available inside your store controllers
        res.locals.isLoggedIn = true;
        res.locals.user = user; // Makes user variable available automatically inside nav.ejs
      } else {
        res.locals.isLoggedIn = false;
        res.locals.user = null;
      }
      next();
    })
    .catch((err) => {
      console.error("Error fetching user in app.js middleware:", err);
      next();
    });
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
