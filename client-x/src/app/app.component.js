"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
// import * as Processing from 'assets/javascript/processing-1.4.1';
var core_1 = require("@angular/core");
// import {hello} from 'assets/javascript/omnifit';
// Observable operators
require("rxjs/add/observable/from");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
var DeviceManager_1 = require("./com/khh/omnifit/drive/DeviceManager");
var AWResourceManager_1 = require("./com/khh/omnifit/game/blowing/AWResourceManager");
var AWStageManager_1 = require("./com/khh/omnifit/game/blowing/AWStageManager");
var Alarm_1 = require("./com/khh/omnifit/game/blowing/obj/alarm/Alarm");
var BackGround_1 = require("./com/khh/omnifit/game/blowing/obj/background/BackGround");
var Arm_1 = require("./com/khh/omnifit/game/blowing/obj/game/Arm");
var Guest1_1 = require("./com/khh/omnifit/game/blowing/obj/game/Guest1");
var Guest2_1 = require("./com/khh/omnifit/game/blowing/obj/game/Guest2");
var Guest3_1 = require("./com/khh/omnifit/game/blowing/obj/game/Guest3");
var MainBackGround_1 = require("./com/khh/omnifit/game/blowing/obj/game/MainBackGround");
var Cloud_1 = require("./com/khh/omnifit/game/blowing/obj/intro/Cloud");
var IntroPopup_1 = require("./com/khh/omnifit/game/blowing/obj/intro/IntroPopup");
var Star_1 = require("./com/khh/omnifit/game/blowing/obj/intro/Star");
var Title_1 = require("./com/khh/omnifit/game/blowing/obj/intro/Title");
var Score_1 = require("./com/khh/omnifit/game/blowing/obj/score/Score");
var Timer_1 = require("./com/khh/omnifit/game/blowing/obj/timer/Timer");
var AWStageGame_1 = require("./com/khh/omnifit/game/blowing/stage/AWStageGame");
var AWStageIntro_1 = require("./com/khh/omnifit/game/blowing/stage/AWStageIntro");
var AppComponent = (function () {
    function AppComponent(hostElement, renderer) {
        this.hostElement = hostElement;
        this.renderer = renderer;
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.canvas = this.canvasElementRef.nativeElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');
    };
    AppComponent.prototype.onResize = function (event) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //trigger
        this.canvas.dispatchEvent(new Event('resize'));
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        //game initialize
        this.stageManager = AWStageManager_1.AWStageManager.getInstance(this.canvas);
        this.deviceManager = DeviceManager_1.DeviceManager.getInstance();
        this.resourceManager = AWResourceManager_1.AWResourceManager.getInstance();
        /////////////////stage Intro
        var droneStageIntro = new AWStageIntro_1.AWStageIntro(this.canvas);
        var background = new BackGround_1.BackGround(droneStageIntro, 0, 0, 0);
        background.index = 0;
        droneStageIntro.pushObj(background);
        var introTitle = new Title_1.Title(droneStageIntro, 0, 0, 0, AWResourceManager_1.AWResourceManager.getInstance().resources('titleImg'));
        introTitle.index = 50;
        droneStageIntro.pushObj(introTitle);
        var touchScreen = new IntroPopup_1.IntroPopup(droneStageIntro, 0, 0, 0, AWResourceManager_1.AWResourceManager.getInstance().resources('intro_text_02Img'));
        touchScreen.index = 150;
        droneStageIntro.pushObj(touchScreen);
        //cloud
        for (var i = 51; i < 100; i++) {
            var cloud = new Cloud_1.Cloud(droneStageIntro, 0, 0, 0, AWResourceManager_1.AWResourceManager.getInstance().resources('ef_smokeImg'));
            cloud.index = i;
            droneStageIntro.pushObj(cloud);
        }
        //star
        for (var i = 100; i < 120; i++) {
            var star = new Star_1.Star(droneStageIntro, 0, 0, 0);
            star.index = i;
            droneStageIntro.pushObj(star);
        }
        ///////////////Stage Game
        var droneStageGame = new AWStageGame_1.AWStageGame(this.canvas);
        //background
        droneStageGame.pushObj(background);
        var mainBackGround = new MainBackGround_1.MainBackGround(droneStageIntro, 0, 0, 0, AWResourceManager_1.AWResourceManager.getInstance().resources('main_bgImg'));
        mainBackGround.index = 2;
        droneStageGame.pushObj(mainBackGround);
        //geust
        var geust1 = new Guest1_1.Guest1(droneStageGame, 0, 0, 0);
        geust1.index = 11;
        droneStageGame.pushObj(geust1);
        var geust2 = new Guest2_1.Guest2(droneStageGame, 0, 0, 0);
        geust2.index = 10;
        droneStageGame.pushObj(geust2);
        var geust3 = new Guest3_1.Guest3(droneStageGame, 0, 0, 0);
        geust3.index = 13;
        droneStageGame.pushObj(geust3);
        var arm = new Arm_1.Arm(droneStageGame);
        arm.index = 500;
        droneStageGame.pushObj(arm);
        var score = new Score_1.Score(droneStageGame, 0, 0, 0, AWResourceManager_1.AWResourceManager.getInstance().resources('gage_00Img'));
        score.index = 1001;
        droneStageGame.pushObj(score);
        var alarm = new Alarm_1.Alarm(droneStageGame, 0, 0, 0, AWResourceManager_1.AWResourceManager.getInstance().resources('alarm_iconImg'));
        alarm.index = 1002;
        droneStageGame.pushObj(alarm);
        var timer = new Timer_1.Timer(droneStageGame, 0, 0, 0, AWResourceManager_1.AWResourceManager.getInstance().resources('gage_00Img'));
        timer.index = 1003;
        droneStageGame.pushObj(timer);
        this.stageManager.pushStage(droneStageIntro);
        this.stageManager.pushStage(droneStageGame);
        this.stageManager.onCreate();
        this.stageManager.onStart();
    };
    __decorate([
        core_1.ViewChild('canvas')
    ], AppComponent.prototype, "canvasElementRef");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], AppComponent.prototype, "onResize");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
