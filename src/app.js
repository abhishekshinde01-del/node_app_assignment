const express = require('express')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express()
const userRoute = require('./routes/routes')

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
  ]
}));
app.use('/employe' , userRoute)

module.exports = app;


