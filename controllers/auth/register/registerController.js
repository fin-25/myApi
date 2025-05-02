const registerService =
  require("../../../services/auth/register/registerService.js")
const logger = require("../../../utils/logger.js")

async function registerController(req, res, next) {
  try {
    const { username, email, password } = req.validate

    // Log yang menunjukkan bahwa request untuk registrasi diterima
    logger.info(`Starting registration process for email: ${email}`)

    const service = await registerService(username, email, password)

    // Log jika registrasi berhasil
    logger.info(`Registration successful for email: ${email}`)

    return res.status(200).json(service)
  } catch (e) {
    // Log jika terjadi error
    logger.error(`Registration failed for email: ${req.validate.email} | Error: ${e.message}`)

    return res.status(400).json({
      success: false,
      code: 400,
      error: e.message || "Something went wrong during registration"
    })
  }
}

module.exports = registerController