const {v4:uuidv4} = require("uuid")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
async function register(req, res) {
  const {email, password} = req.body
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  
  if(!isValidEmail) {
     return res.status(400).json({error: "Email Invalid"})
    }
    if(!isValidPassword) {
      return res.status(400).json({error: "Password Invalid"})
    }
  const existEmail = await User.findOne({email})
    if(existEmail) {
      return res.status(400).json({error: "Email Already Registered"})
    }
    const hashing = await bcrypt.hash(password, 10)
    const user = new User({
      email,
      password: hashing
    })
    try {
      await user.save()
      const token = jwt.sign({
        userId: user._id,
        email: user.email
      }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      })
      
      res.status(201).json({
        message: "User Registered Successfully",
        token: token
      })
    }catch(error) {
      console.error(error )
      res.status(500).json({message: "Failed To Save User"})
    }
}
async function login(req, res) {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(!user) {
    return res.status(400).json({
      message: "User Not Found"
    })
  }
  const isMatch =  await bcrypt.compare(password, user.password)
  if(!isMatch) {
    return res.status(400).json({
      message: "Invalid Password"
    })
  }
  const token = jwt.sign({
    userId: user._id,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  })
  res.status(200).json({
    message: "Login Successfuly",
    token: token
  })
}
function verifyToken(req, res, next) {
  const authHeaders = req.headers["authorization"]
  const token = authHeaders && authHeaders.split(" ")[1]
  if(!token) {
    return res.status(401).json({
      message: "Access Denied, Token Missing"
    })
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decode
      next()
    } catch (e) {
      return res.status(403).json({
        message: "Invalid Or Expired Token"
      })
    }
  }
}

module.exports = {register, login, verifyToken}