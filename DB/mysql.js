//mysql 모듈 사용하기.
var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database : 'opentutorials'
});

connection.connect();


connection.query("select * from topic", function(error, results, fields){
	if(error) throw error;
	console.log(results);
});

connection.end();
