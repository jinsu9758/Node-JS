// 자바스크립트에서 함수는 값이다.

var f = function f1() {
	console.log(1+1);
	console.log(2+2);
}

// var i = if(true){console.log(1);} 조건문은 값이 아님

//console.log(f);

//f();

var a = [f];
a[0]();

var o = {
	func:f  // 객체의 원소
}

o.func();
