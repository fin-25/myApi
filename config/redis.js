const { createClient } = require("redis")

const redis = createClient()

redis.on("error", e => console.error("redis error", e))
redis.connect()

module.exports = redis