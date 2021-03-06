//객체화 시키기 -> 출력부분을 담당하고 있음.
module.exports = {
	HTML:function(title, list, body, control){
		return`
						<!doctype html>
						<html>
						<head>
							<title>WEB1 - ${title}</title>
							<meta charset="utf-8">
						</head>
						<body>
							<h1><a href="/">WEB</a></h1>
							<a href="/author">author</a>
							${list}
							${control}
							
							<h1>${title}</h1>
							${body}
						</body>
						</html>
						`;
		},
	list : function(topics){
		var list = '<ul>';
		var i = 0;
		while(i<topics.length) {
			list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;

			i = i+1;
		}
		list = list + '</ul>';

		return list;
	},
	authorSelect : function(authors, author_id){
		var tag='';
		var i =0;
		while(i < authors.length){
			var selected = '';
			if(authors[i].id === author_id){
				selected = ' selected'
			}
			tag = tag + `<option value="${authors[i].id}" ${selected}>${authors[i].name}</option>`;
			i++;
		}
		return tag;
	},
	authorTable :function(authors){
		var i = 0;
		var table = '<table border="1">';
		while(i<authors.length){
			table = table + `<tr><td>${authors[i].name}</td><td>${authors[i].profile}</td><td><a href="/author/update?id=${authors[i].id}">update</a></td>
			<td>
				<form action="/author/delete_process" method="post">
					<input type="hidden" name="id" value="${authors[i].id}">
					<input type="submit" value="delete">
				</form>
			</td><tr>`;
			i++;
		}
		table = table + '</table>';
		return table;
	}
}
