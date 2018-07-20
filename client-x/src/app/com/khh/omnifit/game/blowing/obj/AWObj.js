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
var ObjImg_1 = require("../../../../../../../../../lib-typescript/com/khh/graphics/ObjImg");
var AWObj = (function (_super) {
    __extends(AWObj, _super);
    function AWObj(stage, x, y, z, img, head) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        var _this = _super.call(this, x, y, z, img, head) || this;
        _this._stage = stage;
        return _this;
    }
    Object.defineProperty(AWObj.prototype, "stage", {
        get: function () {
            // if (typeof this._stage === 'function') {
            //   return this._stage();
            // }
            return this._stage;
        },
        set: function (value) {
            this._stage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AWObj.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    return AWObj;
}(ObjImg_1.ObjImg));
exports.AWObj = AWObj;
