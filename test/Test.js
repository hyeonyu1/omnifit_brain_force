//https://javascript.info/regexp-groups
var pattern = new RegExp('^rooms/join([.]+?)/([.]+?)', 'i');
if (pattern.test('rooms/join/ha-aqwsee-rge-rewt/423"')) {
    var a = RegExp.$1;
    var b = RegExp.$2;
    var c = RegExp.$3;
    console.log(a, b, c);
}
// const pattern = new RegExp('^rooms/join([.]+?)/([.]+?)', 'i');
//
// let match = 'rooms/join/ha-aqwsee-rge-rewt/423'.match( RegExp('rooms/join/([.])', 'i') );
// console.log( match.length ); // 3
// console.log( match[0] ); // ac (whole match)
// console.log( match[1] ); // undefined, because there's nothing for (z)?
// console.log( match[2] ); // c
// const str = "The rain in SPAIN stays mainly in the plain";
// const str = 'rooms/join';
var str = 'rooms/join/ha-aqwsee-rge-rewt';
// const str = 'rooms/join/ha-aqwsee-rge-rewt/423';
// var res = str.match(/ain/g);
// const res = str.match(RegExp('rooms/join/(.+)/(.+)', 'i'));
var res = str.match(RegExp('rooms/join/(.+)', 'i'));
// const res = str.match(RegExp('rooms/join/(.+)/(.+)', 'i'));
console.log(res.length);
console.log(res[0]);
console.log(res[1]);
console.log(res[2]);
console.log(res[3]);
