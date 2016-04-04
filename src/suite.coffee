
Q = require "q"

module.exports =

  path: "jasmine/index.js"

  load: ({ reporter }) ->

    jasmine = require @entry
    @jasmine = jasmine.core jasmine

    # Expose global Jasmine interface.
    global[key] = value for key, value of jasmine.interface @jasmine, @jasmine.getEnv()

    # Add custom reporter to Jasmine.
    @addReporter reporter if reporter?

  start: ->
    deferred = Q.defer()
    @jasmine.getEnv().execute deferred.resolve
    deferred.promise

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
          log "Reporter event failed: '#{event}'"
          log.moat 1
          log.error error

    for shimmed, event of events
      addEvent shimmed, event

    env = @jasmine.getEnv()

    env.addReporter shim

    # TODO: Make this customizable with 'minimatch'.
    env.specFilter = -> yes
