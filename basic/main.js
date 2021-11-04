// 글 작성, 수정, 삭제 기능
var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var db = require('./lib/db.js');
var topic = require('./lib/topic.js');
var author = require('./lib/author.js');

var app = http.createServer(function(request,response){
	var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
	//맨 첫 페이지 -> 아무것도 안눌렀을때
  if(pathname === '/'){
  	if(queryData.id === undefined){
			topic.home(request, response);
		}
		//id가 존재할때
		else{
			topic.page(request, response);
		}
	}
	
	// 글쓰기 페이지 들어갈 때 
	else if(pathname === "/create"){
		topic.create(request, response);
	}
	
	// 글 작성 동작 코드
	else if(pathname === "/create_process"){
		topic.create_process(request, response);
	}
	
	// 작성된 글 수정페이지 들어가기
	else if(pathname === "/update") {
		topic.update(request, response);
	}
	
	// 수정 과정 코드
	else if(pathname === "/update_process") {
		topic.update_process(request, response);
	}
	
	// 삭제 과정 코드
	else if(pathname === "/delete_process") {
		topic.delete_process(request, response);
	}
	
	else if(pathname === "/author"){
		author.home(request, response);
	}
	
	else if(pathname === "/author/create_process"){
		author.create_author_process(request, response);
	}
	
	else if(pathname === "/author/update"){
		author.update(request, response);
	}
	
	else if(pathname === "/author/update_process"){
		author.update_process(request, response);
	}
	
	else if(pathname === "/author/delete_process"){
		author.delete_process(request, response);
	}
	
	else{
		response.writeHead(404);
		response.end('Not found');
	}
});
app.listen(3000);
