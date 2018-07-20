"use strict";
exports.__esModule = true;
// import 'rxjs/add/operator/map';
require("rxjs/add/operator/filter");
// import 'rxjs/add/operator/from';
require("rxjs/add/operator/toArray");
var from_1 = require("rxjs/observable/from");
require("rxjs/operator/map");
var map = new Map();
map.set('a', 1);
map.set('b', 3);
map.set('c', 5);
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log( from(map).filter( (it) => it > 2).toArray().subscribe( (it) => console.log(it)) );
console.log(from_1.from(arr).filter(function (it) { return it > 2; }).toArray().subscribe(function (it) { return console.log(it); }));
console.log(from_1.from(Array.from(new Set([1, 2, 3, 4]).values())).filter(function (it) { return it > 2; }).toArray().subscribe(function (it) { return console.log(it); }));
// Observable.from(targetAuths)
//     .filter(auth=>auth.menuLvl==1)
//     .map(auth=>{
//         Observable.from(targetAuths)
//             .filter(subAuth=>subAuth.menuLvl==2 && auth.urlSeq==subAuth.prntUrlSeq)
//             .map(subAuth=>subAuth as AuthMenu)
//             .toArray()
//             .subscribe(subAuths=>auth.auths=subAuths)
//         return auth;
//     })
//     .toArray()
//     .subscribe(auths => this.auths = auths, console.error);
