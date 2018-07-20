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
var MoveImg_1 = require("../comm/MoveImg");
var IntroIcon = (function (_super) {
    __extends(IntroIcon, _super);
    function IntroIcon(stage, x, y, z, img) {
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.imgAlign = 'center';
        _this.imgBaseline = 'middle';
        return _this;
    }
    IntroIcon.prototype.startPosition = function () {
        return new PointVector_1.PointVector(RandomUtil_1.RandomUtil.random(this.stage.width), this.stage.height);
    };
    IntroIcon.prototype.targetPosition = function () {
        // return super.targetPosition();
        return new PointVector_1.PointVector((this.stage.width / 2), (this.stage.height / 2));
        // return new PointVector(0, 0);
    };
    return IntroIcon;
}(MoveImg_1.MoveImg));
exports.IntroIcon = IntroIcon;
