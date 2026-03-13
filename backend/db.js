const mysql = require("mysql2");

const db_en = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "7170",
  database: "cyber_awareness"
});

const db_hi = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "7170",
  database: "cyber_awareness_hi"
});

console.log("MySQL pools ready");

module.exports = { db_en, db_hi };
