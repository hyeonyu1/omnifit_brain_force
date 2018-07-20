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
var DeviceManager_1 = require("../../../drive/DeviceManager");
var Local = (function (_super) {
    __extends(Local, _super);
    function Local(uuid, host) {
        return _super.call(this, uuid, host) || this;
    }
    Local.prototype.onCreate = function (data) {
        var _this = this;
        this.concentrationSubscription = DeviceManager_1.DeviceManager.getInstance().headsetConcentrationSubscribe(function (concentration) {
            _this.headsetConcentration = concentration;
            _this.headsetConcentrationHistory.push(concentration);
        });
        return this;
    };
    Local.prototype.onPause = function (data) {
        return this;
    };
    Local.prototype.onRestart = function (data) {
        return this;
    };
    Local.prototype.onResume = function (data) {
        return this;
    };
    Local.prototype.onStart = function (data) {
        return this;
    };
    Local.prototype.onStop = function (data) {
        return this;
    };
    Local.prototype.onDestroy = function (data) {
        this.concentrationSubscription.unsubscribe();
        return this;
    };
    return Local;
}(Algo_1.Algo));
exports.Local = Local;
