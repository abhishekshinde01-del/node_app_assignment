// const express = require('express')
// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./swagger");

// const app = express()
// const userRoute = require('./routes/routes')

// app.use(express.json())
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/employe' , userRoute)

// module.exports = app;



const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // This should contain your swagger-jsdoc specs
const userRoute = require('./routes/routes');

const app = express();

app.use(express.json());

// CDN Links for Swagger UI assets to prevent 500/blank page on Vercel
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
const JS_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"
];

// Updated Swagger Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCssUrl: CSS_URL,
  customJs: JS_URLS
}));

app.use('/employe', userRoute);

// Export the app for Vercel
module.exports = app;


