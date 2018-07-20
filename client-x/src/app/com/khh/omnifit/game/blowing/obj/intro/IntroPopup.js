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
var Rect_1 = require("../../../../../../../../../../lib-typescript/com/khh/graphics/Rect");
var MathUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/MathUtil");
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var Level1_1 = require("../../algo/Level1");
var Level2_1 = require("../../algo/Level2");
var Level3_1 = require("../../algo/Level3");
var AWResourceManager_1 = require("../../AWResourceManager");
var AWStageManager_1 = require("../../AWStageManager");
var AWObj_1 = require("../AWObj");
var IntroPopup = (function (_super) {
    __extends(IntroPopup, _super);
    function IntroPopup(stage, x, y, z, img) {
        return _super.call(this, stage, x, y, z, img) || this;
    }
    IntroPopup.prototype.onDraw = function (context) {
        this.x = (this.stage.width / 2) - this.img.width / 2;
        this.y = this.stage.height - (this.img.height) - 50;
        var imgStartX = this.x;
        var imgStartY = this.y;
        var imgEndX = this.x + this.img.width;
        var imgEndY = this.y + this.img.height;
        this.hitArea = new Rect_1.Rect(imgStartX, imgStartY, imgEndX, imgEndY);
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
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.introPopup)) {
            context.drawImage(this.introPopup, (this.stage.width / 2) - this.introPopup.width / 2, (this.stage.height / 2) - this.introPopup.height / 2);
            var x1 = (this.stage.width / 2) - (this.btn1levelImg.width / 2) - (this.btn1levelImg.width + 20);
            var x2 = (this.stage.width / 2) - (this.btn2levelImg.width / 2) - (0);
            var x3 = (this.stage.width / 2) - (this.btn3levelImg.width / 2) + (this.btn3levelImg.width + 20);
            var y1 = (this.stage.height / 2) - this.btn1levelImg.height / 2;
            var y2 = (this.stage.height / 2) - this.btn2levelImg.height / 2;
            var y3 = (this.stage.height / 2) - this.btn3levelImg.height / 2;
            context.drawImage(this.btn1levelImg, x1, y1);
            context.drawImage(this.btn2levelImg, x2, y2);
            context.drawImage(this.btn3levelImg, x3, y3);
            this.btn1levelImgHit = new Rect_1.Rect(x1, y1, x1 + this.btn1levelImg.width, y1 + this.btn1levelImg.height);
            this.btn2levelImgHit = new Rect_1.Rect(x2, y2, x2 + this.btn2levelImg.width, y2 + this.btn2levelImg.height);
            this.btn3levelImgHit = new Rect_1.Rect(x3, y3, x3 + this.btn3levelImg.width, y3 + this.btn3levelImg.height);
        }
        // if ((new Date().getSeconds() % 2) / 0.5) {
        if (Math.floor(new Date().getMilliseconds() / 500)) {
            context.drawImage(this.img, this.x, this.y);
        }
    };
    IntroPopup.prototype.setupPopup = function () {
        this.introPopup = AWResourceManager_1.AWResourceManager.getInstance().resources('intro_popupImg');
        this.btn1levelImg = AWResourceManager_1.AWResourceManager.getInstance().resources('btn1levelImg');
        this.btn2levelImg = AWResourceManager_1.AWResourceManager.getInstance().resources('btn2levelImg');
        this.btn3levelImg = AWResourceManager_1.AWResourceManager.getInstance().resources('btn3levelImg');
    };
    IntroPopup.prototype.onStart = function (data) {
        var _this = this;
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(data)) {
            this.setupPopup();
        }
        this.mousedownSubscription = this.stage.canvasEventSubscribe('mousedown', function (event) {
            // console.log('--' + event.offsetX + ',' + event.offsetY + '   ' + this.hitArea.contains(event.offsetX, event.offsetY) + this.hitArea);
            if (ValidUtil_1.ValidUtil.isNullOrUndefined(_this.introPopup)) {
                _this.setupPopup();
            }
            else if (!ValidUtil_1.ValidUtil.isNullOrUndefined(_this.btn1levelImgHit) && _this.btn1levelImgHit.contains(event.offsetX, event.offsetY)) {
                AWStageManager_1.AWStageManager.getInstance().nextStage(new Level1_1.Level1('level1', 'other', 'char_00').onCreate().onStart());
            }
            else if (!ValidUtil_1.ValidUtil.isNullOrUndefined(_this.btn2levelImgHit) && _this.btn2levelImgHit.contains(event.offsetX, event.offsetY)) {
                AWStageManager_1.AWStageManager.getInstance().nextStage(new Level2_1.Level2('level2', 'other', 'char_01').onCreate().onStart());
            }
            else if (!ValidUtil_1.ValidUtil.isNullOrUndefined(_this.btn3levelImgHit) && _this.btn3levelImgHit.contains(event.offsetX, event.offsetY)) {
                AWStageManager_1.AWStageManager.getInstance().nextStage(new Level3_1.Level3('level3', 'other', 'char_02').onCreate().onStart());
            }
        });
    };
    IntroPopup.prototype.onStop = function () {
        console.log('touchScreen stop');
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.mousedownSubscription)) {
            this.mousedownSubscription.unsubscribe();
        }
    };
    IntroPopup.prototype.onCreate = function (data) { };
    IntroPopup.prototype.onDestroy = function (data) { };
    IntroPopup.prototype.onPause = function (data) { };
    IntroPopup.prototype.onRestart = function (data) { };
    IntroPopup.prototype.onResume = function (data) { };
    return IntroPopup;
}(AWObj_1.AWObj));
exports.IntroPopup = IntroPopup;
