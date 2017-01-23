
module.exports =

  load: ({ reporter }) ->

    jasmine = require "jasmine/index.js"
    @jasmine = jasmine.core jasmine

    # Expose global Jasmine interface.
    global[key] = value for key, value of jasmine.interface @jasmine, @jasmine.getEnv()

    # Add custom reporter to Jasmine.
    @addReporter reporter if reporter?

  start: ->
    deferred = Promise.defer()
    @jasmine.getEnv().execute deferred.resolve
    return deferred.promise

  addReporter: (reporter) ->

    reporter.suite = this

    shim = {}

    events =
      specStarted:    "startOne"
      specDone:       "finishOne"
      suiteStarted:   "startSome"
      suiteDone:      "finishSome"
      jasmineStarted: "startAll"
      jasmineDone:    "finishAll"

    addEvent = (shimmed, event) ->
      shim[shimmed] = ->
        try
          reporter[event].apply reporter, arguments
        catch error
          log.moat 1
          log.white "Reporter event failed: "
          log.red event
          log.moat 0
          log.gray.dim error.stack.split(log.ln).slice(0, 11).join(log.ln)
          log.moat 1

    for shimmed, event of events
      addEvent shimmed, event

    env = @jasmine.getEnv()

    env.addReporter shim

    # TODO: Make this customizable with 'minimatch'.
    env.specFilter = -> yes
