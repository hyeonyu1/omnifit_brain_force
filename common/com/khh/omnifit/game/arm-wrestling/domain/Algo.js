"use strict";
exports.__esModule = true;
var Algo = (function () {
    function Algo(uuid, host) {
        if (uuid === void 0) { uuid = 'local'; }
        if (host === void 0) { host = 'local'; }
        this.headsetConcentration = 0;
        this.headsetConcentrationHistory = new Array();
        this.uuid = uuid;
        this.host = host;
    }
    Algo.prototype.clearConcentration = function () {
        this.headsetConcentration = 0;
        this.headsetConcentrationHistory.length = 0;
        this.headsetConcentrationHistory = new Array();
    };
    return Algo;
}());
exports.Algo = Algo;
