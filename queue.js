'use strict'

var fastq = require('fastq')
var EE = require('events').EventEmitter

function queue () {
  var instance = fastq(function (func, cb) {
    setImmediate(func, cb)
  }, 1)
  instance.pause()

  var result = new EE()
  result.push = function (cb, done) {
    instance.push(cb, done)
  }
  result.started = false
  result.completed = false

  instance.drain = function () {
    result.completed = true
    result.emit('complete')
  }

  process.nextTick(function () {
    result.started = true
    instance.resume()
  })

  return result
}

module.exports = queue
