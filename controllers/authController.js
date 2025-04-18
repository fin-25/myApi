const {v4:uuidv4} = require("uuid")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const util = require("util")
const createDuration = require("../utils/createDuration.js")
const {debugLog, debugErr, debugWarn} = require("../utils/debug.js")
const {hashing, compared} = require("../utils/hashAndCompare.js")
const connection = require("../config/db.js")
const respond = require("../utils/wrapResponse.js")
const mask = require("../utils/mask.js")
require("dotenv").config()


async function userRegistration(req, res) {
  console.log(req.validatedUser)
  const startISO = new Date().toISOString()
  const startTimestamp = Date.now()
  if (!process.env.SECRET || !process.env.JWT_EXPIRE) {
    return res.status(500).json(respond({
      success: false,
      code: 500,
      message: "JWT Configuration Missing",
      start: startISO,
      startTime: startTimestamp
    }))
  }
  const exists = ["username","email", "password"]
  for(const e of exists) {
    if(!req.validatedUser?.[e]) {
    return res.status(400).json(respond({
      success: false,
      code: 400,
      data: {[e]: null },
      message: `Missing Validated User ${e}`,
      start: startISO,
      startTime: startTimestamp
    }))
    }
  }
  const {username, email, password} = req.validatedUser
  const id = uuidv4()
  try {
    const token = jwt.sign({
      id,
      username,
      email,
      permission: true
    }, process.env.SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    })
    const hashToken = await hashing(token)
    const hashPassword = await hashing(password)
    const jwtExpiryInSec = parseInt(process.env.JWT_EXPIRE.replace(/[^\d]/g, ""), 10)
    const expired = new Date(Date.now() + jwtExpiryInSec * 1000)
    const query = `INSERT INTO user(uuid, username, email, password, token, expired_at) VALUES(?,?,?,?,?,?)`
    debugLog(startISO, " | [INSERT USER]","Executing Query: ", query," | Values", id, username, email, hashPassword, hashToken, expired)
    const [result] = await connection.execute(query, [id,username, email, hashPassword, hashToken, expired ])
    debugLog(startISO, "| Request Validate In ", createDuration(startTimestamp))
    return res.status(201).json(respond({
      success: true,
      code: 201,
      data: mask({id, username, email, password, token}, ["password", "token"]),
      message: "User Registered Successfully",
      start: startISO,
      startTime: startTimestamp
      
    }))
  } catch (e) {
    console.error(`${startISO} | [DB ERROR] ${e instanceof Error ? e.message : e}`)
    debugErr(startISO, "[DB ERROR DEBUG] | Full Error Object ", util.inspect(e))
    return res.status(500).json(respond({
      success: false,
      code: 500,
      data: mask({id, username, email, password}),
      message: e instanceof Error ? e.message: e,
      start: startISO,
      startTime: startTimestamp
    }))
  }finally {
    debugLog(startISO, "| [",req.method," ",req.originalUrl, "] Request Validate successfully In ", createDuration(startTimestamp))
  }
}
module.exports = userRegistration