function createDuration(start) {
  if(typeof start === "number") console.log("Time Invalid!!", start)
  const time = Date.now() - start
  return time + "ms"
}

module.exports = createDuration