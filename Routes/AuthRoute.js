const {user_data,newCollection,addTask,dropCollection,deleteTask,createUser, markDone, editTask} = require('../Controllers/AuthController')
// const userVerification=require('../Middlewares/AuthMiddleware')
const router= require('express').Router()

// router.post('/signup',signUp)
// router.post('/login',login)
// router.post('/logout',logout)
// router.get('/checkLoggedIn',checkLoggedIn)
router.post('/dashboard',user_data)
router.post('/newCollection',newCollection)
router.post('/addTask',addTask)
router.put('/dropCollection',dropCollection)
router.post('/deleteTask',deleteTask)
router.post('/createUser',createUser)
router.post('/markDone',markDone)
router.post('/editTask',editTask)

module.exports=router