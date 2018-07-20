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
var Algo_1 = require("../../../../../../../../../common/com/khh/omnifit/game/arm-wrestling/domain/Algo");
var RandomUtil_1 = require("../../../../../../../../../lib-typescript/com/khh/random/RandomUtil");
var DeviceManager_1 = require("../../../drive/DeviceManager");
var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1(uuid, host, name) {
        var _this = _super.call(this, uuid, host) || this;
        _this.name = name;
        return _this;
    }
    Level1.prototype.onCreate = function (data) {
        var _this = this;
        this.concentrationSubscription = DeviceManager_1.DeviceManager.getInstance().headsetConcentrationSubscribe(function (concentration) {
            if (RandomUtil_1.RandomUtil.random(0, 100) <= 30) {
                concentration = Math.min(10, Math.floor(RandomUtil_1.RandomUtil.random(concentration, 10) + 1));
            }
            else {
                concentration = Math.max(0, Math.floor(RandomUtil_1.RandomUtil.random(0, concentration)));
            }
            _this.headsetConcentration = concentration;
            _this.headsetConcentrationHistory.push(concentration);
        });
        return this;
    };
    Level1.prototype.onPause = function (data) {
        return this;
    };
    Level1.prototype.onRestart = function (data) {
        return this;
    };
    Level1.prototype.onResume = function (data) {
        return this;
    };
    Level1.prototype.onStart = function (data) {
        return this;
    };
    Level1.prototype.onStop = function (data) {
        return this;
    };
    Level1.prototype.onDestroy = function (data) {
        this.concentrationSubscription.unsubscribe();
        return this;
    };
    return Level1;
}(Algo_1.Algo));
exports.Level1 = Level1;
