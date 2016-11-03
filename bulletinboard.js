var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("./item").schema;

var bulletinboardSchema = itemSchema.extend({
	boardSource: String
}, { collection : 'items' });

bulletinboardSchema.methods.getDetailedDescription = function() {
    var result = [];

	result.push('VIEW <N> to view a particular post.'); //  COMPOSE to write a new post.  REPLY <N> to reply to a post.');

	console.log(this.world.postMap);
	console.log(this.boardSource);
	
	var postArray = this.world.postMap.get(this.boardSource);
	
	console.log(postArray);

	if(postArray === undefined) {
		result.push("It's empty!!!");
	}
	else {
		for(var i = 0; i < postArray.length; i++) {
			result.push(postArray[i].id + ": " + postArray[i].title);
		}
		
		if(postArray.length < 2) {
			result.post("It's empty!!!");
		}
	}
	
    return result;
};

bulletinboardSchema.methods.getWrittenContents = function() {
    return "You can't read the whole board at once. View each post individually.";
};

var bulletinboardModel = mongoose.model('bulletinboard', bulletinboardSchema);

module.exports = {
	schema: bulletinboardSchema,
	food: bulletinboardModel
};