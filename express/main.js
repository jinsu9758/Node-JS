//미들웨어 : https://moondol-ai.tistory.com/370

var express = require('express')
var app = express();
var fs = require('fs');
var qs = require('querystring');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
app.use(helmet()); //보안

const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());

//미들웨어 제작하기
app.get('*', function(request, response, next){
	fs.readdir('./data', function(error, filelist){
		request.list = filelist;
		next();
	});
});


app.use('/topic', topicRouter);
app.use('/', indexRouter);

app.use(function(req, res, next){
	res.status(404).send("Sorry cant find that");
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).send("Something broke!");
});


app.listen(port, function(){
	console.log("port 3000");
});

