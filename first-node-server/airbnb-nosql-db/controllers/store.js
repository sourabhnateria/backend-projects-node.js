const Home = require("../models/home");
const Favourite = require("../models/favourites");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Index",
    });
  });
};
exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites()
    .then((favouritesHomes) => {
      return Home.fetchAll().then(([registeredHomes]) => {
        const favouriteHome = registeredHomes.filter((home) =>
          favouritesHomes.includes(home.id),
        );
        res.render("store/favourite", {
          registeredHomes: favouriteHome,
          pageTitle: "My Favourite List",
          currentPage: "favourites",
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postFavouriteList = (req, res, next) => {
  Favourite.addToFavourites(req.body.id)
    .then(() => {
      console.log("Added to favourites", req.body.id);
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error adding to favourites", err);
      res.redirect("/favourites");
    });
};

exports.deleteFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting home from favourites with ID:", homeId);
  Favourite.deleteFavouritesById(homeId)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while deleting home from favourites:", err);
      res.redirect("/favourites");
    });
};

// exports.deleteFavouriteList = (req, res, next) => {
//   const homeId = req.params.homeId;
//   console.log("Deleting home from favourites with ID:", homeId);
//   Favourite.deleteFavouritesById(homeId)
//     .then(() => {
//       res.redirect("/favourites");
//     })
//     .catch((err) => {
//       console.log("Error while deleting home from favourites:", err);
//       res.redirect("/favourites");
//     });
//   });
// };

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  console.log("homeId", homeId);
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("home details not found");
      res.redirect("/home");
    } else {
      console.log("home details found", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home",
      });
    }
  });
};

exports.get404 = (req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", currentPage: "404" });
};
// exports.registeredHomes = registeredHomes;
