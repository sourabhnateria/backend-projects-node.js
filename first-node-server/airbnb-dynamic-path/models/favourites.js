const fs = require("fs");
const path = require("path");

//fake database

const favouritedatapath = path.join(__dirname, "../data/favourites.json");

module.exports = class Favourite {
  static addToFavourites(homeId, callback) {
    Favourite.getFavourites((favouritesHomes) => {
      if (!favouritesHomes.includes(homeId)) {
        console.log("adding home to favourites", homeId);
        favouritesHomes.push(homeId);
        fs.writeFile(
          favouritedatapath,
          JSON.stringify(favouritesHomes),
          callback,
        );
      } else {
        callback("home already in favourites");
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouritedatapath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteFavouritesById(homeId, callback) {
    this.getFavourites((favouritesHomes) => {
      favouritesHomes = favouritesHomes.filter((id) => id !== homeId);
      fs.writeFile(
        favouritedatapath,
        JSON.stringify(favouritesHomes),
        callback,
      );
    });
  }
};
