const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "config.env") })


const mysql = require("mysql2")
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: process.env.WAIT_FOR_CONNECTION === "true",
  connectionLimit: parseInt(process.env.CONNECTION_LIMIT),
  queueLimit: parseInt(process.env.QUEUE_LIMIT)
})
const db = pool.promise()
pool.on("acquire", (connect) => {
  console.log("Connection acquired: " + connect.threadId)
})
pool.on("release", (connect) => {
  console.log("Connection released: " + connect.threadId)
})
pool.on("connection", (connect) => {
  console.log("Database connected: " + connect.threadId)
  connect.on("error", (error) => {
    console.error("Connection error: ", error)
  })
})



module.exports = db