const express = require("express")
const router = express.Router()
const validateRegisterBody = require("../middlewares/bodyRequestValid.js")
const ensureEmailUnique = require("../services/checkingEmailExists.js")
const userRegistration = require("../controllers/authController.js")

router.post("/register",validateRegisterBody, ensureEmailUnique, userRegistration)



module.exports = router