require("dotenv").config()
function debugLog(message, ...args) {
  if(process.env.DEBUG === "true") console.log(`[DEBUG LOG] ${message}`, ...args)
}
function debugWarn(message, ...args) {
  if(process.env.DEBUG === "true") console.warn(`[DEBUG WARN] ${message}`, ...args)
}
function debugErr(message, ...args) {
  if(process.env.DEBUG === "true") console.error(`[DEBUG ERROR] ${message}`, ...args)
}

module.exports = {
  debugLog,
  debugWarn,
  debugErr
}