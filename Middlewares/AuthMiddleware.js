const userModel = require('../Models/userModel')
require("dotenv").config()
const jwt = require("jsonwebtoken")

// req.headers.authorization format ----> Bearer <token>
const userVerification = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //  get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT)

            // get user from the user
            req.user = await userModel.findById(decoded.id).select('-password')

            next()
        }
        catch (err) {
            res.status(401).json({message:"UnAuthorised"})
        }
    }
    if (!token) {
        res.status(401).json({message:"UnAuthorised-no token"})
    }
}

module.exports = userVerification