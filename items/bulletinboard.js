var mongoose = require('mongoose');
var Output = require("../output");
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").itemSchema;
var Post = require('../post').post;

var bulletinboardSchema = itemSchema.extend({
	boardSource: String
}, { collection : 'items' });

bulletinboardSchema.methods.getDetailedDescription = function() {
    var result = [];

	result.push('BOARD VIEW <N> to view a particular post.  BOARD POST <TITLE> to write a new post.');  
	result.push('BOARD REMOVE <N> to remove a post.');
	// BOARD REPLY <N> to reply to a post.');
	result.push('-------------------------------------------------------------');
	var postArray = this.world.postMap.get(this.boardSource);

	if(postArray === undefined) {
		result.push("It's empty!!!");
	}
	else {
		for(var i = 0; i < postArray.length; i++) {
			result.push("  " + postArray[i].id + ": " + postArray[i].title);
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

bulletinboardSchema.methods.removePost = function(character, command) {
	var output = new Output(character);
	
	if(command.tokens.length < 2) {
		output.toActor.push( { text: "But which post do you want to remove?!?" } );
		return output;
	}
	
	var postId = command.tokens[1];
	
	// FIXME: Is it awkward that boardId and boardSource are different names for the same thing?
	Post.remove( { "id": postId }, function(err) {
		if(!err) {
			console.log('aaa' + command.item.boardSource);
			
			Post.find( { 'board': command.item.boardSource } ).limit(30).sort({'id': -1}).exec(function(err, posts) {
    			character.world.postMap.set(command.item.boardSource, posts);
			});			
		}
		// TODO: handle error
	});
	
	output.toActor.push( { text: "Ok, post " + postId + " will be removed!" } );
	output.toRoom.push( { roomId: character.room.id, textArray: [ { text: "ACTOR_NAME removes a post." } ] } );
	
	return output;
};

bulletinboardSchema.methods.composePost = function(character, command) {
	var output = new Output(character);
	
	character.isWriting = true;
	character.isPosting = true;
	character.postId = -1;
	character.board = command.item;
	
	command.tokens.shift();
	character.postTitle = command.tokens.join(" ");
	
	output.toActor.push( { text: 'Write your message, use @ on a new line when done.' } );
	output.toRoom.push( { roomId: character.room.id, textArray: [ { text: "ACTOR_NAME begins writing a post." } ] } );
	
	return output;
};

bulletinboardSchema.methods.savePost = function(author, postId, title, boardId, body) {
	if(postId === -1) {
		var post = new Post( { creator: author.name, title: title, text: body, created: new Date(), board: boardId } );
		
		post.save(function (err) {
			Post.find( { 'board':boardId } ).limit(30).sort({'id': -1}).exec(function(err, posts) {
    			author.world.postMap.set(boardId, posts);
			});
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
          { command: "remove"   , minimumPosition: global.POS_RESTING , functionPointer: this.removePost, minimumLevel: 0, subCommand: 0, item: this }
    ];
};

var bulletinboardModel = mongoose.model('bulletinboard', bulletinboardSchema);

module.exports = {
	schema: bulletinboardSchema,
	food: bulletinboardModel
};