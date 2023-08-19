const userModel = require('../Models/userModel')
require("dotenv").config()
const jwt = require("jsonwebtoken")

// req.headers.authorization format ----> Bearer <token>
const userVerification = async (req, res, next) => {
    let token = req.cookies.token;
    console.log(token)
    try {

    }
    catch (err) {
        res.status(401).json({ message: "UnAuthorised" })
    }

    if (!token) {
        res.status(401).json({ message: "UnAuthorised-no token" })
    }
    next()
}

module.exports = userVerification