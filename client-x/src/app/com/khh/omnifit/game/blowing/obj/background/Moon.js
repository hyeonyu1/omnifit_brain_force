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
var MathUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/MathUtil");
var PointVector_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/PointVector");
var RandomUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/random/RandomUtil");
var MoveImg_1 = require("../comm/MoveImg");
var Moon = (function (_super) {
    __extends(Moon, _super);
    function Moon(stage, x, y, z, img) {
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.imgAlign = 'center';
        // this.imgBaseline = 'middle';
        _this.imgBaseline = 'hanging';
        return _this;
    }
    Moon.prototype.startPosition = function () {
        return new PointVector_1.PointVector(RandomUtil_1.RandomUtil.random(this.stage.width), this.stage.height);
    };
    Moon.prototype.targetPosition = function () {
        // return super.targetPosition();
        return new PointVector_1.PointVector(MathUtil_1.MathUtil.getValueByTotInPercent(this.stage.width, 10), 100);
        // return new PointVector(0, 0);
    };
    return Moon;
}(MoveImg_1.MoveImg));
exports.Moon = Moon;
