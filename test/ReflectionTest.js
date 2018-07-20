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
require("rxjs/operator/map");
// class ReflectionTest {
//
//     public name = 'name';
//     constructor() {
//         console.log('reflection test');
//     }
// }
//
// const a = new ReflectionTest();
// const arr = Object.getOwnPropertyNames(a);
// console.log(arr);
//
// let className:any = ReflectionTest;
// let aa = new className();// the members will have value undefined
// console.log(aa.name)
// PrintTypeNames<T>(obj: T) {
//     const objectKeys = Object.keys(obj) as Array<keyof T>;
//     for (let key of objectKeys)
//     {
//         console.Log('key:' + key);
//     }
// }
var A = (function () {
    function A() {
        this.a1 = void 0;
        this.a2 = void 0;
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.a3 = void 0;
        _this.a4 = void 0;
        return _this;
    }
    return B;
}(A));
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.a5 = void 0;
        _this.a6 = void 0;
        return _this;
    }
    return C;
}(B));
var Describer = (function () {
    function Describer() {
    }
    Describer.describe = function (val, parent) {
        if (parent === void 0) { parent = false; }
        var result = [];
        if (parent) {
            var proto = Object.getPrototypeOf(val.prototype);
            if (proto) {
                result = result.concat(this.describe(proto.constructor, parent));
            }
        }
        result = result.concat(val.toString().match(this.FRegEx) || []);
        return result;
    };
    Describer.FRegEx = new RegExp(/(?:this\.)(.+?(?= ))/g);
    return Describer;
}());
console.log(Describer.describe(A)); // ["this.a1", "this.a2"]
console.log(Describer.describe(B)); // ["this.a3", "this.a4"]
console.log(Describer.describe(C, true)); // ["this.a1", ..., "this.a6"]
