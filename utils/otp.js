const speakeasy = require("speakeasy")

const OTP_CONFIG = {
  encoding: "base32",
  digits: 6,
  step: 300
}

function generateOtp() {
  const secret = speakeasy.generateSecret({ length: 20 }).base32
  const token= speakeasy.totp({
    secret,
    ...OTP_CONFIG
  })
  return {
    secret,
    token 
  }
}
function verifyOtp(secret, token) {
  if (typeof secret !== "string" ||
    typeof token !== "string") {
    return false
  }
  return speakeasy.totp.verify({
    secret,
    token,
    ...OTP_CONFIG,
    window: 1
  })
}
function getOtpRemainingTime(secret) {
  return speakeasy.totp.remainingSeconds({
    secret,
    encoding: "base32",
    step: OTP_CONFIG.step
  });
}
module.exports = {
  generateOtp,
verifyOtp, 
getOtpRemainingTime }