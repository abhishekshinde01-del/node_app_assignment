"use-strict";

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res, next) => {
  const error = new Error("Something went wrong")
  next(error)
});

app.use("/", (req, res, next) => {
  res.send('Sucesss')
});

app.use("/", (err,req, res, next) => {
  console.log("err.stack", err.stack);
  res.status(500).send('Something went wrong')
});

app.listen(port, () => {
  console.log(`example  at http://localhost:${port}`); 
}); 
