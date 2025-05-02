const verifyOtpService =
  require("../../../services/auth/register/verifyOtpService.js")
const logger = require("../../../utils/logger.js")

async function verifyOtpContoller(req, res, next) {
  try {
    const { email, otp } = req.body

    // Log jika email atau OTP tidak ada
    if (!email || !otp) {
      logger.warn(`Missing email or otp in the request | email: ${email}, otp: ${otp}`)
      return res.status(400).json({
        success: false,
        code: 400,
        message: "email and otp are required"
      })
    }

    // Log bahwa verifikasi OTP dimulai
    logger.info(`Starting OTP verification for email: ${email}`)

    const data = await verifyOtpService(email, otp)

    // Log jika OTP berhasil diverifikasi
    logger.info(`OTP successfully verified for email: ${email}`)

    res
      .cookie("refreshToken", data.token.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
      })
      .status(data.code)
      .json({
        success: true,
        message: data.message,
        token: data.token.clientToken,
        user: data.users
      })
  } catch (e) {
    // Log jika terjadi error
    logger.error(`OTP verification failed for email: ${req.body.email} | Error: ${e.message}`)

    return res.status(500).json({
      success: false,
      code: 500,
      message: e.message || "internal server error"
    })
  }
}

module.exports = verifyOtpContoller