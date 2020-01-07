'use strict'

module.exports = {
  generateId
}

function generateId(context, events, done) {
  context.vars.id = rand(1, 10000000)
  // continue with executing the scenario:
  return done()
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
