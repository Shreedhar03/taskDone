require('dotenv').config()
const jwt=require('jsonwebtoken')

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT,{
        expiresIn: '14d'
    })
}

module.exports=generateToken