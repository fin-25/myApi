const jwt = require("jsonwebtoken")

function generateToken(payload, expiresIn) {
  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn
  })
}
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return null
  }
}
module.exports = {generateToken, verifyToken}