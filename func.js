//함수의 선언 및 사용
/*
function sum(param1, param2, param3){
	return param1 + param2 + param3;
}

var result = sum(1,2,3);

console.log(result);
*/

//반복문
/*
var i = 0;
while(i<10){
	console.log("for : i의 값은=" + i);
	i=i+1;
}
*/

// 클래스 -> 함수자체를 하나의 객체로 취급
/*
function Clazz(msg){
	this.name = 'I am Class';
	this.message = msg;
	
	message2 = "find me!";
	
	//멤버함수 선언
	this.print = function() {
		console.log(message2);
	};
}

var myClazz = new Clazz('good to see u!');
console.log(myClazz.message);
console.log(myClazz.message2); // undefined this로 정의가 안되어 있음.
myClazz.print();
*/


//프로토 타입
//prototype -> "https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67"

/*
function Clazz(msg) {
	this.name = "I am Class";
	this. message = msg;
	
	message2 = "find me!";
}

Clazz.prototype.getMessage = function() {
	return this.message;
}

Clazz.prototype.getMessage2 = function() {
	return this.message2;
}

var myClazz = new Clazz('good to see u');
console.log(myClazz.getMessage());
console.log(myClazz.getMessage2()); //undefined
*/
























