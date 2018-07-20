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
var Info_1 = require("../../../../../../../../../../common/com/khh/omnifit/game/arm-wrestling/info/Info");
var PointVector_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/PointVector");
var RandomUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/random/RandomUtil");
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWStageEvent_1 = require("../../stage/AWStageEvent");
var AWObj_1 = require("../AWObj");
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(stage, x, y, z, img) {
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.beforeConcentration = 0;
        _this.concentration = 0;
        _this.btnText = '-';
        _this.sizejump = 100;
        console.log('timer create');
        return _this;
    }
    Timer.prototype.onDraw = function (context) {
        if (this.btnText.length <= 0) {
            //this.stage.removeObjOnStopDestory(this);
            return;
        }
        var fontPT = this.sizejump--;
        var tw = (context.measureText(this.btnText).width / 2);
        var th = fontPT * 1.5;
        this.x = this.stage.width / 2;
        this.y = this.stage.height / 2;
        var imgStartX = this.x - tw;
        var imgStartY = this.y - th;
        var imgEndX = this.x + this.img.width + tw;
        var imgEndY = this.y + this.img.height + th;
        // context.fillStyle = 'blue';
        // context.fillText(this.btnText, this.stage.width / 2, this.stage.height / 2);
        //
        context.strokeStyle = '#000000';
        // context.shadowColor = '#000000';
        // context.shadowOffsetX = -1;
        // context.shadowOffsetY = -1;
        // context.font = 'bold  ' + fontPT + 'pt Multicolore';
        context.font = fontPT + 'pt Multicolore';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#FFFFFF';
        context.lineWidth = 1;
        context.fillText(this.btnText, this.stage.width / 2, this.stage.height / 2);
        context.strokeText(this.btnText, this.stage.width / 2, this.stage.height / 2);
    };
    Timer.prototype.onStart = function (data) {
        var _this = this;
        // this.position = this.position || new PointVector(RandomUtil.random(this.stage.width), RandomUtil.random(this.stage.height));
        //console.log('drone start id ' + this.id);
        this.x = RandomUtil_1.RandomUtil.random(this.stage.width);
        this.y = this.stage.height;
        this.velocity = new PointVector_1.PointVector(0, 0);
        this.acceleration = new PointVector_1.PointVector(0, 0);
        this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent_1.AWStageEvent.EVENT_ROOM_DETAIL).filter(function (it) { return it.status === 'wait' || it.status === 'run'; }).subscribe(function (room) {
            //console.log(room.status + ' ' + room.startCnt + '  ' + room.endCnt);
            _this.btnText = room.startCnt;
            _this.sizejump = 100;
            if (room.endCnt < Info_1.Info.END_CNT) {
                _this.btnText = '';
            }
        });
    };
    Timer.prototype.onStop = function () {
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {
            this.roomDetailSubscription.unsubscribe();
        }
    };
    Timer.prototype.onCreate = function (data) { };
    Timer.prototype.onDestroy = function (data) { };
    Timer.prototype.onPause = function (data) { };
    Timer.prototype.onRestart = function (data) { };
    Timer.prototype.onResume = function (data) { };
    return Timer;
}(AWObj_1.AWObj));
exports.Timer = Timer;
