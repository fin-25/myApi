const jwt = require("jsonwebtoken")
function verifyToken(req, res, next) {
  const authHeaders = req.headers["authorization"]
  const token = authHeaders && authHeaders.split(" ")[1]
  if(!token) {
    return res.status(401).json({
      message: "Access Denied, Token Missing"
    })
  }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decode
      next()
    } catch (e) {
      return res.status(403).json({
        message: "Invalid Or Expired Token"
    })
  }
}
module.exports = verifyToken