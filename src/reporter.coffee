
emptyFunction = require "emptyFunction"

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
    log.white suite.description
    log.moat 1
    log.plusIndent 2

  startOne: (spec) ->
    spec.startTime = Date.now() unless isBenchmark spec
    log.moat 1
    log.gray "- ", spec.description
    log.moat 1 if isBenchmark spec

  finishOne: (spec) ->

    if spec.status is "disabled"
      return

    if spec.status isnt "failed"
      @specsPassed += 1
      return

    log.moat 1
    log.plusIndent 2
    for { message, stack } in spec.failedExpectations
      log.red message
      log.moat 0
      log.gray.dim stack
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
