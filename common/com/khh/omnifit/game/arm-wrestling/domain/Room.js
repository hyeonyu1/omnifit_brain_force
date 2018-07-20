"use strict";
exports.__esModule = true;
var Info_1 = require("../info/Info");
var Room = (function () {
    function Room(uuid, status, startCnt, endCnt, local, other) {
        if (uuid === void 0) { uuid = ''; }
        if (status === void 0) { status = 'wait'; }
        if (startCnt === void 0) { startCnt = Info_1.Info.START_CNT; }
        if (endCnt === void 0) { endCnt = Info_1.Info.END_CNT; }
        this.uuid = uuid;
        this.status = status;
        this.startCnt = startCnt;
        this.endCnt = endCnt;
        this.local = local;
        this.other = other;
    }
    Room.prototype.resetCnt = function () {
        this.startCnt = Info_1.Info.START_CNT;
        this.endCnt = Info_1.Info.END_CNT;
    };
    return Room;
}());
exports.Room = Room;
