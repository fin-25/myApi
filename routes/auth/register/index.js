const express = require("express")

const router = express.Router()

const registerAuth = require("./registerAuth.js")
const verifyOtpAuth = require("./verifyOtpAuth.js")

router.use("/", registerAuth)
router.use("/", verifyOtpAuth)

module.exports = router