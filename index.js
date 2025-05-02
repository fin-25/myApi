require("dotenv").config()
const server = require("./config/server.js")
server.on("listening", () => {
  console.log("port listening on ", process.env.PORT)
})