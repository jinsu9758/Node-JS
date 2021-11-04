var db = require('./db.js');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');

exports.home = function(request, response){
	db.query(`select * from topic`, function(error, topics){
		db.query(`select * from author`, function(error2, authors){
		//console.log(topics);
		var title = 'Welcome';
    var description = 'This is Author Page';
		var list = template.list(topics);
		var author = template.authorTable(authors);
		var html = template.HTML(title, list, `<h2>${description}</h2> ${author}
		<style>
			table{
				border-collapse : collapse;
			}
			td{
				border:1px solid black;
			}
		</style>
		
		<form action="/author/create_process" method="post">
			<p>
				<input type="text" name="name" placeholder="name">
			</p>
			<p>
				<textarea name="profile" placeholder="description"></textarea>
			</p>
			<p>
				<input type="submit">
			</p>
		</form>
		`, ``);
		response.writeHead(200);
    response.end(html);
		});
	});
}


exports.create_author_process = function(request, response){
	var body = '';
		
	request.on('data', function(data){
		body += data;
	});
		
	//들어올 data가 없으면 요고 실행
	request.on('end', function(){
		var post = qs.parse(body); //post 정보 저장
		db.query(`insert into author(name, profile) values(?, ?)`, [post.name, post.profile], function(error, result){
			if(error){
				throw error;
			}
			response.writeHead(302, {Location:`/author`});
			response.end();
		})
	});
}


exports.update = function(request, response){
	db.query(`select * from topic`, function(error, topics){
		db.query(`select * from author`, function(error2, authors){
			var _url = request.url;
			var queryData = url.parse(_url, true).query;
			var pathname = url.parse(_url, true).pathname;
			db.query(`select * from author where id=?`, [queryData.id], function(error3, author){
				var title = 'author';
				var list = template.list(topics);
				var author_table = template.authorTable(authors);
				var html = template.HTML(title, list, `${author_table}
				<style>
					table{
						border-collapse : collapse;
					}
					td{
						border:1px solid black;
					}
				</style>

				<form action="/author/update_process" method="post">
					<p>
						<input type="hidden" name="id" value="${queryData.id}">
					</p>
					<p>
						<input type="text" name="name" value="${author[0].name}" placeholder="name">
					</p>
					<p>
						<textarea name="profile" placeholder="description">${author[0].profile}</textarea>
					</p>
					<p>
						<input type="submit" value="update">
					</p>
				</form>
				`, ``);
				response.writeHead(200);
				response.end(html);
			});
		});
	});
}

exports.update_process = function(request, response){
	var body='';
	
	request.on('data', function(data){
		body += data;
	});
	
	request.on('end', function(){
		var post = qs.parse(body);
		db.query(`update author set name=?, profile=? where id=?`,[post.name, post.profile, post.id], function(error, result){
			if(error){
				throw error;
			}
			response.writeHead(302, {Location:`/author`});
			response.end();
		});
	});	
}

exports.delete_process = function(request, response){
	var body = '';
	
	request.on('data', function(data){
		body += data;
	});
	
	request.on('end', function(){
		var post = qs.parse(body);
		//작성자 삭제 하면, 이때까지 작성자가 쓴 글 모두 사라짐.
		db.query(`delete from topic where author_id=?`,[post.id], function(error2, result2){
			if(error2){
				throw error2;
			}
			db.query(`delete from author where id=?`, [post.id], function(error, result){
				if(error){
					throw error;
				}
				response.writeHead(302, {Location:`/author`});
				response.end();
			});
		});
	});
}




