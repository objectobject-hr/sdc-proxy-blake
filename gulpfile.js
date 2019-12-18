const { execSync } = require('child_process')

const members = ['aaron', 'blake', 'david', 'steven']
const services = members.map(member => `sdc-service-${member}`)

const tasks = {
  npmi: function(cb) {
    services.map(service => {
      console.log(`installing packages for ${service}`)
      execSync(`cd ${service} && npm i`, { stdio: 'inherit' })
      console.log('\n----------\n')
    })
    cb()
  },
  seed: function(cb) {
    services.map(service => {
      console.log(`seeding database for ${service}`)
    })
  }
}

module.exports = { ...tasks }
