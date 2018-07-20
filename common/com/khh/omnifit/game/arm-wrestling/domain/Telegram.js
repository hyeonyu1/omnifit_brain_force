"use strict";
exports.__esModule = true;
// import WebSocket = require('ws');
var RandomUtil_1 = require("../../../../../../../lib-typescript/com/khh/random/RandomUtil");
var ValidUtil_1 = require("../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var TelegramStatusCode_1 = require("../code/TelegramStatusCode");
var Telegram = (function () {
    function Telegram(action, method, body, status, uuid) {
        if (action === void 0) { action = ''; }
        if (method === void 0) { method = ''; }
        if (body === void 0) { body = new Object(); }
        if (status === void 0) { status = TelegramStatusCode_1.TelegramStatusCode.OK; }
        this.action = action;
        this.method = method;
        this.status = status;
        this.body = body;
        if (ValidUtil_1.ValidUtil.isNullOrUndefined(uuid)) {
            this.uuid = RandomUtil_1.RandomUtil.uuid();
        }
        else {
            this.uuid = uuid;
        }
    }
    return Telegram;
}());
exports.Telegram = Telegram;
