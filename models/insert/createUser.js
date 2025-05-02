const db = require("../../config/auth.js");
const logger = require("../../utils/logger.js")
async function createUser({ userId, username, email, password, token }) {
  try {
    logger.info(`Inserting new user: ${username} (ID: ${userId}) into the database.`)
    const expired_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 1 bulan ke depan
    const query = `
      INSERT INTO auth (uuid, username, email, password, token, expired_at, is_verified)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [
      userId,
      username,
      email,
      password,
      token,
      expired_at,
      1
    ]);
    logger.info(`user: ${username} (ID:  ${userId}) successfully inserted into the database`)
    return { success: true, userId };
  } catch (e) {
    logger.error(`error inserting user: ${username}  (ID: ${userId}) | error:
    ${e.message} | stack: ${e.stack}`)
    throw new Error("Failed to create user: " + e.message);
  }
}

module.exports = createUser;