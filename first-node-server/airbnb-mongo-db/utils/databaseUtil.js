const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

// Your exact, official Atlas string
const MONGO_URL =
  "mongodb+srv://sourabhnateriacse_db_user:st9QBFcO2KWn7deC@cluster0.fz2fk3p.mongodb.net/?appName=Cluster0";

let db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log("Connected successfully!");
      db = client.db("airbnb");
      callback(db);
    })
    .catch((err) => {
      console.log("error while connecting:", err);
    });
};

const getDb = () => {
  if (!db) {
    throw new Error("No database found!");
  }
  return db;
};

module.exports = {
  mongoConnect,
  getDb,
};
