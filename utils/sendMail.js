const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: process.env.OWNER_PASSWORD
  }
})



async function sendMail(option) {
  try {
    await transporter.sendMail({
      from: `My App ${process.env.OWNER_EMAIL}`,
      to: option.email,
      subject: option.subject,
      text: option.text,
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
module.exports = sendMail