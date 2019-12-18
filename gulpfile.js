const { execSync } = require('child_process')

const members = ['aaron', 'blake', 'david', 'steven']
const services = members.map(member => `sdc-service-${member}`)

const tasks = {
  npmi: function(cb) {
    cdServices('npm i')
    cb()
  },
  seed: function(cb) {
    cdServices('npm run seed')
    cb()
  },
  pull: function(cb) {
    execSync('git submodule foreach git pull origin master', {
      stdio: 'inherit'
    })
    cb()
  },
  dev: function(cb) {
    let command = `concurrently "npm run dev"`
    services.map(service => (comman += ` cd ${service} && npm run dev`))
    command += 'webpack -d'
    execSync(command, { stdio: 'inherit' })
    cb()
  }
}

function cdServices(command) {
  console.log('running a command in each service')
  console.log('\n\n----------\n\n')
  services.map(service => {
    console.log(`running ${command} in ${service}\n\n`)
    execSync(`cd ${service} && ${command}`, { stdio: 'inherit' })
    console.log('\n\n----------\n\n')
  })
}

module.exports = { ...tasks }
