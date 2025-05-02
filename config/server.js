
const express = require("express")
const app = express()
const port = process.env.PORT
const server = app.listen(port)

const loggingMiddleware = require("../middlewares/logging/loggingMiddelware.js")
const cookieParser = require("cookie-parser")
const routerAuth = require("../routes/auth/register/index.js")

app.use(loggingMiddleware)
app.use(cookieParser())
app.use(express.json())
app.use("/auth", routerAuth)

module.exports = server