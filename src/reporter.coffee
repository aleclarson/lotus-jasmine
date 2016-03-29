
require "lotus-require"

repeatString = require "repeat-string"
plural = require "plural"
log = require "lotus-log"

isBenchmark = (spec) ->
  spec.description is "has a benchmark"

module.exports =

  startAll: (info) ->

    @specsPassed = 0
    @specsFound = info.totalSpecsDefined
    @startTime = Date.now()
    log.moat 1

  startSome: (suite) ->
    log.moat 1
    log.green suite.description
    log.moat 1
    log.plusIndent 2

  startOne: (spec) ->
    spec.startTime = Date.now() unless isBenchmark spec
    log.moat 1
    log.gray.dim spec.description
    log.moat 1 if isBenchmark spec

  finishOne: (spec) ->

    unless isBenchmark spec
      elapsedTime = Date.now() - spec.startTime
      log.pink " ", elapsedTime, "ms"
      log.moat 1

    if spec.status isnt "failed"
      return @specsPassed++

    log.plusIndent 2
    log.moat 1
    for expectation in spec.failedExpectations
      log.red expectation.message
      log.moat 1
    log.popIndent()

  finishSome: ->
    log.popIndent()

  finishAll: ->
    elapsedTime = Date.now() - @startTime
    log.moat 1
    tint = if @specsPassed is @specsFound then "green" else "red"
    log[tint] @specsPassed, " / ", @specsFound
    log " tests passed in "
    log.pink elapsedTime, "ms"
    log.moat 1
    log.popIndent()
