const express = require("express")
const router = express.Router()
const { protectedRoute } = require("../controllers/protectedController")
const verifyToken = require("../middlewares/verifyToken")

router.get("/dashboard", verifyToken, protectedRoute)

module.exports = router