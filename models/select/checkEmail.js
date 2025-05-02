const db = require("../../config/auth.js")
const logger = require("../../utils/logger.js")
async function isEmailAvailable(email) {
  try {
    logger.info(`checking email duplicate`)
    const query = `SELECT 1 FROM auth WHERE email = ? `
    const [rows] = await db.execute(query, [email])
    if (rows.length > 0) {
      logger.warn(`Email ${email} already exists in database.`);
      return false
    }
    logger.info("successfully email not duplicate")
    return rows.length === 0
  } catch (e) {
    logger.error(`Failed to check email: ${email} | Error: ${e.message}`);
    logger.error(`Error checking email for ${email} | ${e instanceof Error ? e.stack : e
      }`);
    return false
  }
}
module.exports = isEmailAvailable