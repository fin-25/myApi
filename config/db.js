const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "12345",
  database: "user",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
const connection = pool.promise()

module.exports = connection 