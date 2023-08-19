const userModel = require('../Models/userModel')
const generateToken = require('../util/secretToken')
const bcrypt = require('bcrypt')
const { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged,signOut } = require('firebase/auth')
const { initializeApp } = require('firebase/app')

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const signUp = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(auth.currentUser)
        res.json({ meaasge: "Account Created. Please verify your email", user })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await signInWithEmailAndPassword(auth, email, password)
        res.json({ verified: user.user.emailVerified,message:"loggedIn" })
    }
    catch (err) {
        res.json({ success: false, errmessage: err.message })
    }
}
const logout = async (req, res) => {
    try {
        await signOut(auth)
        res.json({ message:"loggedOut" })
    }
    catch (err) {
        res.json({ success: false, errmessage: err.message })
    }
}
const user_data = async (req, res) => {
    onAuthStateChanged(auth, user => {
        if (user) {
            res.json({ user: user.email })
        } else {
            res.json({ message: 'Not logged In' })
        }
    })
}
module.exports = { signUp, login, logout, user_data }