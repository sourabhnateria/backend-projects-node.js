const { getDb } = require("../utils/databaseUtil");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDb();
    return db
      .collection("favourites")
      .findOne({ houseId: this.houseId })
      .then((existingFavourite) => {
        if (!existingFavourite) {
          return db.collection("favourites").insertOne(this);
        }
        return Promise.resolve(); // Return a resolved promise if the favourite already exists
      });
  }

  // Returns only the array of raw home IDs matching old behavior
  static getFavourites() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  // Removes a home from the database table
  static deleteFavouritesById(homeId) {
    const db = getDb();
    return db.collection("favourites").deleteOne({ houseId: homeId });
  }
};
