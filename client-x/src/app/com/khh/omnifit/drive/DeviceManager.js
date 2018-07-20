"use strict";
exports.__esModule = true;
require("rxjs/add/observable/interval");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/merge");
var Observable_1 = require("rxjs/Observable");
var DeviceManager = (function () {
    function DeviceManager() {
        var _this = this;
        this.headsetConcentration = 0;
        this.headsetConcentrationHistory = new Array();
        this._headsetConcentrationObservable = Observable_1.Observable.fromEvent(window, DeviceManager.EVENT_OMNIFIT_HEADSET_CONCENTRATION).map(function (event) { return Number(event.detail); });
        this.concentrationSubscription = this.headsetConcentrationSubscribe(function (concentration) {
            _this.headsetConcentration = concentration;
            _this.headsetConcentrationHistory.push(concentration);
            console.log('headsetConcentration' + _this.headsetConcentration + ', history ' + _this.headsetConcentrationHistory);
        });
        this.keySubscription = this.fromeEvent('keydown', function (e) {
            var at = (_this.headsetConcentration || 0);
            if ('ArrowUp' === e.key) {
                at++;
            }
            else if ('ArrowDown' === e.key) {
                at--;
            }
            at = Math.min(10, at);
            at = Math.max(0, at);
            _this.dispatchCustomEvent(new CustomEvent(DeviceManager.EVENT_OMNIFIT_HEADSET_CONCENTRATION, { detail: at }));
        });
    }
    //singletone pattern
    //https://basarat.gitbooks.io/typescript/docs/tips/singleton.html
    DeviceManager.getInstance = function () {
        if (!DeviceManager.instance) {
            DeviceManager.instance = new DeviceManager();
        }
        return DeviceManager.instance;
    };
    DeviceManager.prototype.fromeEvent = function (eventName, next, error, complete) {
        var key = Observable_1.Observable.fromEvent(window, eventName);
        return key.subscribe(next, error, complete);
    };
    DeviceManager.prototype.dispatchCustomEvent = function (event) {
        return window.dispatchEvent(event);
    };
    Object.defineProperty(DeviceManager.prototype, "headsetConcentrationObservable", {
        get: function () {
            return this._headsetConcentrationObservable;
        },
        enumerable: true,
        configurable: true
    });
    DeviceManager.prototype.headsetConcentrationSubscribe = function (next, error, complete) {
        return this._headsetConcentrationObservable.subscribe(next, error, complete);
    };
    DeviceManager.prototype.onCreate = function (data) {
        if (window['omnigame']) {
            window['omnigame'].onCreate(data);
        }
        else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onCreate) {
            window['webkit'].messageHandlers.onCreate.postMessage(data);
        }
    };
    DeviceManager.prototype.onStart = function (data) {
        if (window['omnigame']) {
            window['omnigame'].onStart(data);
        }
        else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onStart) {
            window['webkit'].messageHandlers.onStart.postMessage(data);
        }
    };
    DeviceManager.prototype.onResume = function (data) {
        if (window['omnigame']) {
            window['omnigame'].onResume(data);
        }
        else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onResume) {
            window['webkit'].messageHandlers.onResume.postMessage(data);
        }
    };
    DeviceManager.prototype.onPause = function (data) {
        if (window['omnigame']) {
            window['omnigame'].onPause(data);
        }
        else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onPause) {
            window['webkit'].messageHandlers.onPause.postMessage(data);
        }
    };
    DeviceManager.prototype.onStop = function (data) {
        if (window['omnigame']) {
            window['omnigame'].onStop(data);
        }
        else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onStop) {
            window['webkit'].messageHandlers.onStop.postMessage(data);
        }
    };
    DeviceManager.prototype.onRestart = function (data) {
        if (window['omnigame']) {
            window['omnigame'].onRestart(data);
        }
        else if (window['webkit'] && window['webkit'].messageHandlers) {
            window['webkit'].messageHandlers.onRestart.postMessage(data);
        }
    };
    DeviceManager.prototype.onDestroy = function (data) {
        if (window['omnigame']) {
            window['omnigame'].onDestroy(data);
        }
        else if (window['webkit'] && window['webkit'].messageHandlers) {
            window['webkit'].messageHandlers.onDestroy.postMessage(data);
        }
    };
    DeviceManager.EVENT_OMNIFIT_HEADSET_CONCENTRATION = 'omnifit-headset-concentration';
    return DeviceManager;
}());
exports.DeviceManager = DeviceManager;
