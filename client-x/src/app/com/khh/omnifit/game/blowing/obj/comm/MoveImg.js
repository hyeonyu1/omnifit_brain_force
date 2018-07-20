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
var MoveImg = (function (_super) {
    __extends(MoveImg, _super);
    function MoveImg(stage, x, y, z, img) {
        return _super.call(this, stage, x, y, z, img) || this;
    }
    MoveImg.prototype.onDraw = function (context) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        var targetPosition = this.targetPosition();
        //////update
        //방향
        var dir = PointVector_1.PointVector.sub(targetPosition, this);
        var mag = dir.mag();
        dir.normalize();
        dir.mult(this.accelerationStep);
        // dir.mult(0.2);
        this.acceleration = dir; //가속도
        var oldVelocity = this.velocity.get();
        this.velocity.add(this.acceleration); //속도
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
        // context.textAlign = 'center';
        // context.textBaseline = 'middle';
        // let x = this.x;
        // let y = this.y;
        // //https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_textalign
        // if (this.imgAlign === 'center') {
        //   x = this.x - (this.img.width / 2);
        // }
        // //https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_textbaseline
        // if (this.imgBaseline === 'middle') {
        //   y = this.y - (this.img.height / 2);
        // }else if (this.imgBaseline === 'hanging') {
        //   y = this.y;
        // }else if (this.imgBaseline === 'bottom') {
        //   y = this.y - (this.img.height);
        // }
        // context.drawImage(this.img, x, y);
        this.drawImage(context);
    };
    MoveImg.prototype.onStart = function (data) {
        this.set(this.startPosition());
        this.accelerationStep = new PointVector_1.PointVector(0.2, 0.2, 0);
        this.acceleration = new PointVector_1.PointVector(0, 0);
        this.velocity = new PointVector_1.PointVector(0, 0);
    };
    MoveImg.prototype.startPosition = function () {
        return new PointVector_1.PointVector(RandomUtil_1.RandomUtil.random(this.stage.width), RandomUtil_1.RandomUtil.random(this.stage.height));
    };
    MoveImg.prototype.targetPosition = function () {
        return new PointVector_1.PointVector((this.stage.width / 2), (this.stage.height / 2));
    };
    MoveImg.prototype.onStop = function () { };
    MoveImg.prototype.onCreate = function (data) { };
    MoveImg.prototype.onDestroy = function (data) { };
    MoveImg.prototype.onPause = function (data) { };
    MoveImg.prototype.onRestart = function (data) { };
    MoveImg.prototype.onResume = function (data) { };
    return MoveImg;
}(AWObj_1.AWObj));
exports.MoveImg = MoveImg;
