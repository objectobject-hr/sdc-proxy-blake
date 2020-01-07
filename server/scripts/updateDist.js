const http = require('http')
const fs = require('fs')

http
  .get(process.env.SERVICE + '/dist/css', res => {
    const stream = fs.createWriteStream('client/dist/kat-bundle.js')
    const pipe = res.pipe(stream)
    pipe.on('finish', () => console.log('\nwrote kat-bundle.js to dist'))
  })
  .on('error', err => console.error(err))

http
  .get(process.env.SERVICE + '/dist/css', res => {
    const stream = fs.createWriteStream('client/dist/kat.css')
    const pipe = res.pipe(stream)
    pipe.on('finish', () => console.log('\nwrote kat.css to dist'))
  })
  .on('error', err => console.error(err))
