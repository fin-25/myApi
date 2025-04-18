const connection = require("../config/db.js")
const respond = require("../utils/wrapResponse.js")
const util = require("util")
const createDuration = require("../utils/createDuration.js")
const mask = require("../utils/mask.js")
const {debugLog, debugWarn, debugErr} = require("../utils/debug.js")
const {isValidUUID} = require("../utils/validReg.js")

async function getDatabase(id) {
  const startISO = new Date().toISOString()
  const startTimesTamp = Date.now()
  try {
  if(!isValidUUID(id)) {
    return respond({
      success: false,
      code: 400,
      data: {
        query: id
      },
      message: "Format Invalid",
      start: startISO,
      startTime: startTimesTamp
    })
  }
  const query = `SELECT id, username, email, password FROM user WHERE id = ?`
  
  debugLog(startISO, "Executing Query: ", query, "With Value", id)
  const [rows, fields] = await connection.execute(query, [id])
  const user = rows.length > 0 ? mask(rows[0]) : null
  debugLog(startISO, "Fetched ",rows.length, "rows(s)", ", fields: ", fields.length )
  if(rows.length > 0) {
    return respond({
      success: true,
      code: 200,
      data: user,
      message: "User Found!",
      start: startISO,
      startTime: startTimesTamp
      })
    }
    debugWarn(startISO, "[DB] User Not Found | ID: ", id)
    return respond({
      success: false,
      code: 404,
      data: {
        query: id
      },
      message: "No User Found With That ID.",
      start: startISO,
      startTime: startTimesTamp
    })
  }catch(e) {
    console.error(`[DB ERROR] ${e instanceof Error ? e.message : e}`)
    debugErr(startISO, "[DB ERROR DEBUG] Full Error Object: ", util.inspect(e))
  return respond({
    success: false,
    code: 500,
    data:{
      query: id
    }, 
    message: e instanceof Error ? e.message : "Unknown Error",
    start: startISO,
    startTime: startTimesTamp
    })
  }
  finally {
    debugLog(startISO, "Query Finished In", createDuration(startTimesTamp))
  }
}
getDatabase("af52fa8d-fc74-4cfd-a3c7-521fb6296749")
//module.exports = getDatabase