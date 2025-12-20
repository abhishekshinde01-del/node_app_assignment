const express = require('express')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express()
const userRoute = require('./routes/routes')

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/employe' , userRoute)

module.exports = app;


