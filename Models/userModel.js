const mongoose = require('mongoose')

const task = new mongoose.Schema({
    title: String,
    completed: {type:Boolean,default:false},
    due:{type:Date,default:null}
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,default:""
    },
    collections : {type:[{title:String,tasks:[task]}]}

}, { timestamps: true })

module.exports = mongoose.model('Users', userSchema)