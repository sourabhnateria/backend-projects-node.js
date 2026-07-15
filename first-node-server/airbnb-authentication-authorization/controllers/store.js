const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  console.log("--- DEBUGGING EJS VARIABLES ---");
  console.log("isLoggedIn Status:", req.session.isLoggedIn);
  console.log(
    "Raw user object keys:",
    req.user ? Object.keys(req.user._doc || req.user) : "No User Found",
  );
  console.log(
    "Actual userType value:",
    req.user ? req.user.userType : "Undefined",
  );
  console.log("-------------------------------");
  console.log("session value:", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Index",
      isLoggedIn: req.session.isLoggedIn,
      user: req.user,
    });
  });
};
exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.user,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.session.isLoggedIn,
    user: req.user,
  });
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.userId;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favourite", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourite List",
    currentPage: "favourites",
    isLoggedIn: req.session.isLoggedIn,
    user: req.user,
  });
};
exports.postFavouriteList = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.userId;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.deleteFavouriteList = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.userId;
  const user = await User.findById(userId);
  user.favourites.pull(homeId);
  await user.save();
  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  console.log("homeId", homeId);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("home details not found");
      res.redirect("/home");
    } else {
      console.log("home details found", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home",
        isLoggedIn: req.session.isLoggedIn,
        user: req.user,
      });
    }
  });
};

exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    currentPage: "404",
    isLoggedIn: req.session.isLoggedIn,
    user: req.user,
  });
};
// exports.registeredHomes = registeredHomes;
