const userModel = require('../Models/userModel')
const generateToken = require('../util/secretToken')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const { name, contact, username, password } = req.body
        const existingUser = await userModel.findOne({ username })
        res.cookie('myCookie', 'hello', { maxAge: 86400000, httpOnly: true });
        if (existingUser) {
            res.json({ success: false, message: "Username already taken", taken: true })
        }
        else {
            const salt = await bcrypt.genSalt();
            let newPassword = await bcrypt.hash(password, salt);
            const user = new userModel({ name, contact, username, password: newPassword })

            let savedUser = await user.save()
            res.status(201).json({
                success: true, message: "Account created !", savedUser,
                token: generateToken(savedUser._id)
            })
        }

    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }
}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username })
        if (!user) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

        let match = await bcrypt.compare(password, user.password)

        res.cookie('myCookie', 'hello', { maxAge: 86400000, httpOnly: true });
        if (match) {
            let token = generateToken(user._id)

            res.cookie("cookie002", "cookie02", {
                expires: new Date('2025-12-09'),
                httpOnly: true
            })
            res.status(201).json({ message: "User logged in successfully", success: true, token });
        }
        else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }
    }
    catch (err) {
        res.json({ success: false, errmessage: err.message })
    }
}
const user_data = async (req, res) => {
    let user = await userModel.findById(req.user._id)
    res.status(200).json({ user })
}
module.exports = { signUp, login, user_data }