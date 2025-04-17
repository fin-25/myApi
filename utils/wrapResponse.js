const response = require("../utils/response.js")
const createDuration = require("../utils/createDuration.js")
function respond({
  success,
  code,
  data,
  message,
  start,
  startTime
}) {
  return response({
    success,
    code,
    data,
    message,
    start,
    end: new Date().toISOString(),
    duration: createDuration(startTime)
  })
}
module.exports = respond