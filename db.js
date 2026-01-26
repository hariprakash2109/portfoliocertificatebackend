const mysql = require("mysql2");

console.log("MYSQL_HOST =", process.env.MYSQL_HOST);
console.log("MYSQL_USER =", process.env.MYSQL_USER);

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10
});

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ MySQL connected successfully!");
    conn.release();
  }
});

module.exports = db.promise();
