"use strict";
exports.__esModule = true;
// import 'rxjs/add/operator/map';
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/operator/map");
var subject = new BehaviorSubject_1.BehaviorSubject(42);
// var subject = BehaviorSubject.create(42)
var subscription = subject.subscribe(function (x) {
    console.log('Next1: ' + x.toString());
}, function (err) {
    console.log('Error1: ' + err);
}, function () {
    console.log('Completed1');
});
var subscription2 = subject.subscribe(function (x) {
    console.log('Next2: ' + x.toString());
}, function (err) {
    console.log('Error2: ' + err);
}, function () {
    console.log('Completed2');
});
// subject.filter
var subscription3 = subject.subscribe(function (x) {
    console.log('Next2: ' + x.toString());
}, function (err) {
    console.log('Error2: ' + err);
}, function () {
    console.log('Completed2');
});
// => Next: 42
subscription2.unsubscribe();
subject.next(56);
// => Next: 56
subject.complete();
// => Completed 
