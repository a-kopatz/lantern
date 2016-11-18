var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var furnitureSchema = require("./furniture").schema;
var Food = require('./food').food;
var utility = require("../utility");
var Output = require("../output");

var feedingmachineSchema = furnitureSchema.extend({
    speed: Number,
    contents: []
}, { collection : 'items' });

feedingmachineSchema.methods.getType = function() {
	return global.ITEM_FEEDINGMACHINE;
};

feedingmachineSchema.methods.getCommands = function() {
    return [
    	  { command: "use"		 , minimumPosition: global.POS_RESTING , functionPointer: this.useFeedingMachine, minimumLevel: 0, subCommand: 0, item: this },
          { command: "stop"      , minimumPosition: global.POS_RESTING , functionPointer: this.disconnectFeedingMachine , minimumLevel: 0, subCommand: 0, item: this }
    ];
};

feedingmachineSchema.methods.useFeedingMachine = function(character, command) {
	var output = new Output(character);

	if(character.using !== undefined && character.using !== null) {
		output.toActor.push( { text: "But you're already using " + character.using.shortDescription + "." } );
		return output;
	}
	
	if(command.item.using !== undefined && command.item.using !== null) {
		output.toActor.push( { text: command.item.using.name + " is already using it!" } );
		return output;
	}

	output.toActor.push( { text: "You hook yourself up to " + command.item.shortDescription + "."} );
	output.toRoom.push( { roomId: character.room.id, text: character.name + " hooks into " + command.item.shortDescription + "." } );
	
	command.item.using = character;
	character.using = command.item;
	
	return output;
};

feedingmachineSchema.methods.disconnectFeedingMachine = function(character, command) {
	var output = new Output(character);
	
	if(command.item.using !== character) {
		output.toActor.push( { text: "But you're not using " + command.item.shortDescription + "."} );
		return output;
	}

	if(character.using !== undefined && character.using !== null) {
		character.using = null;
		command.item.using = null;
	
		output.toActor.push( { text: "You unhook yourself from " + command.item.shortDescription + "."} );
		output.toRoom.push( { roomId: character.room.id, text: character.name + " hooks from " + command.item.shortDescription + "." } );
	}

	return output;
};

feedingmachineSchema.methods.getDetailedDescription = function() {
    var result = [];

	result.push(this.shortDescription + " is a wicked device designed to supply a continuous stream of food to its user.");  

	result.push(this.keywords[0].toUpperCase() + ' USE to hook yourself up to the machine.');  
	result.push(this.keywords[0].toUpperCase() + ' STOP to disconnect yourself from the machine.');
	
	if(this.using !== undefined && this.using !== null) {
		this.using.name + " is currently using it.";
	}

    return result;
};

feedingmachineSchema.methods.performActivity = function() {
	if(this.using !== undefined && this.using !== null) {

	   var beforeFullnessIndex = this.using.caloriesConsumed[0] / this.using.maximumFullness;
	   
	   var itemMapResult = utility.buildItemMap(this.using, this.contents, Food, this.contents.length, function() { return false; }, "feed", "That's not food!");
	   
	   for(var i = 0; i < itemMapResult.mapItems.length; i++) {
            this.using.caloriesConsumed[0] = this.using.caloriesConsumed[0] + itemMapResult.mapItems[i].calories;
        }
		
		this.using.emitMessage(this.shortDescription + " feeds you " + itemMapResult.output + ".");
		this.using.emitRoomMessage(this.shortDescription + " feeds " + itemMapResult.output + " to " + this.using.name + ".");

    	this.using.stretchStomach();

		var afterFullnessIndex = (this.using.caloriesConsumed[0] / this.using.maximumFullness);
		var messages = this.using.getOvereatingMessages(beforeFullnessIndex, afterFullnessIndex);
		
		if(messages.length > 0) {
			this.using.emitMessage(messages[0]);
			this.using.emitRoomMessage( messages[1] );
		}
	}
};

var feedingmachineModel = mongoose.model('feedingmachine', feedingmachineSchema);

module.exports = {
	schema: feedingmachineSchema,
	feedingmachine: feedingmachineModel
};