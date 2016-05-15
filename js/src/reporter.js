var Q, emptyFunction, isBenchmark;

emptyFunction = require("emptyFunction");

Q = require("q");

isBenchmark = function(spec) {
  return spec.description === "has a benchmark";
};

module.exports = {
  startAll: function() {
    this.specsPassed = 0;
    this.startTime = Date.now();
    log.pushIndent(2);
    return log.moat(1);
  },
  startSome: function(suite) {
    log.moat(1);
    log.green(suite.description);
    log.moat(1);
    return log.plusIndent(2);
  },
  startOne: function(spec) {
    if (!isBenchmark(spec)) {
      spec.startTime = Date.now();
    }
    log.moat(1);
    log.yellow.dim("- ");
    log.yellow(spec.description);
    if (isBenchmark(spec)) {
      return log.moat(1);
    }
  },
  finishOne: function(spec) {
    var i, len, message, ref, ref1, stack;
    if (spec.status === "disabled") {
      return;
    }
    if (spec.status !== "failed") {
      this.specsPassed += 1;
      return;
    }
    log.moat(1);
    log.plusIndent(2);
    ref = spec.failedExpectations;
    for (i = 0, len = ref.length; i < len; i++) {
      ref1 = ref[i], message = ref1.message, stack = ref1.stack;
      log.red(message);
      log.moat(0);
      log.gray.dim(stack);
      log.moat(1);
    }
    return log.popIndent();
  },
  finishSome: function() {
    return log.popIndent();
  },
  finishAll: function(info) {
    var elapsedTime, specsExecuted, tint;
    specsExecuted = info.totalSpecsExecuted;
    elapsedTime = Date.now() - this.startTime;
    log.moat(1);
    tint = this.specsPassed === specsExecuted ? "green" : "red";
    log[tint](this.specsPassed, " / ", specsExecuted);
    log(" tests passed in ");
    log.pink(elapsedTime, "ms");
    log.moat(1);
    return log.popIndent();
  }
};

//# sourceMappingURL=../../map/src/reporter.map
