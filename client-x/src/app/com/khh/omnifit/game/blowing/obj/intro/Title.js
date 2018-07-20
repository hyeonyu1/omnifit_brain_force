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
var Title = (function (_super) {
    __extends(Title, _super);
    function Title(stage, x, y, z, img) {
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.imgAlign = 'center';
        _this.imgBaseline = 'middle';
        return _this;
    }
    Title.prototype.onCreate = function (data) {
    };
    Title.prototype.onDestroy = function (data) {
    };
    Title.prototype.onDraw = function (context) {
        this.x = this.stage.width / 2;
        this.y = this.stage.height / 2;
        this.drawImage(context);
    };
    Title.prototype.onPause = function (data) {
    };
    Title.prototype.onRestart = function (data) {
    };
    Title.prototype.onResume = function (data) {
    };
    Title.prototype.onStart = function (data) {
    };
    Title.prototype.onStop = function (data) {
    };
    return Title;
}(AWObj_1.AWObj));
exports.Title = Title;
