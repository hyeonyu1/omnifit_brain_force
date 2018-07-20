"use strict";
exports.__esModule = true;
// import 'rxjs/add/operator/map';
var Observable_1 = require("rxjs/Observable");
require("rxjs/operator/map");
var Subject_1 = require("rxjs/Subject");
var subject;
var obs;
var observable = Observable_1.Observable.create(function (obss) {
    obs = obss;
});
var observer = {
    next: function (data) {
        console.log('observer next ' + data);
        obs.next(data);
    },
    error: function (error) {
        console.log('observer error ' + error);
    },
    complete: function () {
        console.log('observer complete');
    }
};
subject = Subject_1.Subject.create(observer, observable);
// this.subject = Subject.create(observer as Observer<any>, observable).map((response: MessageEvent): any => {
//     console.log('in  subject ' + response);
//         // const data = response.data;
//         // return data;
//     });
var subScription = subject.subscribe(function (it) { console.log('**' + it); });
// a.next('aaaa22a');
subject.next('nenene');
