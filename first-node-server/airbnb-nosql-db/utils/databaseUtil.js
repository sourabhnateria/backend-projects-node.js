const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "MyNewPassword",
  database: "airbnb",
});

module.exports = pool.promise();
