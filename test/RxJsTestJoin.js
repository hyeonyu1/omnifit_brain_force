"use strict";
exports.__esModule = true;
// import 'rxjs/add/operator/map';
// import {of} from 'rxjs/observable/of';
// import {combineLatest} from 'rxjs/observable/combineLatest';
require("rxjs/add/observable/combineLatest");
// import {interval} from 'rxjs/observable/interval';
require("rxjs/add/observable/interval");
require("rxjs/add/observable/of");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toArray");
var Observable_1 = require("rxjs/Observable");
require("rxjs/operator/map");
var xs = Observable_1.Observable.interval(100)
    .map(function (x) { return 'first' + x; });
var ys = Observable_1.Observable.interval(100)
    .map(function (x) { return 'second' + x; });
// const xs = Observable.of([1])
//     .map((x) => 'first' + x);//.filter( (it) => it.length > 10);
//
// const ys = Observable.of([2])
//     .map((x) => 'second' + x);
// const source = xs.combineLatest(
//         ys,
//         function () { return Observable.timer(0); },
//         function () { return Observable.timer(0); },
//         function (x, y) { return x + y; }
//     )
//     .take(5);
//
// const subscription = source.subscribe(
//     function (x) { console.log('Next: ' + x); },
//     function (err) { console.log('Error: ' + err); },
//     function () { console.log('Completed'); });
//
Observable_1.Observable.combineLatest(xs, ys).subscribe(function (it) {
    console.log(it);
});
//////
/*
ar xs = Rx.Observable.interval(100)
    .map(function (x) { return 'first' + x; });

var ys = Rx.Observable.interval(100)
    .map(function (x) { return 'second' + x; });

var source = xs.groupJoin(
    ys,
    function () { return Rx.Observable.timer(0); },
    function () { return Rx.Observable.timer(0); },
    function (x, yy) {
        return yy.select(function (y) {
            return x + y;
        })
    }).mergeAll().take(5);

var subscription = source.subscribe(
    function (x) { console.log('Next: ' + x); },
    function (err) { console.log('Error: ' + err); },
    function () { console.log('Completed'); });
 */
