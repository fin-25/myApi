
const isValidOtp = (otp) => /^[0-9]{6}$/.test(otp);

const isValidUuid = (uuid) =>
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
  
const isValidUsername = (username) =>
  /^(?!.*[._-]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._-]{1,18}[a-zA-Z0-9])?$/.test(username);

const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const isValidPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

module.exports = {
  isValidOtp,
  isValidUsername,
  isValidEmail,
  isValidPassword
}