const Home = require("../models/home");
const Favourite = require("../models/favourites");

exports.getIndex = (req, res, next) => {
  console.log("session value:", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Index",
      isLoggedIn: req.isLoggedIn,
    });
  });
};
exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      res.render("store/favourite", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourite List",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.postFavouriteList = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId })
    .then((favourite) => {
      if (favourite) {
        console.log("already added", favourite);
        res.redirect("/favourites");
      } else {
        favourite = new Favourite({
          houseId: homeId,
        });
        favourite.save().then((result) => {
          console.log("Added to favourites", req.body.id);
        });
        res.redirect("/favourites");
      }
    })
    .catch((err) => {
      console.log("Error adding to favourites", err);
      res.redirect("/favourites");
    });
};

exports.deleteFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting home from favourites with ID:", homeId);
  Favourite.findOneAndDelete({ houseId: homeId })
    .then(() => {
      console.log("Deleted home from favourites", homeId);
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while deleting home from favourites:", err);
      res.redirect("/favourites");
    });
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
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};

exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    currentPage: "404",
    isLoggedIn: req.isLoggedIn,
  });
};
// exports.registeredHomes = registeredHomes;
