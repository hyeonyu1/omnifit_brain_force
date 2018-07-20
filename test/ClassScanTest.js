var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var myContainer;
(function (myContainer) {
    var foo = (function () {
        function foo() {
        }
        foo = __decorate([
            magical
        ], foo);
        return foo;
    }());
    myContainer.foo = foo;
    var bar = (function () {
        function bar() {
        }
        return bar;
    }());
    myContainer.bar = bar;
    var bas = (function () {
        function bas() {
        }
        bas = __decorate([
            magical
        ], bas);
        return bas;
    }());
    myContainer.bas = bas;
})(myContainer || (myContainer = {}));
function magical(item) {
    item.isMagical = "indeed";
}
function findMagicalInScope(theScope) {
    for (var prop in theScope) {
        if (theScope[prop]["isMagical"]) {
            console.log("Is " + prop + " magical?  " + theScope[prop]["isMagical"] + "!");
        }
        else {
            console.log(prop + " is not magical.  :-(");
        }
    }
}
findMagicalInScope(myContainer);
