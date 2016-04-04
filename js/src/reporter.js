var isBenchmark, log, plural, repeatString;

require("lotus-require");

repeatString = require("repeat-string");

plural = require("plural");

log = require("lotus-log");

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
    log.gray.dim(spec.description);
    if (isBenchmark(spec)) {
      return log.moat(1);
    }
  },
  finishOne: function(spec) {
    var error, i, len, message, ref, ref1;
    if (spec.status === "disabled") {
      return;
    }
    if (spec.status !== "failed") {
      this.specsPassed += 1;
      return;
    }
    log.plusIndent(2);
    log.moat(1);
    ref = spec.failedExpectations;
    for (i = 0, len = ref.length; i < len; i++) {
      ref1 = ref[i], message = ref1.message, error = ref1.error;
      log.red(message);
      log.moat(0);
      log.gray.dim(error.stack.split(log.ln).slice(1, 10).join(log.ln));
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
