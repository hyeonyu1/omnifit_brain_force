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
var Observable_1 = require("rxjs/Observable");
var interval_1 = require("rxjs/observable/interval");
var CollectionUtil_1 = require("../../../../../../../../../lib-typescript/com/khh/collection/CollectionUtil");
var Stage_1 = require("../../../../../../../../../lib-typescript/com/khh/stage/Stage");
var ValidUtil_1 = require("../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWStage = (function (_super) {
    __extends(AWStage, _super);
    //http://xgrommx.github.io/rx-book/content/observable/observable_methods/fromeventpattern.html
    function AWStage(canvas, objs) {
        if (objs === void 0) { objs = new Array(); }
        var _this = _super.call(this) || this;
        _this.clockInterval = 30;
        _this._canvas = canvas;
        _this._objs = objs;
        _this._bufferCanvas = document.createElement('canvas');
        _this._bufferCanvas.width = _this._canvas.width;
        _this._bufferCanvas.height = _this._canvas.height;
        _this.width = _this._canvas.width;
        _this.height = _this._canvas.height;
        ////////////event
        _this.reSizeSubscription = Observable_1.Observable.fromEvent(_this._canvas, 'resize').subscribe(function (event) {
            _this.height = event.srcElement.clientHeight;
            _this.width = event.srcElement.clientWidth;
            _this._bufferCanvas.width = _this.width;
            _this._bufferCanvas.height = _this.height;
        });
        return _this;
    }
    Object.defineProperty(AWStage.prototype, "bufferCanvas", {
        get: function () {
            return this._bufferCanvas;
        },
        enumerable: true,
        configurable: true
    });
    AWStage.prototype.flushBufferToCanvas = function () {
        this.flushCanvas(this._bufferCanvas);
    };
    AWStage.prototype.flushCanvas = function (canvas) {
        if (canvas === void 0) { canvas = this._bufferCanvas; }
        var context = this._canvas.getContext('2d');
        context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        context.drawImage(canvas, 0, 0);
    };
    AWStage.prototype.pushObj = function (obj) {
        var _this = this;
        if (obj instanceof Array) {
            obj.forEach(function (it) { return _this.objs.push(it); });
        }
        else {
            this.objs.push(obj);
        }
    };
    AWStage.prototype.resetContext = function (context) {
        context.restore();
        context.font = '30pt Calibri';
        context.textAlign = 'center';
        context.fillStyle = 'black';
        context.fillStyle = 'black';
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.save();
    };
    Object.defineProperty(AWStage.prototype, "objs", {
        get: function () {
            return this._objs.sort(function (n1, n2) { return (n1.z > n2.z ? 1 : -1); });
        },
        enumerable: true,
        configurable: true
    });
    // get objsAll(): ObjDrone[] {
    //   return this._objs.concat(DroneStageManager.getInstance().objs).sort((n1, n2) => (n1.z > n2.z ? 1 : -1));
    // }
    // drawObjsAndFlush(context: CanvasRenderingContext2D, canvas?: HTMLCanvasElement): void {
    //   this.objs.forEach((it) => it.onDraw(context));
    //   this.flushCanvas(canvas);
    // }
    // drawObjsAllAndFlush(context: CanvasRenderingContext2D, canvas?: HTMLCanvasElement): void {
    //   this.objsAll.forEach((it) => it.onDraw(context));
    //   this.flushCanvas(canvas);
    // }
    AWStage.prototype.removeObjOnStopDestory = function (obj) {
        CollectionUtil_1.CollectionUtil.removeArrayItem(this._objs, obj, function (it) {
            it.onStop();
            it.onDestroy();
        });
    };
    AWStage.prototype.pushObjCreateStart = function (obj) {
        obj.onCreate();
        obj.onStart();
        this.pushObj(obj);
        return obj;
    };
    AWStage.prototype.clockIntervalSubscribe = function (next) {
        if (ValidUtil_1.ValidUtil.isNullOrUndefined(this.clock)) {
            this.clock = interval_1.interval(this.clockInterval);
        }
        return this.clock.subscribe(next);
    };
    AWStage.prototype.canvasEventSubscribe = function (eventName, next, error, complete) {
        return Observable_1.Observable.fromEvent(this._canvas, eventName).subscribe(next);
    };
    AWStage.prototype.removeObj = function (param) {
        CollectionUtil_1.CollectionUtil.removeArrayItem(this.objs, param);
    };
    return AWStage;
}(Stage_1.Stage));
exports.AWStage = AWStage;
