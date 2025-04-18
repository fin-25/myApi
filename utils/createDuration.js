function createDuration(start) {
  if(typeof start !== "number" || isNaN(start)) {
    console.log("Time Invalid!!", start)
    return "NaNms"
  }
  const time = Date.now() - start
  return time + "ms"
}

module.exports = createDuration