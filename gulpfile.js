const { spawn } = require('child_process')

const members = ['aaron', 'blake', 'david', 'steven']
const services = members.map(member => `sdc-service-${member}`)

const tasks = {
  npmi: function(cb) {
    services.map(service => {
      console.log(`installing packages for ${service}`)
      const child = spawn(`cd ${service} && npm i`)
    })
  }
}

module.exports = { ...tasks }
