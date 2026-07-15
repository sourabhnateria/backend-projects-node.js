// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const hostController = require("../controllers/host");

hostRouter.get("/add-home", hostController.getAddHome);

hostRouter.post("/add-home", hostController.postAddHome);

hostRouter.get("/host-home", hostController.getHostHomes);

hostRouter.get("/add-home/:homeId", hostController.getEditHome);

hostRouter.post("/postedit-host-home", hostController.postEditHome);

hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);
module.exports = hostRouter;
