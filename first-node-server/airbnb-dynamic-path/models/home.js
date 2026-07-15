const fs = require("fs");
const path = require("path");

//fake database
const registeredHomes = [];

const homedatapath = path.join(__dirname, "../data/homes.json");

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
      if (this.id) {
        //this is edit home case
        registeredHomes = registeredHomes.map((home) =>
          home.id === this.id ? this : home,
        );
      } else {
        //this is add home case
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      const homepath = path.join(__dirname, "../data/homes.json");
      fs.writeFile(homepath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homedatapath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((home) => {
      const homeFound = home.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }

  static deleteById(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);
      fs.writeFile(homedatapath, JSON.stringify(homes), callback);
    });
  }
};
