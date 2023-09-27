const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()
const { MONGO_URL, PORT } = process.env
const cookieParser = require('cookie-parser');
const authRoute = require('./Routes/AuthRoute')
app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use("/api/", authRoute)

app.get('/nextjs',(req,res)=>{
    console.log('nextjs')
    res.json({
        data:[
            {id:1,name:"Shreedhar Urawane"},
            {id:2,name:"Yash Jawale"},
            {id:3,name:"Tejas Patangeeeeee"}
        ]
    })
})

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to mongodb')
    app.listen(PORT, () => console.log('server running at ', PORT))
}).catch(err => {
    console.log("ERROR", err.message)
})

