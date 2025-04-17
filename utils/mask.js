function mask(rows, fields=["password", "token"]) {
  const data = {...rows}
  fields.forEach(f => {
    if(typeof data[f] === "string") {
       data[f] = "******"
    }else if(data[f] == null || data[f] == undefined){}else {
      console.warn("Unexpected Type In Mask | Fields: ", f, "| Value Of: ", data[f])
    }
  })
  return data
}
module.exports = mask