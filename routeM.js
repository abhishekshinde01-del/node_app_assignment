"use strict";

const express = require("express");

const app = express();
const router = express.Router();

const port = 3000;

router.use((req, res, next) => {
  console.log("Date", new Date());
  next();
});

router.get("/user/:id", (req, res) => {
  console.log("req.params.id", req.params.id);
  res.send({ id: req.params.id });
});

app.use('/', router)

app.listen(port, () => {
  console.log(`example  at http://localhost:${port}`);
});
