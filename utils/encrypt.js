const bcrypt = require("bcryptjs")

async function hashing(value) {
  try {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(value, salt)
  return hash
  }catch(e) {
    console.error(e)
  }
}
async function compared(value) {
  try {
  const compare = await bcrypt.compare(value)
  return value
  }catch(e) {
    console.error(e)
  }
}
module.exports = {
  hashing,
  compared
}