"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AWStage_1 = require("./stage/AWStage");
var AWStageManager = (function (_super) {
    __extends(AWStageManager, _super);
    function AWStageManager(canvas, objs) {
        if (objs === void 0) { objs = new Array(); }
        var _this = _super.call(this, canvas, objs) || this;
        _this.position = 0;
        _this.stages = new Array();
        return _this;
    }
    //singletone pattern
    //https://basarat.gitbooks.io/typescript/docs/tips/singleton.html
    AWStageManager.getInstance = function (canvas, objs) {
        if (!AWStageManager.instance) {
            AWStageManager.instance = new AWStageManager(canvas, objs);
        }
        return AWStageManager.instance;
    };
    AWStageManager.prototype.nextPosition = function () {
        var p = this.position;
        p++;
        if (p >= this.stages.length) {
            p = this.stages.length - 1;
        }
        return p;
    };
    AWStageManager.prototype.previousPosition = function () {
        var p = this.position;
        p--;
        if (p < 0) {
            p = 0;
        }
        return p;
    };
    AWStageManager.prototype.goStage = function (idx, data) {
        console.log('goStage ' + idx + ' ' + data);
        this.currentStage().onStop(data);
        var nextStage = this.stages[idx];
        nextStage.onStart(data);
        this.position = idx;
        return nextStage;
    };
    AWStageManager.prototype.nextStage = function (data) {
        this.currentStage().onStop(data);
        this.currentStage().onDestroy(data);
        this.position = this.nextPosition();
        var nextStage = this.stages[this.position];
        nextStage.onCreate(data);
        nextStage.onStart(data);
        return nextStage;
    };
    AWStageManager.prototype.previousStage = function (data) {
        this.currentStage().onStop(data);
        this.currentStage().onDestroy(data);
        this.position = this.previousPosition();
        var previousStage = this.stages[this.position];
        previousStage.onCreate(data);
        previousStage.onStart(data);
        return previousStage;
    };
    AWStageManager.prototype.pushStage = function (stage) {
        this.stages.push(stage);
    };
    AWStageManager.prototype.currentStage = function () {
        return this.stages[this.position];
    };
    AWStageManager.prototype.eventObservable = function (eventName) {
        return undefined;
    };
    AWStageManager.prototype.onDraw = function () {
    };
    AWStageManager.prototype.onCreate = function (canvas) {
        this.position = 0;
        this.objs.forEach(function (it) { return it.onCreate(); });
        this.currentStage().onCreate({ data: 'start' });
    };
    AWStageManager.prototype.onStart = function (data) {
        this.objs.forEach(function (it) { return it.onStart(); });
        this.currentStage().onStart(data);
    };
    AWStageManager.prototype.onPause = function (data) {
        this.objs.forEach(function (it) { return it.onPause(); });
        this.currentStage().onPause(data);
    };
    AWStageManager.prototype.onRestart = function (data) {
        this.objs.forEach(function (it) { return it.onRestart(); });
        this.currentStage().onRestart(data);
    };
    AWStageManager.prototype.onResume = function (data) {
        this.objs.forEach(function (it) { return it.onResume(); });
        this.currentStage().onResume(data);
    };
    AWStageManager.prototype.onStop = function (data) {
        this.objs.forEach(function (it) { return it.onResume(); });
        this.currentStage().onStop(data);
    };
    AWStageManager.prototype.onDestroy = function (data) {
        this.objs.forEach(function (it) { return it.onDestroy(); });
        this.stages.forEach(function (it) { return it.onDestroy(data); });
        this.stages.length = 0;
    };
    AWStageManager.prototype.getAllObjs = function (stage) {
        var r = this.objs.map(function (it) {
            it.stage = stage;
            return it;
        }).concat(stage.objs).sort(function (n1, n2) {
            if (n1.index > n2.index) {
                return 1;
            }
            if (n1.index < n2.index) {
                return -1;
            }
            return 0;
        });
        return r;
    };
    return AWStageManager;
}(AWStage_1.AWStage));
exports.AWStageManager = AWStageManager;
