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
var RandomUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/random/RandomUtil");
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWObj_1 = require("../AWObj");
// import { Point } from '../org/Point';
var Star = (function (_super) {
    __extends(Star, _super);
    function Star(stage, x, y, z, img) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        return _super.call(this, stage, x, y, z, img) || this;
    }
    Star.prototype.onDraw = function (context) {
        //////update
        //방향
        var dir = PointVector_1.PointVector.sub(this.targetPosition, this);
        dir.normalize();
        dir.mult(0.7);
        var acceleration = dir;
        this.velocity.add(acceleration);
        this.velocity.limit(10);
        var oldPosition = this.get();
        this.add(this.velocity);
        var oldCheck = PointVector_1.PointVector.sub(oldPosition, this.targetPosition);
        var check = PointVector_1.PointVector.sub(this, this.targetPosition);
        // if (oldCheck.x <= 0 && check.x > 0 || oldCheck.x >= 0 && check.x < 0) {
        //   this.x = this.targetPosition.x;
        //   this.velocity.x = 0;
        // }
        // if (oldCheck.y <= 0 && check.y > 0 || oldCheck.y >= 0 && check.y < 0) {
        //   this.y = this.targetPosition.y;
        //   this.velocity.y = 0;
        // }
        context.beginPath();
        // context.arc(this.x, this.y, this.mass, 0, 2 * Math.PI);
        context.arc(this.x, this.y, this.z, 0, 2 * Math.PI);
        context.fillStyle = 'rgba(0,0,0,0.7)';
        // context.fillStyle = 'rgba(255,0,0,1)';
        context.fill();
        //checkEdges
        if (this.x > this.stage.width) {
            this.initSetting();
        }
    };
    Star.prototype.onCreate = function (data) {
    };
    Star.prototype.onDestroy = function (data) {
    };
    Star.prototype.onPause = function (data) {
    };
    Star.prototype.onRestart = function (data) {
    };
    Star.prototype.onResume = function (data) {
    };
    Star.prototype.onStart = function (data) {
        var _this = this;
        this.initSetting();
        this.resizeSubscription = this.stage.canvasEventSubscribe('resize', function (event) { return _this.initSetting(); });
    };
    Star.prototype.onStop = function (data) {
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.resizeSubscription)) {
            this.resizeSubscription.unsubscribe();
        }
    };
    Star.prototype.initSetting = function () {
        this.velocity = new PointVector_1.PointVector(0, 0);
        this.x = RandomUtil_1.RandomUtil.random(0, this.stage.height);
        this.y = RandomUtil_1.RandomUtil.random(0, this.stage.height);
        this.z = RandomUtil_1.RandomUtil.random(0, 5);
        this.targetPosition = new PointVector_1.PointVector(this.stage.width, RandomUtil_1.RandomUtil.random(this.y - 100, this.y + 100), RandomUtil_1.RandomUtil.random(this.z, 5));
    };
    return Star;
}(AWObj_1.AWObj));
exports.Star = Star;
