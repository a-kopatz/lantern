var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var npcSchema = require("../npc").schema;
var Output = require("../output");
var _Mail = require("../mail");
var Mail = require("../mail").mail;
var note = require("../items/note").note;

var postmasterSchema = npcSchema.extend({
}, { collection : 'npcs' });


postmasterSchema.methods.receiveMail = function(character, command) {

 	return _Mail.receiveMail(character, command, function(actor, command, mail) {
     	var output = new Output(actor);
	
    	if(mail !== null) {
    		if(mail.length === 0) {
    			output.toActor.push( { text: command.npc.name + " says, 'Sorry, you don't have any mail waiting.'" } );
    		}
    		else {
    			for(var i = 0; i < mail.length; i++) {
    				var pieceOfMail = new note();
    				pieceOfMail.canBeTaken = true;
    				pieceOfMail.shortDescription = "a piece of mail";
    				pieceOfMail.longDescription = "Someone has left a piece of mail here.";
    				pieceOfMail.written = "\n\rFrom:" + mail[i].senderName + "\n\r" + "To:" + mail[i].recipientName + "\n\r" + mail[i].body;
    				pieceOfMail.type = global.ITEM_NOTE;
    				pieceOfMail.keywords.push("mail");
    				
    				actor.world.addItem(pieceOfMail);
    				actor.inventory.push(pieceOfMail);
    			}
    			
    			if(mail.length === 1) {
    				output.toActor.push( { text: command.npc.name + " gives you a piece of mail." } );
    				output.toRoom.push( { roomId: actor.room.id, textArray: [ { text: "ACTOR_NAME receives a piece of mail." } ] } );
    			}
    			else {
    				output.toActor( { text: command.npc.name + " gives a stack of mail." } );
    				output.toRoom.push( { roomId: actor.room.id, textArray: [ { text: "ACTOR_NAME receives a stack of mail." } ] } );
    			}
    		}
    	}
    	else {
    		output.toActor.push( { text: command.npc.name + " says, 'Sorry, you don't have any mail waiting.'" } );
    		output.toRoom.push( { roomId: actor.room.id, textArray: [ { text: "ACTOR_NAME checks ACTOR_PRONOUN_POSSESSIVE mail." } ] } );
    	}
    	
    	return output;
    });
};

postmasterSchema.methods.composeMail = function(character, command) {
    var output = new Output(character);
	
	if(this.money < global.PRICE_OF_STAMP) {
		output.toActor.push( { text: command.npc.name + " says, 'A stamp costs " + global.PRICE_OF_STAMP + " dollars, which I see you can't afford.'" } );
		return output;
	}
	
	if(command.tokens.length < 2) {
	    output.toActor.push( { text: command.npc.name + " says, 'But who would you like to mail?'" } );
		return output;
	}

    output.toRoom.push( { roomId: character.room.id, textArray: [ { text: "ACTOR_NAME starts to write some mail." } ] } );
	output.toActor.push( { text: command.npc.name + " says, 'That is " + global.PRICE_OF_STAMP + " dollars for the stamp.'" } );
	output.toActor.push( { text: command.npc.name + " says, 'says, 'Write your message, use @ on a new line when done.'" } );
	character.money = character.money - global.PRICE_OF_STAMP;
	character.writingTo = command.tokens[1];
	character.isWriting = true;
	character.isMailing = true;
	character.writingQueue = [];
	
	return output;
};

postmasterSchema.methods.checkMail = function(character, command) {
    return _Mail.checkForMail(character, command, function(actor, command, hasMail) {
    	var output = new Output(actor);
    	
    	if(hasMail === true) {
    		output.toActor.push( { text: command.npc.name + " says, 'You have mail waiting.'" } );
    	}
    	else {
    		output.toActor.push( { text: command.npc.name + " says, 'Sorry, you don't have any mail waiting.'" } );
    	}
    	
    	output.toRoom.push( { roomId: actor.room.id, textArray: [ { text: "ACTOR_NAME checks ACTOR_PRONOUN_POSSESSIVE mail." } ] } );
    	
    	return output;
    });
};

postmasterSchema.methods.getCommands = function() {
    return [
    		{ command: "list"		 , minimumPosition: global.POS_RESTING , functionPointer: this.listCommands, minimumLevel: 0, subCommand: 0, npc: this },
            { command: "receive"     , minimumPosition: global.POS_RESTING , functionPointer: this.receiveMail, minimumLevel: 0, subCommand: 0, npc: this },
            { command: "mail"        , minimumPosition: global.POS_RESTING , functionPointer: this.composeMail, minimumLevel: 0, subCommand: 0, npc: this },
            { command: "check"       , minimumPosition: global.POS_RESTING , functionPointer: this.checkMail, minimumLevel: 0, subCommand: 0, npc: this }
    ];
};

var postmasterModel = mongoose.model('postmaster', postmasterSchema);

module.exports = {
	schema: postmasterSchema,
	postmaster: postmasterModel
};