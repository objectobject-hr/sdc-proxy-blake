require('dotenv').config()
const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './build')))

const services = [{ route: '/details', target: process.env.SERVICE }]

for ({ route, target } of services) {
  app.use(
    route,
    proxy({
      target: target,
      changeOrigin: true
    })
  )
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`))