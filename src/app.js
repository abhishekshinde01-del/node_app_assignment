const express = require('express')
const app = express()
const userRoute = require('./routes/routes')

app.use(express.json())
app.use('/employe' , userRoute)

module.exports = app;
