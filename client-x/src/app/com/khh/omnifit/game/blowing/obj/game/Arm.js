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
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var AWResourceManager_1 = require("../../AWResourceManager");
var AWStageEvent_1 = require("../../stage/AWStageEvent");
var AWObj_1 = require("../AWObj");
var MathUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/MathUtil");
var Arm = (function (_super) {
    __extends(Arm, _super);
    function Arm(stage, id) {
        if (id === void 0) { id = 'char_00'; }
        var _this = _super.call(this, stage) || this;
        _this.percent = 50;
        _this.tableImg = AWResourceManager_1.AWResourceManager.getInstance().resources('stage01_tableImg');
        _this.playerHand1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('player_handImg');
        _this.playerArm1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('player_arm1Img');
        _this.playerArm2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('player_arm2Img');
        _this.char_00_head = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_headImg');
        _this.char_01_head = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_headImg');
        _this.goldball = AWResourceManager_1.AWResourceManager.getInstance().resources('goldballImg');
        _this.imgAlign = 'center';
        _this.imgBaseline = 'middle';
        _this.id = id;
        _this.changeChar();
        return _this;
    }
    Arm.prototype.onDraw = function (context) {
        this.drawImage(context, this.tableImg, this.stage.width / 2, this.stage.height / 2);
        this.drawImage(context, this.char_00_head, -50, this.stage.height / 2, 'left', 'middle');
        this.drawImage(context, this.char_01_head, this.stage.width + 50, this.stage.height / 2, 'right', 'middle');
        //targetPosition
        var targetPosition = new PointVector_1.PointVector(this.percent, 0);
        //////update
        //방향
        var dir = PointVector_1.PointVector.sub(targetPosition, this);
        dir.normalize();
        dir.mult(2);
        this.velocity.add(dir);
        this.velocity.limit(1);
        var oldPosition = this.get();
        this.add(this.velocity);
        var oldCheck = PointVector_1.PointVector.sub(oldPosition, targetPosition);
        var check = PointVector_1.PointVector.sub(this, targetPosition);
        // if (oldCheck.x <= 0 && check.x > 0 || oldCheck.x >= 0 && check.x < 0) {
        //   this.x = targetPosition.x;
        //   this.velocity.x = 0;
        // }
        // if (oldCheck.y <= 0 && check.y > 0 || oldCheck.y >= 0 && check.y < 0) {
        //   this.y = targetPosition.y;
        //   this.velocity.y = 0;
        // }
        // this.drawRotate(context, (c)  => {
        //   this.drawImage(c, this.playerArm2Img, playerArm2Position.x, playerArm2Position.y, 'center', 'bottom');
        // }, playerArm2Position.x, playerArm2Position.y, (-20)  - (this.x - 50));
        //
        // this.drawRotate(context, (c)  => {
        //   this.drawImage(context, this.charArm2Img, arm2Position.x, arm2Position.y, 'center', 'bottom');
        // }, arm2Position.x, arm2Position.y, 20 - (this.x - 50));
        MathUtil_1.MathUtil;
        this.drawImage(context, this.goldball, this.stage.width, this.stage.height / 2);
        console.log('per:' + this.percent);
    };
    Arm.prototype.onStart = function (data) {
        var _this = this;
        console.log('drone start id ' + this.id);
        this.changeChar();
        this.velocity = new PointVector_1.PointVector(0, 0);
        this.set(0, 0, 0);
        this.roomDetailSubscription = this.stage.eventObservable(AWStageEvent_1.AWStageEvent.EVENT_ROOM_DETAIL).filter(function (it) { return !ValidUtil_1.ValidUtil.isNullOrUndefined(it.local) && !ValidUtil_1.ValidUtil.isNullOrUndefined(it.other); }).subscribe(function (room) {
            _this.room = room;
            // console.log(this.room.local.headsetConcentration + ' ----- ' + this.room.other.headsetConcentration)
            if (_this.room.local.headsetConcentration > _this.room.other.headsetConcentration) {
                _this.percent = Math.min(100, _this.percent += 10);
            }
            else if (_this.room.local.headsetConcentration < _this.room.other.headsetConcentration) {
                _this.percent = Math.max(0, _this.percent -= 10);
            }
            else {
            }
        });
    };
    Arm.prototype.onStop = function () {
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {
            this.roomDetailSubscription.unsubscribe();
        }
    };
    Arm.prototype.onCreate = function (data) { };
    Arm.prototype.onDestroy = function (data) { };
    Arm.prototype.onPause = function (data) { };
    Arm.prototype.onRestart = function (data) { };
    Arm.prototype.onResume = function (data) { };
    Arm.prototype.changeChar = function (id) {
        if (id === void 0) { id = this.id; }
        switch (id) {
            case 'char_00': {
                this.charArm1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_arm1Img');
                this.charArm2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_arm2Img');
                this.charBodyImg = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_bodyImg');
                this.charFace1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_face1Img');
                this.charFace2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_face2Img');
                this.charFace3Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_face3Img');
                this.charHand1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_hand1Img');
                this.charHand2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_hand2Img');
                this.charHeadImg = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_headImg');
                break;
            }
            case 'char_01': {
                this.charArm1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_arm1Img');
                this.charArm2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_arm2Img');
                this.charBodyImg = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_bodyImg');
                this.charFace1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_face1Img');
                this.charFace2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_face2Img');
                this.charFace3Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_face3Img');
                this.charHand1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_hand1Img');
                this.charHand2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_hand2Img');
                this.charHeadImg = AWResourceManager_1.AWResourceManager.getInstance().resources('char_01_headImg');
                break;
            }
            case 'char_02': {
                this.charArm1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_arm1Img');
                this.charArm2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_arm2Img');
                this.charBodyImg = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_bodyImg');
                this.charFace1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_face1Img');
                this.charFace2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_face2Img');
                this.charFace3Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_face3Img');
                this.charHand1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_hand1Img');
                this.charHand2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_hand2Img');
                this.charHeadImg = AWResourceManager_1.AWResourceManager.getInstance().resources('char_02_headImg');
                break;
            }
            default: {
                this.charArm1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_arm1Img');
                this.charArm2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_arm2Img');
                this.charBodyImg = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_bodyImg');
                this.charFace1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_face1Img');
                this.charFace2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_face2Img');
                this.charFace3Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_face3Img');
                this.charHand1Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_hand1Img');
                this.charHand2Img = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_hand2Img');
                this.charHeadImg = AWResourceManager_1.AWResourceManager.getInstance().resources('char_00_headImg');
            }
        }
    };
    return Arm;
}(AWObj_1.AWObj));
exports.Arm = Arm;
