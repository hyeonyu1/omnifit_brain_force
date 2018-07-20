"use strict";
exports.__esModule = true;
// import 'rxjs/add/operator/map';
var Observable_1 = require("rxjs/Observable");
require("rxjs/operator/map");
var Subscription_1 = require("rxjs/Subscription");
var fullSubscriber;
var o = Observable_1.Observable.create(function (obs) {
    fullSubscriber = obs;
    obs.next('555');
    console.log('oooooo ' + (obs));
});
var a = o.subscribe(function (it) {
    console.log(it + ' aaa');
});
// a.next('sss');
var b = o.subscribe(function (it) {
    console.log(it + ' bbb');
});
// b.next('bbb');
var subscriptions = new Subscription_1.Subscription();
subscriptions.add(a).add(b);
var subscription = o
    .subscribe();
// console.log(fullSubscriber === s)
// console.log(s === b)
// console.log(fullSubscriber === b)
//
// o.subscribe();
//
// fullSubscriber.next('ffff')
// //////////////
//
// const subject = new AsyncSubject();
//
// subject.next(42);
// subject.complete();
// subject.next(424);
// subject.complete();
//
//
// var subscription = subject.subscribe(
//     function (x) {
//         console.log('Next: ' + x);
//     },
//     function (err) {
//         console.log('Error: ' + err);
//     },
//     function () {
//         console.log('Completed');
//     }); 
