"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/takeUntil");
require("rxjs/add/operator/pairwise");
require("rxjs/add/operator/switchMap");
var CanvasComponent = (function () {
    function CanvasComponent() {
        this.width = 400;
        this.height = 400;
    }
    CanvasComponent.prototype.ngAfterViewInit = function () {
        var canvasEl = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        canvasEl.width = this.width;
        canvasEl.height = this.height;
        this.cx.lineWidth = 3;
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = '#000';
        this.captureEvents(canvasEl);
    };
    CanvasComponent.prototype.captureEvents = function (canvasEl) {
        var _this = this;
        Observable_1.Observable
            .fromEvent(canvasEl, 'mousedown')
            .switchMap(function (e) {
            return Observable_1.Observable
                .fromEvent(canvasEl, 'mousemove')
                .takeUntil(Observable_1.Observable.fromEvent(canvasEl, 'mouseup'))
                .pairwise();
        })
            .subscribe(function (res) {
            var rect = canvasEl.getBoundingClientRect();
            var prevPos = {
                x: res[0].clientX - rect.left,
                y: res[0].clientY - rect.top
            };
            var currentPos = {
                x: res[1].clientX - rect.left,
                y: res[1].clientY - rect.top
            };
            _this.drawOnCanvas(prevPos, currentPos);
        });
    };
    CanvasComponent.prototype.drawOnCanvas = function (prevPos, currentPos) {
        if (!this.cx) {
            return;
        }
        this.cx.beginPath();
        if (prevPos) {
            this.cx.moveTo(prevPos.x, prevPos.y); // from
            this.cx.lineTo(currentPos.x, currentPos.y);
            this.cx.stroke();
        }
    };
    __decorate([
        core_1.ViewChild('canvas')
    ], CanvasComponent.prototype, "canvas");
    __decorate([
        core_1.Input()
    ], CanvasComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], CanvasComponent.prototype, "height");
    CanvasComponent = __decorate([
        core_1.Component({
            selector: 'app-canvas',
            template: '<canvas #canvas></canvas>',
            styles: ['canvas { border: 1px solid #000; }']
        })
    ], CanvasComponent);
    return CanvasComponent;
}());
exports.CanvasComponent = CanvasComponent;
