"use strict";
exports.__esModule = true;
require("rxjs/operator/map");
var interval_1 = require("rxjs/observable/interval");
var observable = interval_1.interval(100);
console.log(observable);
