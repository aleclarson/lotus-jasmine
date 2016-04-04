
require "lotus-require"

repeatString = require "repeat-string"
plural = require "plural"
log = require "lotus-log"

isBenchmark = (spec) ->
  spec.description is "has a benchmark"

module.exports =

  startAll: ->
    @specsPassed = 0
    @startTime = Date.now()
    log.pushIndent 2
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

    return if spec.status is "disabled"

    if spec.status isnt "failed"
      @specsPassed += 1
      return

    log.plusIndent 2
    log.moat 1
    for { message, error } in spec.failedExpectations
      log.red message
      log.moat 0
      log.gray.dim error.stack.split(log.ln).slice(1, 10).join(log.ln)
      log.moat 1
    log.popIndent()

  finishSome: ->
    log.popIndent()

  finishAll: (info) ->
    specsExecuted = info.totalSpecsExecuted
    elapsedTime = Date.now() - @startTime
    log.moat 1
    tint = if @specsPassed is specsExecuted then "green" else "red"
    log[tint] @specsPassed, " / ", specsExecuted
    log " tests passed in "
    log.pink elapsedTime, "ms"
    log.moat 1
    log.popIndent()
