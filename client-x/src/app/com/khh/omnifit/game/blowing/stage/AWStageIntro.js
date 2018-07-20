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
var ValidUtil_1 = require("../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWStageManager_1 = require("../AWStageManager");
var AWStage_1 = require("./AWStage");
//websocket https://tutorialedge.net/typescript/angular/angular-websockets-tutorial/
var AWStageIntro = (function (_super) {
    __extends(AWStageIntro, _super);
    function AWStageIntro(canvas, objs) {
        return _super.call(this, canvas, objs) || this;
    }
    AWStageIntro.prototype.onDraw = function () {
        var _this = this;
        var context = this.bufferCanvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
        var x = this.width / 2;
        var y = this.height / 2;
        //objs draw
        AWStageManager_1.AWStageManager.getInstance().getAllObjs(this).forEach(function (it) {
            _this.resetContext(context);
            it.onDraw(context);
        });
        context.font = '100px Multicolore, Roboto-Thin';
        this.flushBufferToCanvas();
    };
    AWStageIntro.prototype.onCreate = function (data) {
        this.objs.forEach(function (it) { return it.onCreate(data); });
    };
    AWStageIntro.prototype.onStart = function (data) {
        var _this = this;
        console.log('intro onStart');
        // this.audio = ResourceManager.getInstance().resources('videoplaybackSound');
        // this.audio.play();
        this.clockSubscription = this.clockIntervalSubscribe(function (date) { return _this.onDraw(); });
        this.resizeSubscription = this.canvasEventSubscribe('resize', function (evnet) { return _this.onDraw(); });
        this.objs.forEach(function (it) { return it.onStart(data); });
        this.onDraw();
    };
    AWStageIntro.prototype.onStop = function (data) {
        console.log('intro onStop');
        // if (this.audio) {
        //   this.audio.pause();
        // }
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.resizeSubscription)) {
            this.resizeSubscription.unsubscribe();
        }
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.clockSubscription)) {
            this.clockSubscription.unsubscribe();
        }
        this.objs.forEach(function (it) { return it.onStop(data); });
    };
    AWStageIntro.prototype.eventObservable = function (eventName) {
        return undefined;
    };
    AWStageIntro.prototype.onResume = function (data) { this.objs.forEach(function (it) { return it.onResume(data); }); };
    AWStageIntro.prototype.onRestart = function (data) { this.objs.forEach(function (it) { return it.onRestart(data); }); };
    AWStageIntro.prototype.onPause = function (data) { this.objs.forEach(function (it) { return it.onPause(data); }); };
    AWStageIntro.prototype.onDestroy = function (data) { this.objs.forEach(function (it) { return it.onDestroy(data); }); };
    return AWStageIntro;
}(AWStage_1.AWStage));
exports.AWStageIntro = AWStageIntro;
