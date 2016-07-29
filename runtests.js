// node --harmony-proxies runtests.js $(find ./tests -name \*.js)

"use strict";

const reporter = require('nodeunit').reporters.minimal;
let args = process.argv;
args.splice(0,2);
reporter.run(args);