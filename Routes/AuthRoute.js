const {signUp,login,user_data} = require('../Controllers/AuthController')
const userVerification=require('../Middlewares/AuthMiddleware')
const router= require('express').Router()

router.post('/signup',signUp)
router.post('/login',login)
router.get('/dashboard',userVerification,user_data)

module.exports=router