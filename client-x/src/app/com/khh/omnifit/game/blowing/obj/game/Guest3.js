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
var PointVector_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/PointVector");
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWResourceManager_1 = require("../../AWResourceManager");
var AWObj_1 = require("../AWObj");
var Guest3 = (function (_super) {
    __extends(Guest3, _super);
    function Guest3(stage, x, y, z, img) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.gHand1 = AWResourceManager_1.AWResourceManager.getInstance().resources('guest_hand1Img');
        _this.gHand2 = AWResourceManager_1.AWResourceManager.getInstance().resources('guest_hand2Img');
        _this.gBody = AWResourceManager_1.AWResourceManager.getInstance().resources('guest_bodyImg');
        _this.gHead = AWResourceManager_1.AWResourceManager.getInstance().resources('guest_head3Img');
        _this.gHand1Position = new PointVector_1.PointVector(25, 150);
        _this.gBodyPosition = new PointVector_1.PointVector(100, 200);
        _this.gHand2Position = new PointVector_1.PointVector(170, 150);
        _this.gHeadPosition = new PointVector_1.PointVector(100, 80);
        _this.gap = 10;
        _this.gHand1Idx = 1;
        _this.gHand1Map = [
            _this.gHand1Position.get(),
            new PointVector_1.PointVector(_this.gHand1Position.x + (_this.gap * 1), _this.gHand1Position.y + (_this.gap * 0)),
            new PointVector_1.PointVector(_this.gHand1Position.x + (_this.gap * 0), _this.gHand1Position.y - (_this.gap * 1)),
            new PointVector_1.PointVector(_this.gHand1Position.x - (_this.gap * 1), _this.gHand1Position.y + (_this.gap * 0)),
            new PointVector_1.PointVector(_this.gHand1Position.x + (_this.gap * 0), _this.gHand1Position.y + (_this.gap * 1)),
        ];
        _this.gHand1TargetPosition = _this.gHand1Map[_this.gHand1Idx];
        _this.gHand2Idx = 1;
        _this.gHand2Map = [
            _this.gHand2Position.get(),
            new PointVector_1.PointVector(_this.gHand2Position.x + (_this.gap * 0), _this.gHand2Position.y - (_this.gap * 1)),
            new PointVector_1.PointVector(_this.gHand2Position.x + (_this.gap * 0), _this.gHand2Position.y + (_this.gap * 1)),
            new PointVector_1.PointVector(_this.gHand2Position.x - (_this.gap * 1), _this.gHand2Position.y + (_this.gap * 0)),
            new PointVector_1.PointVector(_this.gHand2Position.x + (_this.gap * 1), _this.gHand2Position.y + (_this.gap * 0)),
        ];
        _this.gHand2TargetPosition = _this.gHand2Map[_this.gHand2Idx];
        _this.gBodyIdx = 1;
        _this.gBodyMap = [
            _this.gBodyPosition.get(),
            new PointVector_1.PointVector(_this.gBodyPosition.x + (_this.gap * 0), _this.gBodyPosition.y - (_this.gap * 1)),
            new PointVector_1.PointVector(_this.gBodyPosition.x - (_this.gap * 1), _this.gBodyPosition.y + (_this.gap * 0)),
            new PointVector_1.PointVector(_this.gBodyPosition.x + (_this.gap * 0), _this.gBodyPosition.y + (_this.gap * 1)),
            new PointVector_1.PointVector(_this.gBodyPosition.x + (_this.gap * 1), _this.gBodyPosition.y + (_this.gap * 0)),
        ];
        _this.gBodyTargetPosition = _this.gBodyMap[_this.gBodyIdx];
        _this.gHeadIdx = 1;
        _this.gHeadMap = [
            _this.gHeadPosition.get(),
            new PointVector_1.PointVector(_this.gHeadPosition.x + (_this.gap * 0), _this.gHeadPosition.y + (_this.gap * 1)),
            new PointVector_1.PointVector(_this.gHeadPosition.x + (_this.gap * 0), _this.gHeadPosition.y - (_this.gap * 1)),
            new PointVector_1.PointVector(_this.gHeadPosition.x + (_this.gap * 1), _this.gHeadPosition.y + (_this.gap * 0)),
            new PointVector_1.PointVector(_this.gHeadPosition.x - (_this.gap * 1), _this.gHeadPosition.y + (_this.gap * 0)),
        ];
        _this.gHeadTargetPosition = _this.gHeadMap[_this.gHeadIdx];
        _this.imgAlign = 'center';
        _this.imgBaseline = 'middle';
        return _this;
    }
    Guest3.prototype.onDraw = function (context) {
        context.translate(this.translatePosition.x, this.translatePosition.y);
        //////update
        //몸
        var bodyDir = PointVector_1.PointVector.sub(this.gBodyTargetPosition, this.gBodyPosition);
        bodyDir.normalize();
        bodyDir.mult(0.7);
        this.gBodyVelocity.add(bodyDir);
        this.gBodyVelocity.limit(10);
        var bodyOldPosition = this.gBodyPosition.get();
        this.gBodyPosition.add(this.gBodyVelocity);
        // console.log(this.gBodyTargetPosition + ' 2 ' + this.gBodyPosition);
        var bodyOldCheck = PointVector_1.PointVector.sub(bodyOldPosition, this.gBodyTargetPosition);
        var bodyCheck = PointVector_1.PointVector.sub(this.gBodyPosition, this.gBodyTargetPosition);
        if (bodyOldCheck.x <= 0 && bodyCheck.x > 0 || bodyOldCheck.x >= 0 && bodyCheck.x < 0) {
            this.gBodyPosition.x = this.gBodyTargetPosition.x;
            this.gBodyVelocity.x = 0;
        }
        if (bodyOldCheck.y <= 0 && bodyCheck.y > 0 || bodyOldCheck.y >= 0 && bodyCheck.y < 0) {
            this.gBodyPosition.y = this.gBodyTargetPosition.y;
            this.gBodyVelocity.y = 0;
        }
        if (this.gBodyPosition.x === this.gBodyTargetPosition.x && this.gBodyPosition.y === this.gBodyTargetPosition.y) {
            this.gBodyIdx++;
            this.gBodyIdx = (this.gBodyIdx + 1 > this.gBodyMap.length ? 0 : this.gBodyIdx);
            this.gBodyTargetPosition = this.gBodyMap[this.gBodyIdx];
        }
        this.drawImage(context, this.gBody, this.gBodyPosition.x, this.gBodyPosition.y);
        context.beginPath();
        context.fillStyle = '#FF0000';
        context.fill();
        // for (const it of this.gBodyMap) {
        //   context.beginPath();
        //   context.arc(it.x, it.y, 5, 0, 2 * Math.PI);
        //   context.fill();
        // }
        // context.beginPath();
        // context.arc(this.gBodyPosition.x, this.gBodyPosition.y, 10, 0, 2 * Math.PI);
        // context.fill();
        //머리
        var headDir = PointVector_1.PointVector.sub(this.gHeadTargetPosition, this.gHeadPosition);
        headDir.normalize();
        headDir.mult(0.7);
        this.gHeadVelocity.add(headDir);
        this.gHeadVelocity.limit(10);
        var headOldPosition = this.gHeadPosition.get();
        this.gHeadPosition.add(this.gHeadVelocity);
        var headOldCheck = PointVector_1.PointVector.sub(headOldPosition, this.gHeadTargetPosition);
        var headCheck = PointVector_1.PointVector.sub(this.gHeadPosition, this.gHeadTargetPosition);
        if (headOldCheck.x <= 0 && headCheck.x > 0 || headOldCheck.x >= 0 && headCheck.x < 0) {
            this.gHeadPosition.x = this.gHeadTargetPosition.x;
            this.gHeadVelocity.x = 0;
        }
        if (headOldCheck.y <= 0 && headCheck.y > 0 || headOldCheck.y >= 0 && headCheck.y < 0) {
            this.gHeadPosition.y = this.gHeadTargetPosition.y;
            this.gHeadVelocity.y = 0;
        }
        if (this.gHeadPosition.x === this.gHeadTargetPosition.x && this.gHeadPosition.y === this.gHeadTargetPosition.y) {
            this.gHeadIdx++;
            this.gHeadIdx = (this.gHeadIdx + 1 > this.gHeadMap.length ? 0 : this.gHeadIdx);
            this.gHeadTargetPosition = this.gHeadMap[this.gHeadIdx];
        }
        this.drawImage(context, this.gHead, this.gHeadPosition.x, this.gHeadPosition.y);
        context.fillStyle = '#FFF000';
        context.beginPath();
        context.fill();
        // for (const it of this.gHeadMap) {
        //   context.beginPath();
        //   context.arc(it.x, it.y, 5, 0, 2 * Math.PI);
        //   context.fill();
        // }
        // context.beginPath();
        // context.arc(this.gHeadPosition.x, this.gHeadPosition.y, 10, 0, 2 * Math.PI);
        // context.fill();
        //손1
        var hand1Dir = PointVector_1.PointVector.sub(this.gHand1TargetPosition, this.gHand1Position);
        hand1Dir.normalize();
        hand1Dir.mult(0.7);
        this.gHand1Velocity.add(hand1Dir);
        this.gHand1Velocity.limit(10);
        var hand1OldPosition = this.gHand1Position.get();
        this.gHand1Position.add(this.gHand1Velocity);
        var hand1OldCheck = PointVector_1.PointVector.sub(hand1OldPosition, this.gHand1TargetPosition);
        var hand1Check = PointVector_1.PointVector.sub(this.gHand1Position, this.gHand1TargetPosition);
        if (hand1OldCheck.x <= 0 && hand1Check.x > 0 || hand1OldCheck.x >= 0 && hand1Check.x < 0) {
            this.gHand1Position.x = this.gHand1TargetPosition.x;
            this.gHand1Velocity.x = 0;
        }
        if (hand1OldCheck.y <= 0 && hand1Check.y > 0 || hand1OldCheck.y >= 0 && hand1Check.y < 0) {
            this.gHand1Position.y = this.gHand1TargetPosition.y;
            this.gHand1Velocity.y = 0;
        }
        if (this.gHand1Position.x === this.gHand1TargetPosition.x && this.gHand1Position.y === this.gHand1TargetPosition.y) {
            this.gHand1Idx++;
            this.gHand1Idx = (this.gHand1Idx + 1 > this.gHand1Map.length ? 0 : this.gHand1Idx);
            this.gHand1TargetPosition = this.gHand1Map[this.gHand1Idx];
        }
        this.drawImage(context, this.gHand1, this.gHand1Position.x, this.gHand1Position.y);
        context.fillStyle = '#FFFF00';
        context.beginPath();
        context.fill();
        // for (const it of this.gHand1Map) {
        //   context.beginPath();
        //   context.arc(it.x, it.y, 5, 0, 2 * Math.PI);
        //   context.fill();
        // }
        // context.beginPath();
        // context.arc(this.gHand1Position.x, this.gHand1Position.y, 10, 0, 2 * Math.PI);
        // context.fill();
        //손2
        var hand2Dir = PointVector_1.PointVector.sub(this.gHand2TargetPosition, this.gHand2Position);
        hand2Dir.normalize();
        hand2Dir.mult(0.7);
        this.gHand2Velocity.add(hand2Dir);
        this.gHand2Velocity.limit(10);
        var hand2OldPosition = this.gHand2Position.get();
        this.gHand2Position.add(this.gHand2Velocity);
        var hand2OldCheck = PointVector_1.PointVector.sub(hand2OldPosition, this.gHand2TargetPosition);
        var hand2Check = PointVector_1.PointVector.sub(this.gHand2Position, this.gHand2TargetPosition);
        if (hand2OldCheck.x <= 0 && hand2Check.x > 0 || hand2OldCheck.x >= 0 && hand2Check.x < 0) {
            this.gHand2Position.x = this.gHand2TargetPosition.x;
            this.gHand2Velocity.x = 0;
        }
        if (hand2OldCheck.y <= 0 && hand2Check.y > 0 || hand2OldCheck.y >= 0 && hand2Check.y < 0) {
            this.gHand2Position.y = this.gHand2TargetPosition.y;
            this.gHand2Velocity.y = 0;
        }
        if (this.gHand2Position.x === this.gHand2TargetPosition.x && this.gHand2Position.y === this.gHand2TargetPosition.y) {
            this.gHand2Idx++;
            this.gHand2Idx = (this.gHand2Idx + 1 > this.gHand2Map.length ? 0 : this.gHand2Idx);
            this.gHand2TargetPosition = this.gHand2Map[this.gHand2Idx];
        }
        this.drawImage(context, this.gHand2, this.gHand2Position.x, this.gHand2Position.y);
        context.fillStyle = '#FFFFF0';
        context.beginPath();
        context.fill();
        // for (const it of this.gHand2Map) {
        //   context.beginPath();
        //   context.arc(it.x, it.y, 5, 0, 2 * Math.PI);
        //   context.fill();
        // }
        // context.beginPath();
        // context.arc(this.gHand2Position.x, this.gHand2Position.y, 10, 0, 2 * Math.PI);
        // context.fill();
        // context.drawImage(this.gHead, this.gHeadPosition.x, this.gHeadPosition.y);
        // context.drawImage(this.gHand1, this.gHand1Position.x, this.gHand1Position.y);
        // context.drawImage(this.gHand2, this.gHand2Position.x, this.gHand2Position.y);
        //checkEdges
        if (this.x > this.stage.width) {
            this.initSetting();
        }
    };
    Guest3.prototype.onCreate = function (data) {
    };
    Guest3.prototype.onDestroy = function (data) {
    };
    Guest3.prototype.onPause = function (data) {
    };
    Guest3.prototype.onRestart = function (data) {
    };
    Guest3.prototype.onResume = function (data) {
    };
    Guest3.prototype.onStart = function (data) {
        var _this = this;
        this.initSetting();
        this.resizeSubscription = this.stage.canvasEventSubscribe('resize', function (event) { return _this.initSetting(); });
    };
    Guest3.prototype.onStop = function (data) {
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.resizeSubscription)) {
            this.resizeSubscription.unsubscribe();
        }
    };
    Guest3.prototype.initSetting = function () {
        this.gHand1Velocity = new PointVector_1.PointVector(0, 0);
        this.gHand2Velocity = new PointVector_1.PointVector(0, 0);
        this.gBodyVelocity = new PointVector_1.PointVector(0, 0);
        this.gHeadVelocity = new PointVector_1.PointVector(0, 0);
        this.translatePosition = new PointVector_1.PointVector(this.stage.width - 150, 20);
    };
    return Guest3;
}(AWObj_1.AWObj));
exports.Guest3 = Guest3;
