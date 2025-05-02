const express = require("express")

const router = express.Router()

const verifyOtpController =
  require("../../../controllers/auth/register/verifyOtpController.js")


router.post("/verify-otp", verifyOtpController)

module.exports = router