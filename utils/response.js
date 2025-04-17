function response({
  success = null,
  code = null,
  data = null,
  message = null,
  start = null,
  end = null,
  duration = null
}) {
  const durationMs = duration ?? (Date.parse(end) - Date.parse(start))
  return {
    success,
    code,
    data,
    message,
    start,
    end,
    ms: `${durationMs}ms`
  }
}
module.exports = response