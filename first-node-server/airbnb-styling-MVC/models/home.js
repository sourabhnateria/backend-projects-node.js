const fs = require("fs");
const path = require("path");

//fake database
const registeredHomes = [];

module.exports = class Home {
  constructor(houseName, Price, Location, Rating, Image) {
    this.houseName = houseName;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.Image = Image;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homepath = path.join(__dirname, "../data/homes.json");
      fs.writeFile(homepath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    const homedatapath = path.join(__dirname, "../data/homes.json");
    fs.readFile(homedatapath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
