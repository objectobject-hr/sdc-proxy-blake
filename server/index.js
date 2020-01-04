// require('newrelic')
require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const httpProxy = require('http-proxy')
const { execSync } = require('child_process')

const app = express()
const proxy = httpProxy.createProxyServer()
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client')))

app.all('/details', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3001' })
})

app.get('/update', (req, res) => {
  console.log('\nupdating dist')
  execSync('node server/updateDist', { stdio: 'inherit' })
  res.end()
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
