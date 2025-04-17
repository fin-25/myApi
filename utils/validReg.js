function isValidUUID(uuid) {
  const data = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)
  return data
}
function isValidEmail(email) {
  const data = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  return data
}
function isValidPassword(password) {
  const data = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  return data
}
module.exports = {
  isValidUUID,
  isValidEmail,
  isValidPassword
}