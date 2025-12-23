const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "Simple REST API for managing tasks",
    },
    servers: [
      {
        url: process.env.VERCEL_URL ? `http://${process.env.VERCEL_URL}` : 'http://localhost:3000',
      },
    ],
  },
   apis: [path.join(__dirname, "routes", "routes.js")],
};

module.exports = swaggerJsdoc(options);
