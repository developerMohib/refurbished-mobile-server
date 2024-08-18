# Refurbished Product selling web app server

This repository contains the backend server for the Product Management Application, built using Node.js, Express.js, and MongoDB. It provides a RESTful API for managing products, user authentication, and other related functionalities.


## use the server code with

## How to run 
- clone or download

 **Clone the Repository**

   ```bash
   git clone https://github.com/FARUK2059/BestDeal-Server.git
   cd BestDeal-Server
   
- npm i
- env setup 
- run (nodemon start or nodemon index.js) 

## usages packages
- express 
- cors
- dotenv
- mongodb (server)

## set up server with express  

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

## and need thing is included according to rules