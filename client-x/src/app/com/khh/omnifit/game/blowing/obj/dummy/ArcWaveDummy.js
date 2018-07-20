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
var AWObj_1 = require("../AWObj");
var ArcWaveDummy = (function (_super) {
    __extends(ArcWaveDummy, _super);
    function ArcWaveDummy(stage, x, y, z) {
        return _super.call(this, stage, x, y, z) || this;
    }
    ArcWaveDummy.prototype.onStart = function () {
        this.angle = new PointVector_1.PointVector();
        this.velocity = new PointVector_1.PointVector(RandomUtil_1.RandomUtil.random(-0.05, 0.05), RandomUtil_1.RandomUtil.random(-0.05, 0.05));
        this.amplitude = new PointVector_1.PointVector(RandomUtil_1.RandomUtil.random(20, this.stage.width / 2), RandomUtil_1.RandomUtil.random(20, this.stage.height / 2));
    };
    ArcWaveDummy.prototype.onDraw = function (context) {
        this.oscillate();
        var x = Math.sin(this.angle.x) * this.amplitude.x;
        var y = Math.sin(this.angle.y) * this.amplitude.y;
        context.beginPath();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.strokeStyle = '#FFFF00';
        context.lineWidth = 2;
        context.translate(this.stage.width / 2, this.stage.height / 2);
        context.moveTo(0, 0);
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.arc(x, y, 32, 0, 2 * Math.PI);
        context.fill();
    };
    ArcWaveDummy.prototype.oscillate = function () {
        this.angle.add(this.velocity);
    };
    ArcWaveDummy.prototype.onStop = function () { };
    ArcWaveDummy.prototype.onCreate = function (data) { };
    ArcWaveDummy.prototype.onDestroy = function (data) { };
    ArcWaveDummy.prototype.onPause = function (data) { };
    ArcWaveDummy.prototype.onRestart = function (data) { };
    ArcWaveDummy.prototype.onResume = function (data) { };
    return ArcWaveDummy;
}(AWObj_1.AWObj));
exports.ArcWaveDummy = ArcWaveDummy;
