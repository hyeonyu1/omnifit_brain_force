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
var Rect_1 = require("../../../../../../../../../../lib-typescript/com/khh/graphics/Rect");
var PointVector_1 = require("../../../../../../../../../../lib-typescript/com/khh/math/PointVector");
var ValidUtil_1 = require("../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil");
var DeviceManager_1 = require("../../../../drive/DeviceManager");
var AWResourceManager_1 = require("../../AWResourceManager");
var AWStageManager_1 = require("../../AWStageManager");
var AWObj_1 = require("../AWObj");
var ResultPopup = (function (_super) {
    __extends(ResultPopup, _super);
    function ResultPopup(stage, x, y, z, img) {
        var _this = _super.call(this, stage, x, y, z, img) || this;
        _this.result_popup_bgImg = AWResourceManager_1.AWResourceManager.getInstance().resources('result_popup_bgImg');
        _this.ranking_icon_01Img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_icon_01Img');
        _this.ranking_icon_02Img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_icon_02Img');
        _this.ranking_icon_03Img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_icon_03Img');
        _this.ranking_shape_01Img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_shape_01Img');
        _this.ranking_shape_02Img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_shape_02Img');
        _this.ranking_shape_02_arrowImg = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_shape_02_arrowImg');
        return _this;
    }
    ResultPopup.prototype.onDraw = function (context) {
        var _this = this;
        //////update
        this.targetPosition = new PointVector_1.PointVector(this.stage.width / 2, this.stage.height / 2);
        //방향
        var dir = PointVector_1.PointVector.sub(this.targetPosition, this);
        var mag = dir.mag();
        dir.normalize();
        dir.mult(this.accelerationStep);
        // dir.mult(0.2);
        this.acceleration = dir; //가속도
        var oldVelocity = this.velocity.get();
        this.velocity.add(this.acceleration); //속도
        var oldPosition = this.get();
        this.add(this.velocity);
        var oldCheck = PointVector_1.PointVector.sub(oldPosition, this.targetPosition);
        var check = PointVector_1.PointVector.sub(this, this.targetPosition);
        if (oldCheck.x <= 0 && check.x > 0 || oldCheck.x >= 0 && check.x < 0) {
            this.x = this.targetPosition.x;
            this.velocity.x = 0;
        }
        if (oldCheck.y <= 0 && check.y > 0 || oldCheck.y >= 0 && check.y < 0) {
            this.y = this.targetPosition.y;
            this.velocity.y = 0;
        }
        //draw popup background
        var popup_x = this.x - (this.result_popup_bgImg.width / 2);
        var popup_y = this.y - (this.result_popup_bgImg.height / 2) - 20;
        context.drawImage(this.result_popup_bgImg, popup_x, popup_y);
        this.hitArea = new Rect_1.Rect(popup_x, popup_y, popup_x + this.result_popup_bgImg.width, popup_y + this.result_popup_bgImg.height);
        this.hitExitArea = new Rect_1.Rect(popup_x + 20, popup_y + this.result_popup_bgImg.height - 150, popup_x + this.result_popup_bgImg.width - 185, popup_y + this.result_popup_bgImg.height);
        this.hitReStartArea = new Rect_1.Rect(popup_x + 180, popup_y + this.result_popup_bgImg.height - 150, popup_x + this.result_popup_bgImg.width, popup_y + this.result_popup_bgImg.height);
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.hostResult)) {
            context.save();
            var fontPT_1 = 40;
            context.strokeStyle = '#392B25';
            // context.shadowColor = '#000000';
            // context.shadowOffsetX = -1;
            // context.shadowOffsetY = -1;
            context.font = fontPT_1 + 'pt Multicolore';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = '#FFFFFF';
            context.lineWidth = 2;
            context.fillText(this.hostResult.score.toLocaleString(), popup_x + 180, popup_y + 322);
            context.strokeText(this.hostResult.score.toLocaleString(), popup_x + 180, popup_y + 322);
            // fontPT = 18;
            // context.font = 'bold  ' + fontPT + 'pt Multicolore';
            // context.textAlign = 'center';
            // context.textBaseline = 'middle';
            // context.fillStyle = '#F9DFD4';
            // context.lineWidth = 1;
            // // console.log(this.hostResult)
            // context.fillText('내등수 : ' + this.hostResult.rank.toLocaleString() + '등', this.x, this.y + 13);
            // context.strokeText('내등수 : ' + this.hostResult.rank.toLocaleString() + '등', this.x, this.y + 13);
            context.restore();
            // const hostRankImg = this.getRankImg(this.hostResult.rank);
            // const hostRank_x = this.x - (hostRankImg.width / 2) - 75;
            // const hostRank_y = this.y - (hostRankImg.height / 2) - 2;
            // context.drawImage(hostRankImg, hostRank_x, hostRank_y);
            var userResults = this.userResults || new Array();
            //console.log(userResults);
            var wjumpSize_1 = (this.result_popup_bgImg.width - 65) / (userResults.length + 1);
            var wjump_1 = 0;
            // popup_x
            // popup_y
            userResults.forEach(function (it) {
                // const hostRank_x = this.x - (hostRankImg.width / 2) - 75;
                // const hostRank_y = this.y - (hostRankImg.height / 2) - 2;
                wjump_1 += wjumpSize_1;
                //console.log(wjump);
                if (it.uuid === _this.hostResult.uuid) {
                    //result characte
                    var result_characterImg = _this.resultCharacte(it.name);
                    var character_x = popup_x + 130;
                    var character_y = popup_y + 110;
                    context.drawImage(result_characterImg, character_x, character_y);
                    context.drawImage(_this.ranking_shape_02Img, popup_x + wjump_1, popup_y + 385);
                }
                else {
                    context.drawImage(_this.ranking_shape_01Img, popup_x + wjump_1, popup_y + 385);
                }
                context.drawImage(_this.summaryCharacte(it.name), popup_x + wjump_1 + 20, popup_y + 385 + 3);
                context.drawImage(_this.getRankImg(it.rank), popup_x + wjump_1 - 3, popup_y + 385 - 3);
                if (it.host === 'host') {
                    context.drawImage(_this.ranking_shape_02_arrowImg, popup_x + wjump_1 + 25, popup_y + 385 - 5);
                }
                context.save();
                // context.strokeStyle = '#392B25';
                // context.shadowColor = '#000000';
                // context.shadowOffsetX = -1;
                // context.shadowOffsetY = -1;
                fontPT_1 = 10;
                context.font = fontPT_1 + 'pt Multicolore';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillStyle = '#FFFFFF';
                // context.lineWidth = 1;
                context.fillText(it.score.toLocaleString(), popup_x + wjump_1 + 36, popup_y + 382 + 56);
                // context.strokeText(it.score.toLocaleString(), popup_x + wjump + 36, popup_y + 322 + 51);
                context.restore();
            });
            // context.strokeRect(this.hitArea.left, this.hitArea.top, this.hitArea.width(), this.hitArea.height());
            // context.strokeRect(this.hitExitArea.left, this.hitExitArea.top, this.hitExitArea.width(), this.hitExitArea.height());
            // context.strokeRect(this.hitReStartArea.left, this.hitReStartArea.top, this.hitReStartArea.width(), this.hitReStartArea.height());
        }
    };
    ResultPopup.prototype.getRankImg = function (rank) {
        var hostRankImg = this.ranking_icon_01Img;
        if (rank === 1) {
            hostRankImg = this.ranking_icon_01Img;
        }
        else if (rank === 2) {
            hostRankImg = this.ranking_icon_02Img;
        }
        else {
            hostRankImg = this.ranking_icon_03Img;
        }
        return hostRankImg;
    };
    ResultPopup.prototype.onStart = function (room) {
        var _this = this;
        this.set(this.startPosition());
        this.accelerationStep = new PointVector_1.PointVector(0.2, 0.2, 0);
        this.acceleration = new PointVector_1.PointVector(0, 0);
        this.velocity = new PointVector_1.PointVector(0, 0);
        this.targetPosition = undefined;
        this.hostResult = undefined;
        this.hitArea = new Rect_1.Rect(0, 0, 0, 0);
        this.mousedownSubscription = this.stage.canvasEventSubscribe('mousedown', function (event) {
            if (!ValidUtil_1.ValidUtil.isNullOrUndefined(_this.hitExitArea) && _this.hitExitArea.contains(event.offsetX, event.offsetY)) {
                DeviceManager_1.DeviceManager.getInstance().onDestroy();
                _this.stage.onDestroy();
            }
            if (!ValidUtil_1.ValidUtil.isNullOrUndefined(_this.hitReStartArea) && _this.hitReStartArea.contains(event.offsetX, event.offsetY)) {
                AWStageManager_1.AWStageManager.getInstance().goStage(0, '11');
            }
        });
        //console.log('resultPopup');
        var userResults = new Array();
        // for (const user of room.users) {
        //   const headsetConcentrationHistory = user.headsetConcentrationHistory || [0];
        //   //user Result Setting
        //   const result = {uuid: user.uuid, name: user.name, host: user.host, score: CollectionUtil.sumArray(headsetConcentrationHistory)} as UserResult;
        //   result.score = result.score || 0;
        //   userResults.push(result);
        //   if (user.host === UserHostCode.HOST) {
        //     this.hostResult = result;
        //   }
        //   //user ranking Setting
        //   userResults.sort((n1, n2) => (n1.score < n2.score ? 1 : -1));
        //   for (let i = 0; i < userResults.length; i++) {
        //     userResults[i].rank = (i + 1);
        //   }
        // }
        // console.log('>>>>>> ' + userResults);
        if (ValidUtil_1.ValidUtil.isNullOrUndefined(this.hostResult)) {
            this.hostResult = userResults[0];
        }
        //CollectionUtil.removeArrayItem(userResults, this.hostResult)
        this.userResults = userResults;
    };
    ResultPopup.prototype.startPosition = function () {
        return new PointVector_1.PointVector(this.stage.width, this.stage.height / 2);
    };
    ResultPopup.prototype.resultCharacte = function (name) {
        var img = AWResourceManager_1.AWResourceManager.getInstance().resources('result_character_03Img');
        switch (name) {
            case 'do':
                img = AWResourceManager_1.AWResourceManager.getInstance().resources('result_character_01Img');
                break;
            case 'so':
                img = AWResourceManager_1.AWResourceManager.getInstance().resources('result_character_02Img');
                break;
            case 'bs':
                img = AWResourceManager_1.AWResourceManager.getInstance().resources('result_character_03Img');
                break;
            default:
                img = AWResourceManager_1.AWResourceManager.getInstance().resources('result_character_03Img');
                break;
        }
        return img;
    };
    ResultPopup.prototype.summaryCharacte = function (name) {
        var img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_character_03Img');
        switch (name) {
            case 'do':
                img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_character_01Img');
                break;
            case 'so':
                img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_character_02Img');
                break;
            case 'bs':
                img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_character_03Img');
                break;
            default:
                img = AWResourceManager_1.AWResourceManager.getInstance().resources('ranking_character_03Img');
                break;
        }
        return img;
    };
    ResultPopup.prototype.onStop = function () {
        console.log('resultpopup stop');
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {
            this.roomDetailSubscription.unsubscribe();
        }
        if (!ValidUtil_1.ValidUtil.isNullOrUndefined(this.mousedownSubscription)) {
            this.mousedownSubscription.unsubscribe();
        }
    };
    ResultPopup.prototype.onCreate = function (data) { };
    ResultPopup.prototype.onDestroy = function (data) { };
    ResultPopup.prototype.onPause = function (data) { };
    ResultPopup.prototype.onRestart = function (data) { };
    ResultPopup.prototype.onResume = function (data) { };
    return ResultPopup;
}(AWObj_1.AWObj));
exports.ResultPopup = ResultPopup;
