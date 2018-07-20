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
var AWObj_1 = require("../AWObj");
// import { Point } from '../org/Point';
var BackGround = (function (_super) {
    __extends(BackGround, _super);
    function BackGround(stage, x, y, z, img) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.currentX = 0;
        return _this;
    }
    BackGround.prototype.onDraw = function (context) {
        context.beginPath();
        context.rect(0, 0, this.stage.width, this.stage.height);
        var grd = context.createLinearGradient(this.stage.width / 2, 0, this.stage.width / 2, this.stage.height);
        grd.addColorStop(0, '#031f30');
        grd.addColorStop(0.1, '#032d45');
        grd.addColorStop(0.4, '#8D7BB7');
        grd.addColorStop(0.8, '#f294ae');
        grd.addColorStop(1, '#fed3e6');
        // context.fillStyle = grd;
        context.fillStyle = '#000000';
        context.fill();
    };
    BackGround.prototype.onCreate = function (data) {
    };
    BackGround.prototype.onDestroy = function (data) {
    };
    BackGround.prototype.onPause = function (data) {
    };
    BackGround.prototype.onRestart = function (data) {
    };
    BackGround.prototype.onResume = function (data) {
    };
    BackGround.prototype.onStart = function (data) {
    };
    BackGround.prototype.onStop = function (data) {
    };
    return BackGround;
}(AWObj_1.AWObj));
exports.BackGround = BackGround;
