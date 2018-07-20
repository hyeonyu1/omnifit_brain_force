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
require("rxjs/add/operator/distinct");
require("rxjs/add/operator/find");
require("rxjs/add/operator/first");
require("rxjs/add/operator/take");
require("rxjs/add/operator/toArray");
var MathUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/MathUtil");
var PointVector_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/PointVector");
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWResourceManager_1 = require("../../AWResourceManager");
var AWStageEvent_1 = require("../../stage/AWStageEvent");
var AWObj_1 = require("../AWObj");
var Score = (function (_super) {
    __extends(Score, _super);
    function Score(stage, x, y, z, img) {
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.beforeHeadsetConcentration = 0;
        _this.headsetConcentration = 0;
        return _this;
    }
    Score.prototype.onDraw = function (context) {
        context.beginPath();
        context.rect(0, this.stage.height - MathUtil_1.MathUtil.getValueByTotInPercent(this.stage.height, 50), this.stage.width, this.stage.height);
        var grd = context.createLinearGradient(this.stage.width / 2, 0, this.stage.width / 2, this.stage.height);
        //context.globalCompositeOperation = "destination-out";
        grd.addColorStop(0.0, 'rgba(0,0,0,0.0)');
        grd.addColorStop(0.1, 'rgba(0,0,0,0.0)');
        grd.addColorStop(0.2, 'rgba(0,0,0,0.0)');
        grd.addColorStop(0.3, 'rgba(0,0,0,0.0)');
        grd.addColorStop(0.4, 'rgba(0,0,0,0.0)');
        grd.addColorStop(0.5, 'rgba(0,0,0,0.0)');
        grd.addColorStop(0.8, 'rgba(0,0,0,0.8)');
        grd.addColorStop(1.0, 'rgba(0,0,0,1.0)');
        context.fillStyle = grd;
        context.fill();
        var headsetConcentration = Math.min(10, this.room ? this.room.local.headsetConcentration : 0);
        var gageBg = AWResourceManager_1.AWResourceManager.getInstance().resources('gage_bgImg');
        var badge = AWResourceManager_1.AWResourceManager.getInstance().resources('gage_badge_offImg');
        var gageBgX = (this.stage.width / 2) - (gageBg.width / 2);
        var gageBgY = this.stage.height - gageBg.height - 10;
        var bageX = gageBgX - (badge.width / 2);
        var bageY = gageBgY - (badge.height / 4);
        var gageBgCenterX = gageBgX + gageBg.width / 2;
        var gageBgCenterY = gageBgY + gageBg.height / 2;
        context.drawImage(gageBg, gageBgX, gageBgY);
        var scoreX = gageBgX + 8;
        var scoreWidth = gageBg.width - 15;
        var scoreY = gageBgY + 8;
        var scoreHeight = gageBg.height - 20;
        //////update
        // //targetPosition
        var stepVal = (scoreWidth) / 10;
        var targetPosition = new PointVector_1.PointVector(stepVal * headsetConcentration, scoreY);
        // //방향
        var dir = PointVector_1.PointVector.sub(targetPosition, this);
        dir.normalize();
        dir.mult(0.7);
        this.acceleration = dir;
        this.velocity.add(this.acceleration);
        this.velocity.limit(7);
        var oldPosition = this.get();
        this.add(this.velocity);
        var oldCheck = PointVector_1.PointVector.sub(oldPosition, targetPosition);
        var check = PointVector_1.PointVector.sub(this, targetPosition);
        if (oldCheck.x <= 0 && check.x > 0 || oldCheck.x >= 0 && check.x < 0) {
            this.x = targetPosition.x;
            this.velocity.x = 0;
        }
        if (oldCheck.y <= 0 && check.y > 0 || oldCheck.y >= 0 && check.y < 0) {
            this.y = targetPosition.y;
            this.velocity.y = 0;
        }
        if (this.x > 1) {
            this.roundedRect(context, scoreX, scoreY, this.x, scoreHeight, 10);
            var grds = context.createLinearGradient(scoreX + scoreWidth, scoreY, scoreX + scoreWidth, scoreY + scoreHeight);
            grds.addColorStop(0, '#96F3F3');
            grds.addColorStop(0.5, '#17BCD4');
            grds.addColorStop(1, '#51CFDE');
            context.fillStyle = grds;
            context.fill();
        }
        context.drawImage(badge, bageX, bageY);
    };
    Score.prototype.onStart = function (data) {
        var _this = this;
        this.beforeHeadsetConcentration = 0;
        this.headsetConcentration = 0;
        this.accelerationStep = new PointVector_1.PointVector(0.2, 0.2, 0);
        this.acceleration = new PointVector_1.PointVector(0, 0);
        this.velocity = new PointVector_1.PointVector(0, 0);
        //집중도
        this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent_1.AWStageEvent.EVENT_ROOM_DETAIL).filter(function (it) { return !ValidUtil_1.ValidUtil.isNullOrUndefined(it.local) && !ValidUtil_1.ValidUtil.isNullOrUndefined(it.other); }).subscribe(function (room) {
            _this.room = room;
        });
    };
    Score.prototype.onStop = function (data) {
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {
            this.roomDetailSubscription.unsubscribe();
        }
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.resizeSubscription)) {
            this.resizeSubscription.unsubscribe();
        }
    };
    Score.prototype.onCreate = function (data) { };
    Score.prototype.onDestroy = function (data) { };
    Score.prototype.onPause = function (data) { };
    Score.prototype.onRestart = function (data) { };
    Score.prototype.onResume = function (data) { };
    return Score;
}(AWObj_1.AWObj));
exports.Score = Score;
