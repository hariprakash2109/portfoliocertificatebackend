const mysql = require("mysql2");

// Debug logs (Remove later in production)
console.log("MYSQL_HOST =", process.env.MYSQL_HOST);
console.log("MYSQL_USER =", process.env.MYSQL_USER);

const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "sql.freesqldatabase.com",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5,   // FreeSQLDB has low limits
  queueLimit: 0,
});

// Test connection
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ MySQL connected successfully!");
    conn.release();
  }
});

module.exports = db.promise();
