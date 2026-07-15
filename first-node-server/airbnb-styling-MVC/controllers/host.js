const Home = require("../models/home");
exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "add-home",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    }),
  );
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, Price, Location, Rating, Image } = req.body;
  const home = new Home(houseName, Price, Location, Rating, Image);
  home.save();
  res.render("host/homeadded", {
    pageTitle: "Home Added",
    currentPage: "homeadded",
  });
};
