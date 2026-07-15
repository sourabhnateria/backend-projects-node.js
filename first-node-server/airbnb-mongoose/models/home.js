const mongoose = require("mongoose");
const favourites = require("./favourites");

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
  },
  description: {
    type: String,
  },
});

homeSchema.pre("findOneAndDelete", async function (next) {
  const homeId = this.getQuery()._id;
  await favourites.deleteMany({ houseId: homeId });
  // next();
});

module.exports = mongoose.model("Home", homeSchema);
