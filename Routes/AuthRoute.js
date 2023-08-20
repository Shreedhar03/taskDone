const {signUp,login,user_data,logout,newCollection,addTask} = require('../Controllers/AuthController')
// const userVerification=require('../Middlewares/AuthMiddleware')
const router= require('express').Router()

router.post('/signup',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.get('/dashboard',user_data)
router.post('/newCollection',newCollection)
router.post('/addTask',addTask)

module.exports=router