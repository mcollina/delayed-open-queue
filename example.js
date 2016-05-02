'use strict'

var queue = require('./')()

queue.push(function (cb) {
  console.log('first')
  process.nextTick(cb)
})

queue.push(function (cb) {
  console.log('second')
  process.nextTick(cb)
})

queue.push(function (cb) {
  console.log('third')
  process.nextTick(cb)
})

console.log('all jobs inserted')
console.log('queue started', queue.started)
console.log('queue completed', queue.completed)

process.nextTick(function () {
  console.log('queue started', queue.started)
  console.log('queue completed', queue.completed)
})

queue.on('complete', function () {
  console.log('all tasks completed')
  console.log('queue started', queue.started)
  console.log('queue completed', queue.completed)
})
