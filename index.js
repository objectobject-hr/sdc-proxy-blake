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

app.get('/loaderio-ded3f00e9f1a093f15839232b30132e4.txt', (req, res) =>
  res.download('loaderio-ded3f00e9f1a093f15839232b30132e4.txt')
)

app.get('/test', (req, res) => res.send('test'))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))