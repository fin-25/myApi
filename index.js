require("dotenv").config()
const express = require("express")
const app = express()
const router = require("./routes/authRoutes.js")
const router2 = require("./routes/protectedRoutes.js")
const port = process.env.PORT || 3000

app.get("/test", (req, res) => {
  res.status(200).send("hai")
})
app.use(express.json())
app.use("/user", router)
app.use("/verify", router2)
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint Not Found" })
  
})
app.listen(port, () => {
  console.log("port running on ", port)
})