// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const homesController = require("../controllers/store");

storeRouter.get("/", homesController.getIndex);
storeRouter.get("/home", homesController.getHomes);
storeRouter.get("/bookings", homesController.getBookings);
storeRouter.get("/favourites", homesController.getFavouriteList);
storeRouter.get("/home/:homeId", homesController.getHomeDetails);
storeRouter.post("/favourites", homesController.postFavouriteList);
storeRouter.post("/favourites/:homeId", homesController.deleteFavouriteList);

module.exports = storeRouter;
