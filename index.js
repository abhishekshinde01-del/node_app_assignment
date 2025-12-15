"use strict"

const express = require('express')

const app = express()
const port = 3000;


app.get("/", (req, res) => {
    res.send('Hello world')
});

app.get("/user" ,(req, res) =>{
    res.send('user found')
})

app.listen(port, ()=>{
    console.log(`example  at http://localhost:${port}`); 
})
