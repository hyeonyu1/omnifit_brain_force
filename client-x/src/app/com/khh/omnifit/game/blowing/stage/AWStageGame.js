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
require("rxjs/add/observable/bindCallback");
require("rxjs/add/observable/combineLatest");
require("rxjs/add/observable/range");
require("rxjs/add/observable/throw");
require("rxjs/add/observable/zip");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/delay");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/skip");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var interval_1 = require("rxjs/observable/interval");
var RoomStatusCode_1 = require("../../../../../../../../../common/com/khh/omnifit/game/arm-wrestling/code/RoomStatusCode");
var Room_1 = require("../../../../../../../../../common/com/khh/omnifit/game/arm-wrestling/domain/Room");
var Info_1 = require("../../../../../../../../../common/com/khh/omnifit/game/arm-wrestling/info/Info");
var CollectionUtil_1 = require("../../../../../../../../../lib-typescript/com/khh/collection/CollectionUtil");
var PointVector_1 = require("../../../../../../../../../lib-typescript/com/khh/math/PointVector");
var RandomUtil_1 = require("../../../../../../../../../lib-typescript/com/khh/random/RandomUtil");
var ValidUtil_1 = require("../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var Local_1 = require("../algo/Local");
var AWStageManager_1 = require("../AWStageManager");
var Arm_1 = require("../obj/game/Arm");
var ResultPopup_1 = require("../obj/game/ResultPopup");
var AWStage_1 = require("./AWStage");
var AWStageEvent_1 = require("./AWStageEvent");
//공기 및 유체 저항
//https://ko.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-forces/a/air-and-fluid-resistance
var AWStageGame = (function (_super) {
    __extends(AWStageGame, _super);
    function AWStageGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.room = new Room_1.Room();
        return _this;
    }
    AWStageGame.prototype.onDraw = function () {
        var _this = this;
        var context = this.bufferCanvas.getContext('2d');
        AWStageManager_1.AWStageManager.getInstance().getAllObjs(this).forEach(function (it) {
            _this.resetContext(context);
            it.onDraw(context);
        });
        this.flushBufferToCanvas();
    };
    AWStageGame.prototype.onCreate = function (data) {
        this.objs.forEach(function (it) { return it.onCreate(data); });
        this.localAlgo = new Local_1.Local('local', 'local');
        this.localAlgo.onCreate();
    };
    AWStageGame.prototype.onStart = function (data) {
        var _this = this;
        console.log('game start ' + data.constructor.name + ' ' + data.uuid);
        this.otherAlgo = data;
        this.objs.filter(function (it) { return it instanceof Arm_1.Arm; }).forEach(function (it) { return it.id = _this.otherAlgo.name; });
        // this.audio = ResourceManager.getInstance().resources('CSC018Sound');
        // this.audio.play();
        this.eventSubscribes = new Map();
        // this.concentrationSubject = new BehaviorSubject(new AlgoDataSet(this.localAlgo, this.otherAlgo));
        // this.eventSubscribes.set(AWStageEvent.EVENT_CONCENTRATION, this.concentrationSubject);
        this.roomDetailSubject = new BehaviorSubject_1.BehaviorSubject(new Room_1.Room());
        this.eventSubscribes.set(AWStageEvent_1.AWStageEvent.EVENT_ROOM_DETAIL, this.roomDetailSubject);
        this.resultPopup = undefined;
        this.room = new Room_1.Room();
        this.objs.forEach(function (it) { return it.onStart(); });
        this.clockSubscription = this.clockIntervalSubscribe(function (date) { return _this.onDraw(); });
        this.resizeSubscription = this.canvasEventSubscribe('resize', function (event) { return _this.onDraw(); });
        this.localRoomIntervalSubScription = interval_1.interval(Info_1.Info.STEP_UNIT).subscribe(function (it) {
            // console.log(this.room.users.length + ' ' + this.room.startCnt + ' ' + this.room.endCnt);
            if (_this.room.startCnt > 0) {
                _this.room.startCnt = (--_this.room.startCnt);
                _this.room.status = RoomStatusCode_1.RoomStatusCode.WAIT;
            }
            else if (_this.room.startCnt <= 0 && _this.room.endCnt > 0) {
                _this.room.endCnt = (--_this.room.endCnt);
                _this.room.status = RoomStatusCode_1.RoomStatusCode.RUN;
            }
            else if (_this.room.startCnt <= 0 && _this.room.endCnt <= 0) {
                _this.room.status = RoomStatusCode_1.RoomStatusCode.END;
            }
            _this.room.local = _this.localAlgo;
            _this.room.other = _this.otherAlgo;
            _this.roomDetailSubject.next(_this.room);
        });
        this.roomDetailSubScription = this.roomDetailSubject.filter(function (it) { return !ValidUtil_1.ValidUtil.isNullOrUndefined(it.local) && !ValidUtil_1.ValidUtil.isNullOrUndefined(it.other); }).subscribe(function (room) {
            _this.room = room;
            if (RoomStatusCode_1.RoomStatusCode.END === room.status && ValidUtil_1.ValidUtil.isNullOrUndefined(_this.resultPopup)) {
                _this.resultPopup = _this.pushResultPopupOnCreateStart(_this.room);
            }
        });
        // if (!ValidUtil.isNullOrUndefined(this.arm)) {
        //   this.removeObjOnStopDestory(this.arm);
        // }
        // this.arm = new Arm(this, this.otherAlgo.name);
        // this.pushObjCreateStart(this.arm);
    };
    AWStageGame.prototype.onStop = function (data) {
        console.log('game stop');
        // this.audio.pause();
        this.localAlgo.onStop();
        this.otherAlgo.onStop();
        this.objs.forEach(function (it) { return it.onStop(data); });
        if (this.resultPopup) {
            CollectionUtil_1.CollectionUtil.removeArrayItem(this.objs, this.resultPopup);
        }
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.resizeSubscription)) {
            this.resizeSubscription.unsubscribe();
        }
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.clockSubscription)) {
            this.clockSubscription.unsubscribe();
        }
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.localRoomIntervalSubScription)) {
            this.localRoomIntervalSubScription.unsubscribe();
        }
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.roomDetailSubScription)) {
            this.roomDetailSubScription.unsubscribe();
        }
    };
    AWStageGame.prototype.createRandomWind = function () {
        return new PointVector_1.PointVector(Math.floor(RandomUtil_1.RandomUtil.random((this.width / 3) * -1, this.width / 3)));
    };
    AWStageGame.prototype.eventObservable = function (eventName) {
        // return this.eventSubscribes.get(eventName).subscribe(next, error, complete);
        return this.eventSubscribes.get(eventName);
    };
    AWStageGame.prototype.pushResultPopupOnCreateStart = function (room) {
        var resultPopup = new ResultPopup_1.ResultPopup(this, 0, 0, 0);
        resultPopup.index = 1101;
        resultPopup.onCreate(room);
        resultPopup.onStart(room);
        this.pushObj(resultPopup);
        return resultPopup;
    };
    AWStageGame.prototype.onDestroy = function (data) {
        this.localAlgo.onDestroy();
        this.otherAlgo.onDestroy();
        this.objs.forEach(function (it) { return it.onDestroy(data); });
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.audio)) {
            this.audio.pause();
        }
    };
    AWStageGame.prototype.onPause = function (data) {
        this.objs.forEach(function (it) { return it.onPause(data); });
    };
    AWStageGame.prototype.onRestart = function (data) {
        this.objs.forEach(function (it) { return it.onRestart(data); });
    };
    AWStageGame.prototype.onResume = function (data) {
        this.objs.forEach(function (it) { return it.onResume(data); });
    };
    return AWStageGame;
}(AWStage_1.AWStage));
exports.AWStageGame = AWStageGame;
