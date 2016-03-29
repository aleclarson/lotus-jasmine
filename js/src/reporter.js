var isBenchmark, log, plural, repeatString;

require("lotus-require");

repeatString = require("repeat-string");

plural = require("plural");

log = require("lotus-log");

isBenchmark = function(spec) {
  return spec.description === "has a benchmark";
};

module.exports = {
  startAll: function(info) {
    this.specsPassed = 0;
    this.specsFound = info.totalSpecsDefined;
    this.startTime = Date.now();
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
    var elapsedTime, expectation, i, len, ref;
    if (!isBenchmark(spec)) {
      elapsedTime = Date.now() - spec.startTime;
      log.pink(" ", elapsedTime, "ms");
      log.moat(1);
    }
    if (spec.status !== "failed") {
      return this.specsPassed++;
    }
    log.plusIndent(2);
    log.moat(1);
    ref = spec.failedExpectations;
    for (i = 0, len = ref.length; i < len; i++) {
      expectation = ref[i];
      log.red(expectation.message);
      log.moat(1);
    }
    return log.popIndent();
  },
  finishSome: function() {
    return log.popIndent();
  },
  finishAll: function() {
    var elapsedTime, tint;
    elapsedTime = Date.now() - this.startTime;
    log.moat(1);
    tint = this.specsPassed === this.specsFound ? "green" : "red";
    log[tint](this.specsPassed, " / ", this.specsFound);
    log(" tests passed in ");
    log.pink(elapsedTime, "ms");
    log.moat(1);
    return log.popIndent();
  }
};

//# sourceMappingURL=../../map/src/reporter.map
