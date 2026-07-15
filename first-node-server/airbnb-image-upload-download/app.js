require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { default: mongoose } = require("mongoose");
const multer = require("multer");
app.set("view engine", "ejs");
app.set("views", "views");
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const User = require("./models/user");

const MONGO_URL = process.env.MONGO_URL;

app.use((req, res, next) => {
  console.log(`Incoming Request -> Method: ${req.method} | URL: ${req.url}`);
  next();
});

const userRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const { get404 } = require("./controllers/store");
const path = require("path");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/host/uploads/", express.static(path.join(__dirname, "uploads")));
app.use("/home/uploads/", express.static(path.join(__dirname, "uploads")));

const randomString = (length) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(multer({ storage, fileFilter }).single("Image"));

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
