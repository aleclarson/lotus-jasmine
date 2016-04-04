var Q;

Q = require("q");

module.exports = {
  path: "jasmine/index.js",
  load: function(arg) {
    var jasmine, key, ref, reporter, value;
    reporter = arg.reporter;
    jasmine = require(this.entry);
    this.jasmine = jasmine.core(jasmine);
    ref = jasmine["interface"](this.jasmine, this.jasmine.getEnv());
    for (key in ref) {
      value = ref[key];
      global[key] = value;
    }
    if (reporter != null) {
      return this.addReporter(reporter);
    }
  },
  start: function() {
    var deferred;
    deferred = Q.defer();
    this.jasmine.getEnv().execute(deferred.resolve);
    return deferred.promise;
  },
  addReporter: function(reporter) {
    var addEvent, env, event, events, shim, shimmed;
    reporter.suite = this;
    shim = {};
    events = {
      specStarted: "startOne",
      specDone: "finishOne",
      suiteStarted: "startSome",
      suiteDone: "finishSome",
      jasmineStarted: "startAll",
      jasmineDone: "finishAll"
    };
    addEvent = function(shimmed, event) {
      return shim[shimmed] = function() {
        var error;
        try {
          return reporter[event].apply(reporter, arguments);
        } catch (_error) {
          error = _error;
          log.moat(1);
          log("Reporter event failed: '" + event + "'");
          log.moat(1);
          return log.error(error);
        }
      };
    };
    for (shimmed in events) {
      event = events[shimmed];
      addEvent(shimmed, event);
    }
    env = this.jasmine.getEnv();
    env.addReporter(shim);
    return env.specFilter = function() {
      return true;
    };
  }
};

//# sourceMappingURL=../../map/src/suite.map
