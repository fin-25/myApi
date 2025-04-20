const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "p",
  password: "hai",
  database: "user",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
const connection = pool.promise()

connection.getConnection()
.then(conn => {
  console.log("Successfully Connected To The Database")
  conn.release()
})
.catch(err => {
  console.log("Database Connection Failed: ", err)
  process.exit(1)
})
pool.on("connection", (connection) => {
  console.log("New connection established with ID: ", connection.threadId)
})

pool.on("error", (err) => {
  console.error("Database connection error: ", err)
})
module.exports = connection 
