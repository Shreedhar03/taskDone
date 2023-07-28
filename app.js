const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()
const { MONGO_URL, PORT } = process.env
const cookieParser = require('cookie-parser');
const authRoute = require('./Routes/AuthRoute')

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to mongodb')
    app.listen(PORT, () => console.log('server running at ', PORT))
}).catch(err => {
    console.log("ERROR", err.message)
})

app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use("/", authRoute)

app.get('/cookie', (req, res) => {
    res.cookie("cookie01", "cookie02", {
        expires: new Date('2025-12-09'),
        httpOnly: true
    })
    res.send("cookie sent")
})