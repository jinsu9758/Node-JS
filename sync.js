var fs = require('fs');

//readFileSync 동기적
/*
console.log('A');
var result = fs.readFileSync('./sample.txt', 'utf8');
console.log(result);
console.log('C');

A
B
C
*/

//비동기적
console.log('A');

fs.readFile('./sample.txt', 'utf8', function(err, result){
	console.log(result);
});

console.log('C');