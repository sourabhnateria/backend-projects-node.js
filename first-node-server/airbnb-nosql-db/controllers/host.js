const Home = require("../models/home");
const Favourite = require("../models/favourites");
exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "add-home",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  // console.log("Edit route hit");
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];

    if (!home) {
      console.log("Home not found");
      return res.redirect("/host/host-home");
    }
    console.log(homeId, editing, home);
    res.render("host/add-home", {
      pageTitle: "Edit your home",
      currentPage: "host-homes",
      editing: editing,
      home: home,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, Price, Location, Rating, Image, description } =
    req.body;
  const home = new Home(
    houseName,
    Price,
    Location,
    Rating,
    Image,
    description,
    id,
  );
  home.save();

  res.redirect("/host/host-home");
};
exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("host/host-home", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, Price, Location, Rating, Image, description } = req.body;
  const home = new Home(houseName, Price, Location, Rating, Image, description);
  home.save();
  res.render("host/homeadded", {
    pageTitle: "Home Added",
    currentPage: "homeadded",
  });
  res.redirect("/host/host-home");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting home with ID:", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home");
    })
    .catch((error) => {
      console.log("Error while deleting home:", error);
    });
  // Favourite.deleteFavouritesById(homeId)
  //   .then(() => {
  //     console.log("Deleted home from favourites");
  //   })
  //   .catch((error) => {
  //     console.log("Error while deleting home from favourites:", error);
  //   });
};
