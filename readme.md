# Refurbished Product selling web app server

This repository contains the backend server for the Product Management Application, built using Node.js, Express.js, and MongoDB. It provides a RESTful API for managing products, user authentication, and other related functionalities.

## use the server code with

## How to run

- clone or download

  **Clone the Repository**

  ## cd refurbished-mobile-client

  #### git-client clone

  ```bash
  https://github.com/developerMohib/refurbished-mobile-client.git

  ```

  ## cd refurbished-mobile-server

  #### git-server clone

  ```bash
  https://github.com/developerMohib/refurbished-mobile-server.git

  ```

- npm i
- env setup
- run (nodemon start or nodemon index.js)

## usages packages

- express
- cors
- dotenv
- mongodb (server)

## set up server with express

```bash
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Your Refurbished phone server is ready !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

## and need thing is included according to rules
