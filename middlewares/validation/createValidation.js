const logger = require("../../utils/logger.js");

function createValidation(data) {
  return function (req, res, next) {
    const { username = "", email = "", password } = req.body
    console.log(username, email, password)

    const sendError = (key, msg) => {
      // Log jika terjadi error validasi
      logger.warn(`Validation failed for ${key}: ${msg}`);
      return res.status(400).json({
        success: false,
        code: 400,
        error: { [key]: msg }
      });
    };

    // Log: Memulai validasi
    logger.info('Starting validation for request body:', req.body);

    for (const [key, option] of Object.entries(data)) {
      console.log(key, option)
      console.log("Checking", key, typeof option.validator)
      const value = req.body[key]
      console.log(value)

      if (!Object.prototype.hasOwnProperty.call(req.body, key)) {
        return sendError(key, "is missing")
      }
      if (typeof value !== "string") {
        return sendError(key, "type is not string")
      }
      if (value.trim() === "") {
        return sendError(key, "cannot be empty")
      }

      console.log("option.validator =", option.validator)
      console.log("typeof validator =", typeof option.validator)

      if (typeof option.validator !== "function") {
        throw new Error(`Validator untuk '${key}' tidak valid`);
      }
      if (!option.validator(value)) {
        return sendError(key, "invalid format")
      }
    }

    // Log: Validasi berhasil
    logger.info('Validation successful for request body');

    req.validate = {}
    for (const key of Object.keys(data)) {
      req.validate[key] = key === "password" ? req.body[key] : req.body[key].trim()
    }
    return next()
  }
}

module.exports = createValidation