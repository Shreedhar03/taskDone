let admin = require('firebase-admin') 
const {getAuth} = require('firebase-admin/auth')
let serviceAccount = require('../firebase-admin.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const verifyToken = (req,res,next)=>{
    getAuth().verifyIdToken(req.body.token)
        .then((decoded)=>{
            req.email = decoded.email
            next()
        }).catch((err)=>{
            console.log(err.message)
            next()
        })

}

module.exports = {verifyToken}