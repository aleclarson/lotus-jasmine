module.exports = {
  load: function(arg) {
    var jasmine, key, ref, reporter, value;
    reporter = arg.reporter;
    jasmine = require("jasmine/index.js");
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
    deferred = Promise.defer();
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
          log.white("Reporter event failed: ");
          log.red(event);
          log.moat(0);
          log.gray.dim(error.stack.split(log.ln).slice(0, 11).join(log.ln));
          return log.moat(1);
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

//# sourceMappingURL=map/suite.map
