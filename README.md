
# lotus-jasmine v1.0.0 [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

```sh
npm install aleclarson/lotus-jasmine#1.0.0
```

`lotus-jasmine` provides the default test suite and reporter used by [`lotus-runner`](https://github.com/aleclarson/lotus-runner).

Since `lotus-jasmine` is a peer dependency of `lotus-runner`, you can install `lotus-jasmine` alongside `lotus-runner` if you want to use a specific version for a specific module.

&nbsp;

## usage

```CoffeeScript
Runner = require "lotus-runner/runner"

runner = Runner
  suite: "lotus-jasmine"              # This will prefer your module's version of 'lotus-jasmine' over a globally installed version.
  reporter: "lotus-jasmine/reporter"  # This reports the status of the test runner.

runner.start "my-module/js/spec"      # Run the tests using the Jasmine testing framework!
```
