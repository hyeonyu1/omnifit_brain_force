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
var MainBackGround = (function (_super) {
    __extends(MainBackGround, _super);
    function MainBackGround(stage, x, y, z, img) {
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.imgAlign = 'center';
        _this.imgBaseline = 'hanging';
        return _this;
    }
    MainBackGround.prototype.onCreate = function (data) {
    };
    MainBackGround.prototype.onDestroy = function (data) {
    };
    MainBackGround.prototype.onDraw = function (context) {
        this.x = this.stage.width / 2;
        this.y = 0;
        this.drawImage(context);
    };
    MainBackGround.prototype.onPause = function (data) {
    };
    MainBackGround.prototype.onRestart = function (data) {
    };
    MainBackGround.prototype.onResume = function (data) {
    };
    MainBackGround.prototype.onStart = function (data) {
    };
    MainBackGround.prototype.onStop = function (data) {
    };
    return MainBackGround;
}(AWObj_1.AWObj));
exports.MainBackGround = MainBackGround;
