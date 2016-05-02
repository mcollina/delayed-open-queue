'use strict'

var test = require('tap').test
var doq = require('./')

test('defers an op to the nextTick', function (t) {
  t.plan(9)
  var queue = doq()

  queue.push(function (cb) {
    t.pass('task completed')
    t.ok(queue.started, 'queue started')
    t.notOk(queue.completed, 'queue not completed')
    process.nextTick(cb)
  })

  queue.on('complete', function () {
    t.ok(queue.started, 'queue started')
    t.ok(queue.completed, 'queue completed')
  })

  t.notOk(queue.started, 'queue not started')
  t.notOk(queue.completed, 'queue not completed')

  process.nextTick(function () {
    t.ok(queue.started, 'queue started')
    t.notOk(queue.completed, 'queue not completed')
  })
})
