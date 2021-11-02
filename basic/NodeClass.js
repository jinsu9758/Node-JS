function Clazz() {
	this.name = 'jinsu';
	this.message;
}

Clazz.prototype.setMessage = function(msg){
	this.message = msg;
}

Clazz.prototype.getMessage = function(){
	return this.message;
}

module.exports = Clazz;