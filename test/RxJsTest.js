"use strict";
exports.__esModule = true;
// import 'rxjs/add/operator/map';
var Observable_1 = require("rxjs/Observable");
require("rxjs/operator/map");
var Subject_1 = require("rxjs/Subject");
var A = (function () {
    function A() {
        var _this = this;
        var observable = Observable_1.Observable.create(function (obs) {
            _this.obs = obs;
            _this.next = obs.next.bind(obs);
            _this.onerror = obs.error.bind(obs);
            _this.onclose = obs.complete.bind(obs);
            // this._webSocket.onclose = obs.complete.bind(obs);
        });
        var observer = {
            next: function (data) {
                console.log('observer next ' + data);
                _this.obs.next(data);
            },
            error: function (error) {
                console.log('observer error ' + error);
            },
            complete: function () {
                console.log('observer complete');
            }
        };
        this.subject = Subject_1.Subject.create(observer, observable);
        // this.subject = Subject.create(observer as Observer<any>, observable).map((response: MessageEvent): any => {
        //     console.log('in  subject ' + response);
        //         // const data = response.data;
        //         // return data;
        //     });
    }
    A.prototype.main = function () {
        console.log('welcome');
        return '---';
    };
    A.prototype.next = function (name) {
        console.log('next' + name);
        return 'next' + name;
    };
    A.prototype.onerror = function () {
        console.log('onerror');
        return 'onerror';
    };
    A.prototype.onclose = function () {
        console.log('onclose');
        return 'onclose';
    };
    return A;
}());
var a = new A();
var subScription = a.subject.subscribe(function (it) { console.log('1**' + it); });
var subScription2 = a.subject.subscribe(function (it) { console.log('2**' + it); });
// a.next('aaaa22a');
a.subject.next('nenene');
// subScription.unsubscribe();
// subScription.unsubscribe();
// a.subject.complete();
// a.subject.unsubscribe();
