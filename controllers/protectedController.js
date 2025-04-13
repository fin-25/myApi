function protectedRoute(req, res) {
  res.json({
    message: "Welcome to protected route",
    userData: req.user
  })
}
module.exports = {protectedRoute}