const {signUp,login,user_data,logout,checkLoggedIn,newCollection,addTask,dropCollection,deleteTask} = require('../Controllers/AuthController')
// const userVerification=require('../Middlewares/AuthMiddleware')
const router= require('express').Router()

router.post('/signup',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.get('/checkLoggedIn',checkLoggedIn)
router.post('/dashboard',user_data)
router.post('/newCollection',newCollection)
router.post('/addTask',addTask)
router.put('/dropCollection',dropCollection)
router.put('/deleteTask',deleteTask)

module.exports=router