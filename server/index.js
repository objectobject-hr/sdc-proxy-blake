require('newrelic')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const httpProxy = require('http-proxy')

const app = express()
const proxy = httpProxy.createProxyServer()
const PORT = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist')))

app.all('/details', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3001' })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
