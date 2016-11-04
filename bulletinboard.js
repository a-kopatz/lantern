var mongoose = require('mongoose');
var Output = require("./output");
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("./item").schema;
var Post = require('./post').post;

var bulletinboardSchema = itemSchema.extend({
	boardSource: String
}, { collection : 'items' });

bulletinboardSchema.methods.getDetailedDescription = function() {
    var result = [];

	result.push('BOARD VIEW <N> to view a particular post.'); //  BOARD POST to write a new post.  BOARD REPLY <N> to reply to a post.');
	var postArray = this.world.postMap.get(this.boardSource);

	if(postArray === undefined) {
		result.push("It's empty!!!");
	}
	else {
		for(var i = 0; i < postArray.length; i++) {
			result.push(postArray[i].id + ": " + postArray[i].title);
		}
		
		if(postArray.length < 1) {
			result.push("It's empty!!!");
		}
	}
	
    return result;
};

bulletinboardSchema.methods.viewPost = function(character, command) {
	var output = new Output(character);
	
	if(command.tokens.length < 2) {
		output.toActor.push( { text: "But which post do you want to view?!?" } );
		return output;
	}

	var postId = command.tokens[1];
	var postArray = character.world.postMap.get(command.item.boardSource);
	
	for(var i = 0; i < postArray.length; i++) {
		if(postArray[i].id == postId) { 
			output.toActor.push( { text: postArray[i].title.toUpperCase() } );
			output.toActor.push( { text: 'Posted by ' + postArray[i].creator + ' on ' + postArray[i].created } );
			output.toActor.push( { text: '-------------------------------------------------------------' } );
			output.toActor.push( { text: postArray[i].text } );
		}
	}
	
	if(output.toActor.length === 0) {
	 	output.toActor.push( { text: "There is no post on the board with ID " + postId } );
	}

	return output;
};

bulletinboardSchema.methods.composePost = function(character, command) {
	
	console.log(command);
	
	// TODO: Title
	
	var output = new Output(character);
	
	character.isWriting = true;
	character.isPosting = true;
	character.postId = -1;
	character.board = command.item;
	
	output.toActor.push ( { text: 'Write your message, use @ on a new line when done.' } );
	
	return output;
};

bulletinboardSchema.methods.savePost = function(author, postId, body) {
	if(postId === -1) {
		var post = new Post( { id: 2, creator: author, title: 'FIXME', text: body } );
		
		post.save(function (err) {
			// TODO: Handle error
		});
	}
};

bulletinboardSchema.methods.getWrittenContents = function() {
    return "You can't read the whole board at once. View each post individually.";
};

bulletinboardSchema.methods.getCommands = function() {
    return [
          { command: "view"     , minimumPosition: global.POS_RESTING , functionPointer: this.viewPost, minimumLevel: 0, subCommand: 0, item: this },
          { command: "post"     , minimumPosition: global.POS_RESTING , functionPointer: this.composePost, minimumLevel: 0, subCommand: 0, item: this },
    ];
};

var bulletinboardModel = mongoose.model('bulletinboard', bulletinboardSchema);

module.exports = {
	schema: bulletinboardSchema,
	food: bulletinboardModel
};