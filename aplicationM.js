"use strict"

const express = require('express')

const app = express()
const port = 3000;

const LoggerMiddleware = (req, res, next) => {
  console.log(`REQUEST_LOG: ${req.url} ${req.method}`);
  next();
};

app.use(LoggerMiddleware);

app.get("/", (req, res) => {
  res.send("appMiddleware!");
});

app.listen(port, ()=>{
    console.log(`example  at http://localhost:${port}`); 
})
