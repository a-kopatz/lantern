var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").schema;
var Output = require("../output");

var scaleSchema = itemSchema.extend({
}, { collection : 'items' });

scaleSchema.methods.getType = function() {
	return global.ITEM_SCALE;
};

scaleSchema.methods.getDetailedDescription = function() {
    var result = [];
	result.push('Use SCALE WEIGH to weigh yourself.');
    return result;
};

scaleSchema.methods.weighCharacter = function(character, command) {
	var output = new Output(character);
	
	output.toActor.push( { text: "You climb onto the scale." } );
	output.toRoom.push( { roomId: character.room.id, text: "ACTOR_NAME climbs onto the scale." } );
	
	output.toActor.push( { text: command.item.shortDescription + " announces, 'You weigh " + character.weight + " pounds.'" } );
	output.toRoom.push( { roomId: character.room.id, text: command.item.shortDescription + " announces, 'ACTOR_NAME weighs " + character.weight + " pounds.'" } );
	
	return output;
};

scaleSchema.methods.getCommands = function() {
    return [
    	  { command: "list"		 , minimumPosition: global.POS_RESTING , functionPointer: this.listCommands, minimumLevel: 0, subCommand: 0, item: this },
    	  { command: "weigh"     , minimumPosition: global.POS_RESTING , functionPointer: this.weighCharacter, minimumLevel: 0, subCommand: 0, item: this }
    ];
};

var scaleModel = mongoose.model('scale', scaleSchema);

module.exports = {
	schema: scaleSchema,
	scale: scaleModel
};