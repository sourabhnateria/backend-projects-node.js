const Home = require("../models/home");
const fs = require("fs");
// const Favourite = require("../models/favourites");
exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "add-home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.userId,
  });
};

exports.getEditHome = (req, res, next) => {
  // console.log("Edit route hit");
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
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
      isLoggedIn: req.isLoggedIn,
      user: req.session.userId,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, Price, Location, Rating, description } = req.body;

  const Image = req.file.path;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.Price = Price;
      home.Location = Location;
      home.Rating = Rating;
      home.description = description;

      if (req.file) {
        fs.unlink(home.Image, (err) => {
          if (err) {
            console.log("Error while deleting image", err);
          }
        });
        home.Image = req.file.path;
      }

      home
        .save()
        .then((result) => {
          console.log("home updated", result);
        })
        .catch((err) => {
          console.log("Error while updating home", err);
        });
      res.redirect("/host/host-home");
    })
    .catch((err) => {
      console.log("Error while finding home", err);
    });
};
exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, Price, Location, Rating, description } = req.body;
  console.log(houseName, Price, Location, Rating, description);
  console.log(req.file);
  if (!req.file) {
    return res.status(400).send("No image uploaded");
  }

  const Image = req.file.path;
  const home = new Home({
    houseName,
    Price,
    Location,
    Rating,
    Image,
    description,
  });
  home.save().then(() => {
    console.log("Home added successfully");
  });
  res.redirect("/host/host-home");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting home with ID:", homeId);
  Home.findByIdAndDelete(homeId)
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
