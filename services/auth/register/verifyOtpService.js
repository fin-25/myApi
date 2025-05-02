const redis = require("../../../config/redis.js");
const { verifyOtp } = require("../../../utils/otp.js");
const { generateToken } = require("../../../utils/token.js");
const createUser = require("../../../models/insert/createUser.js");
const logger = require("../../../utils/logger.js");

async function verifyOtpService(email, token) {
  try {
    logger.info(`Verifying OTP for email: ${email}`);

    const expiresIn = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 
    
    const secret = await redis.get(`otp:${email}`);

    if (!secret) {
      logger.warn(`OTP not found or expired for email: ${email}`);
      throw new Error("invalid otp or expired otp");
    }

    logger.info(`OTP secret retrieved for email: ${email}`);

    const valid = verifyOtp(secret, token);
    if (!valid) {
      logger.warn(`Invalid OTP token for email: ${email}`);
      throw new Error("invalid otp");
    }

    const data = await redis.get(`regdata:${email}`);
    if (!data) {
      logger.warn(`Registration data not found for email: ${email}`);
      throw new Error("registration data not found");
    }

    logger.info(`Registration data found for email: ${email}`);

    const { id, username, password } = JSON.parse(data);

    // Generate tokens
    const refreshToken = generateToken({ userId: id, email }, "30d");
    const clientToken = generateToken({ userId: id, email }, "5m");

    // Create user
    const user = await createUser({
      userId: id, username, email, password,
      token: refreshToken
    });

    logger.info(`User ${username} successfully created`);

    // Clean up OTP and registration data from Redis
    await redis.del(`otp:${email}`);
    await redis.del(`regdata:${email}`);

    return {
      success: true,
      code: 201,
      message: "user successfully registered",
      users: {
        userId: id,
        username,
        email,
      },
      refreshToken,
      clientToken
    };
  } catch (e) {
    logger.error(`Error during OTP verification for email: ${email} | Error: ${e instanceof Error ? e.stack : e}`);
    throw e;
  }
}

module.exports = verifyOtpService;