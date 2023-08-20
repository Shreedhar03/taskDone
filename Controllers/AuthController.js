const userModel = require('../Models/userModel')
const { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut } = require('firebase/auth')
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
        let newUser = new userModel({
            email
        })
        await newUser.save()
        res.json({ success: true, message: "Account Created. Please verify your email", user,newUser })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await signInWithEmailAndPassword(auth, email, password)
        if (!user.user.emailVerified)
            return res.json({ success: false, message: `Please verify your email` })
        res.json({ success: true, message: `LoggedIn as ${user.user.email}` })
    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }
}
const logout = async (req, res) => {
    try {
        await signOut(auth)
        res.json({ message: "loggedOut" })
    }
    catch (err) {
        res.json({ success: false, errmessage: err.message })
    }
}
const user_data = async (req, res) => {
    const user = auth.currentUser
    let userData = await userModel.findOne({email:user?.email})
    return user ? res.json({ success: true, message: "User is signed in",user,userData }) : res.json({ success: false, message: "not signed in" })
}
const newCollection = async(req,res)=>{
    let {email,title} = req.body
    let user = await userModel.findOne({email})
    user.collections.push({title,tasks:[]})
    await user.save()
    res.json({user})
}
const addTask = async(req,res)=>{
    let {email,collectionName,taskTitle} = req.body
    let user = await userModel.findOne({email})
    let collection = user.collections.find(c=>c.title===collectionName)
    collection.tasks.push({title:taskTitle})
    console.log('collection',collection.tasks)
    await user.save()
    res.json({collection,user})
}
const dropCollection = async(req,res)=>{
    let {email,name} = req.body
    let user = await userModel.findOne({email})
    let newCollection = user.collections.filter(e=>e.title!==name)
    user.collections = newCollection
    await user.save()
    res.json({collection:user.collections})
    
}
module.exports = { signUp, login, logout, user_data,newCollection,addTask,dropCollection }