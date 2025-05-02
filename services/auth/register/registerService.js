const { v4: uuidv4 } = require("uuid")
const redis = require("../../../config/redis.js")
const isEmailAvailable = require("../../../models/select/checkEmail.js")
const sendMail = require("../../../utils/sendMail.js")
const { hashing } = require("../../../utils/encrypt.js")
const { generateOtp } = require("../../../utils/otp.js")
const logger = require("../../../utils/logger.js")

async function registerService(username, email, password) {
  try {
    const id = uuidv4()
    if (!(await isEmailAvailable(email))) {

      logger.warn(`[register blocked] email: ${email} already exists.`)

      throw new Error("email already exists, please use another email")
    }
    const hash = await hashing(password)
    const { secret, token } = generateOtp()
    await redis.set(`otp:${email}`, secret, { EX: 300 })
    await redis.set(`regdata:${email}`, JSON.stringify({
      id, username, password:
        hash
    }),
      { EX: 300 })
    await sendMail({
      email,
      subject: "your otp code",
      text: `Before continuing, please verify first. your otp is: ${token}`
    })

    logger.info(`otp sent to email: ${email}`)

    return {
      success: true,
      message: "otp has been sent to your email"
    }
  } catch (e) {
    logger.error(`Register service failed for ${email} | ${e instanceof Error ? e.stack : e}`);
    throw e;
  }
}
module.exports = registerService