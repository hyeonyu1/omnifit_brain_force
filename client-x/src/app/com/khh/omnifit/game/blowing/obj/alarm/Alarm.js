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
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWStageEvent_1 = require("../../stage/AWStageEvent");
var AWObj_1 = require("../AWObj");
var Alarm = (function (_super) {
    __extends(Alarm, _super);
    function Alarm(stage, x, y, z, img) {
        return _super.call(this, stage, x, y, z, img) || this;
    }
    Alarm.prototype.onDraw = function (context) {
        if (this.endCnt <= Info_1.Info.END_CNT) {
            var fontPT = 20;
            context.save();
            var width = context.measureText('show me the money 123,456').width;
            context.font = fontPT + 'pt Multicolore';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = '#020f1c';
            context.lineWidth = 0;
            if (this.endCnt < 10) {
                context.translate((this.endCnt % 2) * 5, 0);
            }
            context.drawImage(this.img, this.stage.width - this.img.width - 10, this.y + (this.img.height) + 10);
            context.fillText(String(this.endCnt), this.stage.width - (this.img.width / 2) - 10, this.y + (this.img.height) + (this.img.height / 2) + 12);
            context.restore();
        }
    };
    Alarm.prototype.onStart = function (data) {
        var _this = this;
        this.endCnt = Info_1.Info.END_CNT;
        this.x = 20;
        this.y = 20;
        //집중도
        console.log('--alarm id- ' + this.id);
        this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent_1.AWStageEvent.EVENT_ROOM_DETAIL).filter(function (it) { return it.status === 'run'; }).subscribe(function (room) {
            _this.endCnt = room.endCnt;
        });
    };
    Alarm.prototype.onStop = function (data) {
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {
            this.roomDetailSubscription.unsubscribe();
        }
    };
    Alarm.prototype.onCreate = function (data) { };
    Alarm.prototype.onDestroy = function (data) { };
    Alarm.prototype.onPause = function (data) { };
    Alarm.prototype.onRestart = function (data) { };
    Alarm.prototype.onResume = function (data) { };
    return Alarm;
}(AWObj_1.AWObj));
exports.Alarm = Alarm;
