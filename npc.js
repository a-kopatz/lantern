var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var constants = require("./constants");
var Output = require("./output");
//var character = require("./character");
var characterSchema = require("./character").schema;
// var utility = require("./utility");

var npcSchema = characterSchema.extend({
    id: Number,
    keywords: [ String ],
	shortDescription: String,
	longDescription: String //,
	// loadPosition: Number,
	// defaultPosition: Number,
	// isSentinel: Boolean,
	// isScavenger: Boolean
}, { collection: 'npcs' });

npcSchema.methods.isNpc = function() {
	return true;
};

npcSchema.methods.getShortDescription = function() {
	return this.shortDescription;
};

npcSchema.methods.listCommands = function(character, command) {
	var output = new Output(character);
	var commands = command.npc.getCommands();
	
	output.toActor.push( { text: 'The following special commands are available: ' } );
	output.toActor.push( { text: '-------------------------------------------------------------------' } );
	
	if(commands.length > 0) {
		for(var i = 0; i < commands.length; i++) {
			if(commands[i].command !== "list") {
				output.toActor.push( { text: "   " + commands[i].command } );
			}
		}
	}
	
	return output;	
};

npcSchema.methods.initialize = function() {

};

npcSchema.methods.performActivity = function() {
	
};

function load(id, npc, commands, world, instructionNumber, callback) {
	npcModel.find({id: id}, function(err, docs) {
		//console.log(err);
		callback(docs, npc, commands, world, instructionNumber);
	
	});
}

var npcModel = mongoose.model('npc', npcSchema);

module.exports = {
	schema: npcSchema,
	npc: npcModel,
	load: load
};


