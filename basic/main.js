// 글 작성, 수정, 삭제 기능
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');

var db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database : 'opentutorials'	
});

db.connect();

var app = http.createServer(function(request,response){
	var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
	//맨 첫 페이지 -> 아무것도 안눌렀을때
  if(pathname === '/'){
  	if(queryData.id === undefined){
			db.query("select * from topic", function(error, topics){
				//console.log(topics);
				var title = 'Welcome';
        var description = 'Hello, Node.js';
				var list = template.list(topics);
				var html = template.HTML(title, list, `<h2>${description}</h2>`, `<a href="/create">create</a>`);
				response.writeHead(200);
        response.end(html);
			});
		}
		
		//id가 존재할때
		else{
			db.query("select * from topic", function(error, topics){
				if(error){
					throw error;
				}
				db.query(`select * from topic where id=?`, [queryData.id], function(error2, topic){
					if(error2){
						throw error2;
					}
					var title = topic[0].title;
					var description = topic[0].description;
					var list = template.list(topics);
					var html = template.HTML(title, list, `<h2>${description}</h2>`, `<a href="/create">create</a>
                <a href="/update?id=${queryData.id}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${queryData.id}">
                  <input type="submit" value="delete">
                </form>`);
					response.writeHead(200);
					response.end(html);
				});
			});
		}
	}
	
	// 글쓰기 페이지 들어갈 때 
	else if(pathname === "/create"){
		fs.readdir('../data', function(error, filelist){
			var title = 'Web - create';
      //var description = 'Hello, Node.js';
      var list = template.list(filelist);
			var html = template.HTML(title, list, `
			<form action="/create_process" method="post">
				<p>
				<input type="text" name="title" placeholder="title">
				</p>
				<p>
					<textarea name="description" placeholder="description"></textarea>
				</p>
				<p>
					<input type="submit" name="submit">
				</p>
			</form>`, '');
			response.writeHead(200);
      response.end(html);
		});
	}
	
	// 글 작성 동작 코드
	else if(pathname === "/create_process"){
		var body = '';
		
		request.on('data', function(data){
			body += data;
		});
		
		//들어올 data가 없으면 요고 실행
		request.on('end', function(){
			var post = qs.parse(body); //post 정보 저장
			//console.log(post.title);
			//console.log(post.description);
			var title = post.title;
			var description = post.description;
			
			fs.writeFile(`../data/${title}`, description, 'utf8', function(err){
				response.writeHead(302, {Location:`/?id=${title}`}); //페이지 redirection
				response.end('success');
			})
		});
	}
	
	// 작성된 글 수정페이지 들어가기
	else if(pathname === "/update") {
		fs.readdir('../data', function(error, filelist){
			var filteredId = path.parse(queryData.id).base;
			fs.readFile(`../data/${filteredId}`, 'utf8', function(err, description){
				var title = queryData.id;
				var list = template.list(filelist);
				var html = template.HTML(title, list, `
				<form action="/update_process" method="post">
				<input type="hidden" name="id" value="${title}"> // 수정되기 전 id값
				<p>
				<input type="text" name="title" placeholder="title" value="${title}"> // 수정된 후
				</p>
				<p>
					<textarea name="description" placeholder="description">${description}</textarea>
				</p>
				<p>
					<input type="submit" name="submit">
				</p>
			</form>`, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
				response.writeHead(200);
        response.end(html);
			});
		});
	}
	
	// 수정 과정 코드
	else if(pathname === "/update_process") {
		var body = '';
		
		request.on('data', function(data){
			body += data;
		});
		
		//들어올 data가 없으면 요고 실행
		request.on('end', function(){
			var post = qs.parse(body); //post 정보 저장
			//console.log(post.title);
			//console.log(post.description);
			var id = post.id;
			var title = post.title;
			var description = post.description;
			
			fs.rename(`../data/${id}`, `../data/${title}`, function(error){
				fs.writeFile(`../data/${title}`, description, 'utf8', function(err){
					response.writeHead(302, {Location:`/?id=${title}`});
					response.end();
				})
			});
		});
	}
	
	// 삭제 과정 코드
	else if(pathname === "/delete_process") {
		var body = '';
		
		request.on('data', function(data){
			body += data;
		});
		
		//들어올 data가 없으면 요고 실행
		request.on('end', function(){
			var post = qs.parse(body); //post 정보 저장
			//console.log(post.title);
			//console.log(post.description);
			var id = post.id;
			var filteredId = path.parse(id).base;
			fs.unlink(`../data/${filteredId}`, function(error){
				response.writeHead(302, {Location:`/`});
				response.end();
			});
		});
		
	}	
	
	else{
		response.writeHead(404);
		response.end('Not found');
	}
});
app.listen(3000);
