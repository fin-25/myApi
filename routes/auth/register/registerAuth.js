const express = require("express")

const router = express.Router()

const registerController =
  require("../../../controllers/auth/register/registerController.js")
  
const createValidation =
  require("../../../middlewares/validation/createValidation.js")
  
const { isValidUsername, isValidEmail, isValidPassword } =
  require("../../../utils/validation.js")
  
console.log("username", typeof isValidUsername)
const isValid = {
  username: {
    validator: isValidUsername
  },
  email: {
    validator: isValidEmail

  },
  password: {
    validator: isValidPassword
  }
}

router.post("/register", createValidation(isValid), registerController)

module.exports = router