//THIS IS DATABASE RELATED CODE
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, Price, Location, Rating, Image, description, _id) {
    this.houseName = houseName;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.Image = Image;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    if (this._id) {
      //update case
      return db.collection("homes").updateOne(
        { _id: new ObjectId(String(this._id)) },
        {
          $set: {
            houseName: this.houseName,
            Price: this.Price,
            Location: this.Location,
            Rating: this.Rating,
            Image: this.Image,
            description: this.description,
          },
        },
      );
    } else {
      //insert case
      return db
        .collection("homes")
        .insertOne(this)
        .then((result) => {
          console.log(result);
        });
    }
  }
  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};

// THIS IS FILE RELATED CODE
// const fs = require("fs");
// const path = require("path");

// //fake database
// const registeredHomes = [];

// const homedatapath = path.join(__dirname, "../data/homes.json");

// module.exports = class Home {
//   constructor(houseName, Price, Location, Rating, Image) {
//     this.houseName = houseName;
//     this.Price = Price;
//     this.Location = Location;
//     this.Rating = Rating;
//     this.Image = Image;
//   }

//   save() {
//     Home.fetchAll((registeredHomes) => {
//       if (this.id) {
//         //this is edit home case
//         registeredHomes = registeredHomes.map((home) =>
//           home._id === this.id ? this : home,
//         );
//       } else {
//         //this is add home case
//         this.id = Math.random().toString();
//         registeredHomes.push(this);
//       }

//       const homepath = path.join(__dirname, "../data/homes.json");
//       fs.writeFile(homepath, JSON.stringify(registeredHomes), (err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//     });
//   }

//   static fetchAll(callback) {
//     fs.readFile(homedatapath, (err, data) => {
//       callback(!err ? JSON.parse(data) : []);
//     });
//   }

//   static findById(homeId, callback) {
//     this.fetchAll((home) => {
//       const homeFound = home.find((home) => home._id === homeId);
//       callback(homeFound);
//     });
//   }

//   static deleteById(homeId, callback) {
//     this.fetchAll((homes) => {
//       homes = homes.filter((home) => home._id !== homeId);
//       fs.writeFile(homedatapath, JSON.stringify(homes), callback);
//     });
//   }
// };
