var db = require('./db.js');
var template = require('./template.js');

exports.home = function(request, response){
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
