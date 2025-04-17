const express = require("express")
const app = express()
const router = require("./routes/authRoutes.js")
const router2 = require("./routes/protectedRoutes.js")
const port = process.env.PORT || 3000
const connectDB = require("./config/db.js")
require("dotenv").config()
connectDB()
app.use(express.json())
app.use("/user", router)
app.use("/verify", router2)
app.listen(port, () => {
  console.log("port running on ", port)
})