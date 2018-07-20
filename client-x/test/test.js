"use strict";
exports.__esModule = true;
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var A = (function () {
    function A() {
        var _this = this;
        var observable = Observable_1.Observable.create(function (obs) {
            _this.main = obs.next.bind(obs);
            // this._webSocket.onerror = obs.error.bind(obs);
            // this._webSocket.onclose = obs.complete.bind(obs);
        });
        var observer = {
            next: function (data) {
                console.log('observer next');
            },
            error: function (error) {
                console.log('observer error');
            },
            complete: function () {
                console.log('observer complete');
            }
        };
        // this.subject = Subject.create(observer as Observer<any>, observable).map((response: MessageEvent): any => {
        //     const data = response.data;
        //     return data;
        // });
        this.subject = Subject_1.Subject.create(observer, observable).map(function (response) {
            var data = response.data;
            return data;
        });
    }
    A.prototype.main = function () {
        console.log('welcome');
        return '---';
    };
    return A;
}());
var a = new A();
a.subject.subscribe(function (it) { console.log('**' + it); });
a.main();
// a.subject.next('nenene');
