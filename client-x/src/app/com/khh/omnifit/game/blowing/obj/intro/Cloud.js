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
var RandomUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/random/RandomUtil");
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWObj_1 = require("../AWObj");
// import { Point } from '../org/Point';
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(stage, x, y, z, img) {
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.maxX = 50;
        _this.currentX = 0;
        return _this;
        // console.log('cccccccc');
    }
    Cloud.prototype.onDraw = function (context) {
        this.x += this.mass;
        context.globalAlpha = 0.1;
        context.drawImage(this.img, this.x, this.y);
        // console.log('onDraw ' + this.img);
        //checkEdges
        if (this.x > this.stage.width) {
            this.initSetting();
            this.x = -this.img.width;
        }
    };
    Cloud.prototype.onCreate = function (data) { };
    Cloud.prototype.onDestroy = function (data) { };
    Cloud.prototype.onPause = function (data) { };
    Cloud.prototype.onRestart = function (data) { };
    Cloud.prototype.onResume = function (data) { };
    Cloud.prototype.onStart = function (data) {
        var _this = this;
        this.initSetting();
        this.resizeSubscription = this.stage.canvasEventSubscribe('resize', function (event) { return _this.initSetting(); });
    };
    Cloud.prototype.onStop = function (data) {
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.resizeSubscription)) {
            this.resizeSubscription.unsubscribe();
        }
    };
    Cloud.prototype.initSetting = function () {
        this.x = RandomUtil_1.RandomUtil.random(0, this.stage.width);
        this.y = RandomUtil_1.RandomUtil.random(0, this.stage.height);
        this.mass = 5;
    };
    return Cloud;
}(AWObj_1.AWObj));
exports.Cloud = Cloud;
