/*
function a() {
	console.log('A');
}
*/


//익명함수
//자바스크립트에서는 함수가 값이다.
var a = function() {
	console.log('A');
}


function slowfunc(callback){
	callback();
}

slowfunc(a);